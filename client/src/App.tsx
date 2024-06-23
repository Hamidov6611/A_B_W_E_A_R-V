import { Route, Routes } from 'react-router-dom'
import { Auth, Home } from './pages'
import Navbar from './components/shared/navbar'
import { ThemeProvider } from './components/theme-provider'

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App