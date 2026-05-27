import "../styles/navbar.css"
import { useAppContext } from "../provider/ContextProvider";
import {useState} from "react"

export default function Navbar() {

 
    const [menuOpen, setMenuOpen] = useState(false)
    const { currentUser } = useAppContext();

    return (
    <header>
      <nav>
        
        <div className = "nav-container">
          <div className = "nav-content">

            <div className = "nav-logo">
              <h1>LEX LÄX</h1>
            </div>


           <div className={`nav-links ${menuOpen ? "active" : ""}`}>
           <a href="/">Hem</a>
             <a href="/">Statistik</a>
             <a href="/">Profil</a>
            </div>

            
     

            {currentUser && (
  <button type="button" className="active-user-btn">
    <img
      src={currentUser.image_url}
      alt={currentUser.username}
      className="active-user-avatar"
    />
  </button>
)}
            <div className = "nav-profile">
           
           </div>
                  <div
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            > ☰
           </div>
     </div>

   </div>
     </nav>
    </header>
    )
}