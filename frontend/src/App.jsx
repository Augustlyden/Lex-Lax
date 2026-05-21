import './styles/global.css'
import './styles/buttons.css'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import './App.css'
import LoginPage from "./pages/LoginPage"
import DashboardPage from "./pages/DashboardPage"

import AddUser from "./pages/AddUser"

/* function App() {

  

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

export default App */

function App() {

  return (
    <>
      <main>
        <AddUser />
      </main>
      <Footer />
    </>
  )
}

export default App