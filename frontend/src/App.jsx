import './styles/global.css'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import './App.css'
import LoginPage from "./pages/LoginPage"
import DashboardPage from "./pages/DashboardPage"

function App() {

  

  return (
  <>
    <Navbar />

    <main>
    <LoginPage />
   
    </main>

    <Footer />
  </>
  )
}

export default App
