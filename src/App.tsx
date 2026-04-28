import { BrowserRouter } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import { Router } from './routes'

function App() {
  return (
    <>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
      <Analytics />
    </>
      
      
  );
}

export default App;
