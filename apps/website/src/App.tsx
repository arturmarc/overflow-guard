import { useEffect } from 'react'

import DevPage from './pages/DevPage'
import HtmlPage from './pages/HtmlPage'
import ArticlePage from './pages/ArticlePage'
import ReactPage from './pages/ReactPage'

const articleTitle = 'OverflowGuard — Build around content, not breakpoints'

function getRoute(pathname: string) {
  if (pathname.startsWith('/dev')) {
    return {
      title: 'OverflowGuard',
      page: <DevPage />,
    }
  }

  if (pathname.startsWith('/html')) {
    return {
      title: 'OverflowGuard HTML',
      page: <HtmlPage />,
    }
  }

  if (
    pathname.startsWith('/article') ||
    pathname.startsWith('/responsive-toolbars-and-navbars')
  ) {
    return {
      title: articleTitle,
      page: <ArticlePage />,
    }
  }

  return {
    title: 'OverflowGuard React',
    page: <ReactPage />,
  }
}

function App() {
  const route = getRoute(window.location.pathname)

  useEffect(() => {
    document.title = route.title
  }, [route.title])

  return route.page
}

export default App
