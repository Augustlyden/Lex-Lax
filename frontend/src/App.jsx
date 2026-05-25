import './styles/global.css'
import './App.css'
import './styles/buttons.css'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import LoginPage from "./pages/LoginPage"
import DashboardPage from "./pages/DashboardPage"
import VocabularyPage from './pages/VocabularyPage'
import CreateWordList from './components/CreateWordList'
import { Route, Routes } from 'react-router-dom'
import EditWordList from "./components/EditWordList"
import MathPage from "./pages/MathPage"

function App() {

  return (
  <>
    <Navbar />

    <main>
       
      <Routes>
 
          <Route path="/dashboard" element={<DashboardPage />}/>

          <Route path="/vocabulary/:subjectId" element={<VocabularyPage />}/>
          <Route path="/math/:subjectId" element={<MathPage />}/>

          <Route path="/vocabulary/:subjectId/create" element={<CreateWordList />}/>
         
          <Route path="/vocabulary/:subjectId/edit/:listId" element={<EditWordList />}/>

        </Routes>
   
    </main>

    <Footer />
  </>
  )
}

export default App
