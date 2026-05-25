import './styles/global.css'
import './App.css'
import './styles/buttons.css'
import Footer from './components/Footer'
import Navbar from './components/Navbar'

import LoginPage from "./pages/LoginPage"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import QuestionPage from './pages/QuestionPage'
// import DashboardPage from './pages/DashboardPage'
import DashboardPage from "./pages/DashboardPage"
import VocabularyPage from './pages/VocabularyPage'

function App() {

  return (
    <>


      <BrowserRouter>
        <Navbar />

        <main>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/questions" element={<QuestionPage />} />
          {/* <Route path="/dashboard" element={<DashboardPage />} /> */}

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
