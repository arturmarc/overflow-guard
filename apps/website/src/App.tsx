import DevPage from './pages/DevPage'
import HtmlPage from './pages/HtmlPage'
import ReactPage from './pages/ReactPage'

function App() {
  const { pathname } = window.location

  if (pathname.startsWith('/dev')) {
    return <DevPage />
  }

  if (pathname.startsWith('/html')) {
    return <HtmlPage />
  }

  if (pathname === '/' || pathname.startsWith('/react')) {
    return <ReactPage />
  }

  return <ReactPage />
}

export default App
