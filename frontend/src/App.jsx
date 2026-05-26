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
import EditWordList from "./components/EditWordList"
import MathPage from "./pages/MathPage"
import StatisticPage from './pages/StatisticPage'

function App() {

  return (
    <>


      <BrowserRouter>
        <Navbar />

        <main>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/logga-in" element={<LoginPage />} />
          <Route path="/skapa-profil" element={<AddUser />} />
          <Route path="/test/:listId" element={<QuestionPage />} />
          <Route path="/amne" element={<VocabularyPage />} />

          <Route path="/vocabulary/:subjectId" element={<VocabularyPage />}/>
          <Route path="/math/:subjectId" element={<MathPage />}/>
          <Route path="/vocabulary/:subjectId/create" element={<CreateWordList />}/>
          <Route path="/vocabulary/:subjectId/edit/:listId" element={<EditWordList />}/>

          <Route path='/statistik' element={<StatisticPage />}></Route>

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
