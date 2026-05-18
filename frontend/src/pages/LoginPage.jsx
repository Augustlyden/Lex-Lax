import "../styles/loginPage.css"
import UserCard from "../components/UserCard"
import {useState} from "react"

function LoginPage() {

    {/* Tillfälliga Profiler. Vi hämtar senare riktiga från Databasen */ }   
const users = [
    {
      id: 1,
      name: "Användare 1",
      image:
        "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=500&auto=format&fit=crop",
    },
    {
      id: 2,
      name: "Användare 2",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=500&auto=format&fit=crop",
    },
  ];

 return (
        <div className = "login-page-container">
            <div className = "login-content-wrapper">

             <div className = "login-text-content">
                <h1>Vem ska plugga idag?</h1>
                  <p>Välj din profil för att komma igång!</p>
             </div>
                
                <div className="login-user-content">

                {users.map((user) => (
                    <UserCard key={user.id} user={user} />
                ))}
              </div>
              <button className = "primary-button">Hantera Profiler</button>
                  </div>
            </div>

 
    )
}
export default LoginPage