import './styles/global.css'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import './App.css'
import LoginPage from "./pages/LoginPage"
import { useAppContext } from './provider/ContextProvider.jsx';
import Loading from './components/ui/Loading';

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
