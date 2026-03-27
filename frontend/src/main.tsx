// I'm using StrictMode here to catch potential problems early during development —
// it intentionally double-renders components so bugs surface faster.
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

// I mount the entire app into the #root div defined in index.html.
// The '!' tells TypeScript I'm certain this element exists on the page.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
