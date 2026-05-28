import "../styles/navbar.css"
import { useAppContext } from "../hooks/useAppContext";
import {useState} from "react"
import {NavLink} from "react-router-dom"


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
           
          <NavLink to={`/dashboard/${currentUser?.id}`}
          className={({ isActive }) => isActive ? "active-link" : ""}>
          Hem
          </NavLink>
            
          <NavLink
          to="/statistik"
          className={({ isActive }) => isActive ? "active-link" : ""}>
          Statistik
          </NavLink>

          <NavLink
          to={`/redigera-profil/${currentUser?.id}`}
          className={({ isActive }) => isActive ? "active-link" : ""}
          >
          Profil
          </NavLink>
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