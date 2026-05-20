import './styles/global.css'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import './App.css'
import LoginPage from "./pages/LoginPage"
import { useAppContext } from './provider/ContextProvider.jsx';
import Loading from './components/ui/Loading';

function App() {

  // ALLT HÄMTAS FRÅN CONTEXT PROVIDER, KAN ANVÄNDAS I HELA APPEN
  const { currentUser, loading, error  } = useAppContext();
  // ALLT HÄMTAS FRÅN CONTEXT PROVIDER, KAN ANVÄNDAS I HELA APPEN

  return (
  <>
    <Navbar />

{/* TILLFÄLLIGT FÖR ATT VISA HUR DET KAN FUNKA :D  */}
    {loading ? (
      <Loading />
    ) : currentUser ? (
      <h1>Välkommen {currentUser.username}!</h1>
    ) : (
      <p>{error}</p>
    )}
    {/* TILLFÄLLIGT FÖR ATT VISA HUR DET KAN FUNKA :D  */}


    <main>
  
      <LoginPage />
    </main>

    <Footer />
  </>
  )
}

export default App
