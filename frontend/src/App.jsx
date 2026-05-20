import './styles/global.css'
import './App.css'
import './styles/buttons.css'
import Footer from './components/Footer'
import Navbar from './components/Navbar'

import LoginPage from "./pages/LoginPage"
import DashboardPage from "./pages/DashboardPage"
import VocabularyPage from './pages/VocabularyPage'

function App() {
  return (
  <>
    <Navbar />

    <main>
    < VocabularyPage/>
   
    </main>

    <Footer />
  </>
  )
}

export default App
