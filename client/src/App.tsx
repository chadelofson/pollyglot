import { useMutation } from "@tanstack/react-query";

import './App.css'
import Layout from "./components/Layout.tsx";

import frenchFlag from './assets/fr-flag.png'
import spanishFlag from './assets/sp-flag.png'
import japaneseFlag from './assets/jpn-flag.png'
import {useForm} from "@tanstack/react-form";

type FormValues = {
  sentence: string
  language: string
}



const languages = [
  { language: "french", flag: frenchFlag },
  { language: 'spanish', flag: spanishFlag },
  { language: "japanese", flag: japaneseFlag}
]

const translateSentence = async (data: FormValues) => {
  const apiUrl = import.meta.env.VITE_AI_API_URL;
  const aiApi = new URL(`${apiUrl}/api/v1/translate`)
  const res = await fetch(aiApi, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    throw new Error('Translation failed.')
  }

  return await res.json()
}

function App() {
  const mutation = useMutation({ mutationFn: translateSentence })

  const form = useForm({
    defaultValues: {
      sentence: '',
      language: 'french'
    },
    onSubmit: ({ value }) => {
      mutation.mutate(value)
    }
  })

  const handleClick = () => {
    if (mutation.isSuccess) {
      form.reset()
      mutation.reset()
    } else {
      form.handleSubmit()
    }
  }

  return (
    <Layout>
      <main>
        <form
            className="translation-form"
            onSubmit={(e) => {
              e.preventDefault()
              e.stopPropagation()
            }}
        >

          <form.Field
              name="sentence"
              children={(field) => {
                return (
                    <>
                      <label className="text-translate-header">
                        Text to translate 👇
                        <textarea
                            id={field.name}
                            name={field.name}
                            onChange={(e) => field.handleChange(e.target.value)}
                            className="translate-text"
                            value={field.state.value}
                            disabled={mutation.isSuccess}
                        />
                      </label>
                    </>
                )
              }}
          />

          {!mutation.isSuccess ? (
            <form.Field
              name="language"
              children={(field) => {
                return (
                    <div className="language-container">
                      {languages.map(lang => (
                          <label className="form-control" key={lang.language}>
                            <input
                                type="radio"
                                value={lang.language}
                                checked={field.state.value === lang.language}
                                onChange={(e) => { field.handleChange(e.target.value) }}
                            />
                            {`${lang.language[0].toUpperCase()}${lang.language.slice(1)}`} <img src={lang.flag} alt={lang.language}/>
                          </label>
                      ))}

                    </div>
                )
              }}
            />

          ) : (
              <div>
                <h2>Your translation 👇</h2>
                <div className="translate-text">{mutation.data.translation.message}</div>
              </div>
          )}
          <button
              className="btn-primary"
              type="submit"
              onClick={handleClick}
              disabled={mutation.isPending}
          >

            {mutation.isPending ? 'Translating...' : mutation.isSuccess ? 'Start Over' : 'Translate'}
          </button>

          {mutation.isError && <p>Error: {mutation.error.message}</p>}
        </form>
      </main>
    </Layout>
  )
}

export default App
