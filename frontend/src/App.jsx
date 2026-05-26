import './styles/global.css'
import './App.css'
import './styles/buttons.css'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import LoginPage from "./pages/LoginPage"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import QuestionPage from './pages/QuestionPage'
import DashboardPage from "./pages/DashboardPage"
import VocabularyPage from './pages/VocabularyPage'
import AddUser from './pages/AddUser'
import { PureComponent } from 'react'
import CreateWordList from './components/CreateWordList'
import { Route, Routes } from 'react-router-dom'
import EditWordList from "./components/EditWordList"
import MathPage from "./pages/MathPage"

function App() {

  return (
    <>


      <BrowserRouter>
        <Navbar />

        <main>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/logga-in" element={<LoginPage />} />
          <Route path="/skapa-profil" element={<AddUser />} />
          <Route path="/test" element={<QuestionPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/amne" element={<VocabularyPage />} />

          <Route path="/vocabulary/:subjectId" element={<VocabularyPage />}/>
          <Route path="/math/:subjectId" element={<MathPage />}/>
          <Route path="/vocabulary/:subjectId/create" element={<CreateWordList />}/>
          <Route path="/vocabulary/:subjectId/edit/:listId" element={<EditWordList />}/>

        </Routes>

        </main>
    <main>
       < LoginPage/>
 
  </main>

    


        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
