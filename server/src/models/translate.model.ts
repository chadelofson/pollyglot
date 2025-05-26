import OpenAI from "openai";

type Translation = Promise<{ message: string; language: string; }>

export async function getTranslation(sentence: string, language: string) {
  const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
    {
      role: 'system',
      content: `You are an translator of the ${language} language. Given a sentence translate it to ${language}`
    },
    {
      role: 'user',
      content: sentence
    }
  ]
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: messages,
      temperature: 1.1
    })
    return {
      message: response.choices[0].message.content,
      language: language
    }
  } catch (error) {
    console.error(error)
  }
}