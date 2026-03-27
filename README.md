# PollyGlot

## What it does
Pollyglot takes english text and translates it to French, Spanish or Japanese.

## How data flows
After the user enters the text in the form and push the button:
* The click handler checks if the mutation was a success.
* If it was, the form is reset and the mutation is reset.
* Otherwise it is handled by the 

## What you learned
* That combining TanStack Forms with TanStack React Query can be pretty hard at first.
* I learned how to handle fetching data without using useEffect and using mutations with TanStack React Query instead.

## What you'd improve
* I would likely want to move some of the fetch tooling into a utils folder to clean up App.tsx.
* Utilize more complex layout concepts to clean up the UI markup a little more.
* There is a stretch goal to make it look more like a Chat app, so I would make it look more like a text message UI.
