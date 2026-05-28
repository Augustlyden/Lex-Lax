import styles from "../styles/WordList.module.css";
import { useEffect, useState } from "react";
import Loading from "../components/UI/Loading"
import {Link} from "react-router-dom"
import languageIcon from "../assets/subjects/language-icon.webp";
import { deleteList } from "../api/listApi";
import { useAppContext } from "../hooks/useAppContext";

function WordList({subjectId}) {

  const { currentUser } = useAppContext();

  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(false)

  async function handleDelete(id) {
  try {
    await deleteList(id);
    setLists((prevLists) => prevLists.filter((list) => list.id !== id)
    );

  } catch (error) {
    console.error("Failed to delete list:", error);
  }
};
  
//HÄMTAR LISTAN VIA URL MED SUBJECT ID + USER ID
  useEffect(() => {
  async function fetchLists() {
    try {
      setLoading(true)
      const response = await fetch(
        `http://localhost:3000/api/lists?subjectId=${subjectId}&userId=${currentUser?.id}`
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
}, [subjectId, currentUser.id]);

if(loading) {
  return < Loading />
}
    return (
        <div className = {styles.listContainer}>
          <div className={styles.backBtnBox}>
           <Link to={"/dashboard/" + currentUser?.id} className="flat-btn">Tillbaka </Link>
          </div>

            <div className={`${styles.listHeaderContent} ${styles.vocabularyTheme}`}>
            <div className = "image-content-left">
                  <img src={languageIcon} className = "subject-icon" alt="Math icon" />
                </div>
            
                <div className ={styles.infoContent}>
                <h1>Språk</h1>
                <p>Här kan du se all din historik, övningar och anpassa dom.</p>
                <div>
               <div className= {styles.addNewListBox}>
             <Link to={`/sprak/${subjectId}/skapa`} className="flat-btn">Lägg till nya </Link>
             </div>
            
            </div>
          </div>
        </div>

            <div className = {`${styles.listContent} ${styles.vocabularyBorder}`}>
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
      <Link className="primary-btn" to={`/sprak/1/test/${list.id}`}>
     
        Träna!
      </Link>

      <Link className = "secondary-btn" to={`/sprak/${subjectId}/redigera/${list.id}`}>Redigera</Link>

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