# PollyGlot

## What it does
Pollyglot takes english text and translates it to French, Spanish or Japanese.

## How data flows
This application follows a simple client → API → response flow using TanStack Form and TanStack Query.

### 1. Form State (TanStack Form)

The application uses TanStack Form to manage user input, including:
- The sentence to translate
- The selected target language

When the form is submitted, the current form values are passed to a mutation using:

```ts
mutation.mutate(values)
```
### 2. API Request (TanStack Query - useMutation)

The useMutation hook is used to handle the asynchronous translation request.

* The mutation function sends a POST request to the backend translation API
* The request includes the user-entered sentence and selected language
* If the request fails, an error is thrown and handled by the UI
* If successful, the translated result is returned

### 3. UI State Management

The UI is driven by the mutation state:

* Idle → Form is displayed
* Pending → Button shows "Translating..." and is disabled
* Success → Translated text is displayed
* Error → Error message is shown

### 4. Reset Flow

After a successful translation:

* The user can reset the application
* This clears both the form state and mutation state
* The app returns to its initial state

## What you learned
* That combining TanStack Forms with TanStack React Query can be pretty hard at first.
* I learned how to handle fetching data without using useEffect and using mutations with TanStack React Query instead.

## What you'd improve
* I would likely want to move some of the fetch tooling into a utils folder to clean up App.tsx.
* Utilize more complex layout concepts to clean up the UI markup a little more.
* There is a stretch goal to make it look more like a Chat app, so I would make it look more like a text message UI.
