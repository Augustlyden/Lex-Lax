import './styles/global.css'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import './App.css'
import LoginPage from "./pages/LoginPage"
import DashboardPage from "./pages/DashboardPage"
import VocabularyPage from './pages/VocabularyPage'

function App() {
  return (
  <>
    <Navbar />

    <main>
    < VocabularyPage />
   
    </main>

    <Footer />
  </>
  )
}

export default App
