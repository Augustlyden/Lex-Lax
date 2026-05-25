import './styles/global.css'
import './App.css'
import './styles/buttons.css'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import { Routes, Route } from "react-router-dom";


import AddUser from './pages/AddUser'
import LoginPage from "./pages/LoginPage"
import DashboardPage from "./pages/DashboardPage"
import VocabularyPage from './pages/VocabularyPage'

function App() {

  

  return (
  <>
    <Navbar />

 <main>
  <Routes>
    <Route path="/" element={<LoginPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/add-user" element={<AddUser />} />
    <Route path="/dashboard/:userId" element={<DashboardPage />} />
    <Route path="/vocabulary/:userId" element={<VocabularyPage />} />
    <Route path="/edit-user/:userId" element={<AddUser />} />
  </Routes>
</main>

    <Footer />
  </>
  )
}

export default App
