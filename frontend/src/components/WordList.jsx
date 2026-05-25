import styles from "../styles/WordList.module.css";
import { useEffect, useState } from "react";
import Loading from "../components/UI/Loading"
import {Link} from "react-router-dom"
import languageIcon from "../assets/subjects/language-icon.webp";
import { deleteList } from "../api/listApi";

//Använd senare: `http://localhost:3000/api/lists?subjectId=${subjectId}&userId=${userId}`
function WordList({userId, subjectId}) {

  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(false)

  async function handleDelete(id) {
  try {
    await deleteList(id);

    setLists((prevLists) =>
      prevLists.filter((list) => list.id !== id)
    );

  } catch (error) {
    console.error("Failed to delete list:", error);
  }
};
  
  useEffect(() => {
  async function fetchLists() {
    try {
      setLoading(true)
      const response = await fetch(
        `http://localhost:3000/api/lists?subjectId=${1}&userId=${1}`
      );
      const data = await response.json();
      if (data.success) {
        setLists(data.data);
      }

    } catch (error) {
      console.error("Failed to fetch lists:", error);
    }finally {
      setLoading(false)
    }
  }

  fetchLists();
}, [subjectId, userId]);

if(loading) {
  return < Loading />
}
    return (
        <div className = {styles.listContainer}>
          <div className={styles.backBtnBox}>
           <Link to={"/Dashboard"} className="flat-btn">Tillbaka </Link>
          </div>

          <div className = {styles.listHeaderContent}>
            <div className = "image-content-left">
                  <img src={languageIcon} className = "subject-icon" alt="Math icon" />
                </div>
            
                <div className ={styles.infoContent}>
                <h1>Språk</h1>
                <p>Här kan du se all din historik, övningar och anpassa dom.</p>
                <div>
               <div className= {styles.addNewListBox}>
             <Link to={`/vocabulary/${subjectId}/create`} className="flat-btn">Lägg till nya </Link>
             </div>
            
            </div>
          </div>
        </div>

          <div className = {styles.listContent}>
          
            <h2>Historik</h2>

            {lists.length === 0 ? (
              
             <p>Du har inga tillagda glosor ännu.</p>

              ) : (

           lists.map((list) => (
          <div className={styles.listCard} key={list.id}>
           <div className={styles.listTitle}>
             <input
             className={styles.inputLength}
             type="text"
             value={list.title}
             disabled
            />
           </div>

    <div className={styles.listActions}>
      <button className="primary-btn">Träna!</button>
      <button className="secondary-btn">Redigera</button>
      <button className="primary-btn delete-btn" 
              onClick={() => handleDelete(list.id)}>
      Radera
      </button>
    </div>

  </div>
)))}


          </div>

        </div>
    )
}
export default WordList;