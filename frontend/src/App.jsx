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
