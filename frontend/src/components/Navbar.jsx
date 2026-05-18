import "../styles/navbar.css"
import {useState} from "react"

export default function Navbar() {

 
    const [menuOpen, setMenuOpen] = useState(false)

    return (
    <header>
      <nav>
        
        <div className = "nav-container">
          <div className = "nav-content">

            <div className = "nav-logo">
              <h1>LEX LÄX</h1>
            </div>

            <div className = "nav-links">
              <a href="/">Home</a>
              <a href="/">Support</a>
              <a href="/">Contact</a>
            </div>

           <div className={`nav-links ${menuOpen ? "active" : ""}`}>
           <a href="/">Hem</a>
             <a href="/">Statistik</a>
             <a href="/">Profil</a>
            </div>

            
     

           <div className = "nav-profile">
             <a href="/profile">🧒🏻</a>
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