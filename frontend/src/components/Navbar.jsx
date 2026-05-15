import "../styles/navbar.css"


export default function Navbar() {

 

    return (
        <header>
    <nav>
        
      <div className = "nav-container">
       <div className = "nav-content">

        <div className = "nav-logo">
            <h1>LEX LÄX</h1>
        </div>

           <div className = "nav-links">
           <a href="/">Hem</a>
             <a href="/">Statistik</a>
             <a href="/">Profil</a>
            </div>

            <div className="hamburger">☰</div>

           <div className = "nav-profile">
             <a href="/profile">👤</a>
           </div>
     </div>

   </div>
     </nav>
    </header>
    )
}