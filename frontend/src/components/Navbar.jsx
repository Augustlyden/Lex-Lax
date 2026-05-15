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
           <a href="/">Home</a>
             <a href="/">Support</a>
             <a href="/">Contact</a>
            </div>

           <div className = "nav-profile">
                 <a href="/"> ⭐️</a>
             <a href="/profile">👤</a>
           </div>
     </div>
   </div>
     </nav>
    </header>
    )
}