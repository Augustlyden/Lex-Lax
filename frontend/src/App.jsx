import './styles/global.css'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import './App.css'
import LoginPage from "./pages/LoginPage"
import { useAppContext } from './provider/ContextProvider.jsx';
import Loading from './components/ui/Loading';

function App() {

  // ALLT HÄMTAS FRÅN CONTEXT PROVIDER, KAN ANVÄNDAS I HELA APPEN
  const { users,currentUser, loading, error, createUser, updateUser, deleteUser } = useAppContext();
  // ALLT HÄMTAS FRÅN CONTEXT PROVIDER, KAN ANVÄNDAS I HELA APPEN

  return (
  <>
    <Navbar />

{/* TILLFÄLLIGT FÖR ATT VISA HUR DET KAN FUNKA :D  */}
    {loading ? (
      <Loading />
    ) : currentUser ? (
      <h1>Välkommen {currentUser.username}!</h1>
    ) : (
      <p>{error}</p>
    )}
    <button onClick={() => console.log(users)}>Visa alla användare i Console</button>
    <button onClick={() => console.log(currentUser)}>Visa Current User i Console</button>
<br />
    formulär för att skapa användare, kan tas bort när vi har en riktig login/signup sida
    <form onSubmit={(e) => {
      e.preventDefault();
      const username = e.target.username.value;
      const profileImg = e.target.profileImg.value;
      createUser(username, profileImg);
    }}>
      <input type="text" name="username" placeholder="Username" required />
      <input type="text" name="profileImg" placeholder="Profile Image URL" required />
      <button type="submit">Skapa Användare</button>    </form>
    <br />
      formulär för att uppdatera användare, kan tas bort när vi har en riktig login/signup sida
    <form onSubmit={(e) => {
      e.preventDefault();
      const id = currentUser.id; // Använder currentUser's ID för att uppdatera rätt användare
      const username = e.target.username.value;
      const profileImg = e.target.profileImg.value;
      updateUser(id, username, profileImg);
    }}>
      <input type="text" name="username" placeholder="New Username" required />
      <input type="text" name="profileImg" placeholder="New Profile Image URL" required />
      <button type="submit">Uppdatera Användare</button>
    </form>
<br />
    button för att ta bort användare, kan tas bort när vi har en riktig login/signup sida
    <button onClick={() => {
      const id = currentUser.id; // Använder currentUser's ID för att ta bort rätt användare
      deleteUser(id); // Hårdkodat ID för att ta bort, kan ändras till currentUser.id när vi har en riktig login/signup sida
    }}>Ta Bort Användare</button>
    
    {/* TILLFÄLLIGT FÖR ATT VISA HUR DET KAN FUNKA :D  */}


    <main>
  
      <LoginPage />
    </main>

    <Footer />
  </>
  )
}

export default App
