import styles from "../styles/WordList.module.css";
import { useEffect, useState } from "react";
import Loading from "../components/UI/Loading"

//Använd senare: `http://localhost:3000/api/lists?subjectId=${subjectId}&userId=${userId}`
function WordList({userId, subjectId}) {

  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(false)
  
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
          <div className = {styles.listHeaderContent}>
            <h1>GLOSOR</h1>
            <button className = "primary-btn">Lägg till nya</button>
          </div>

          <div className = {styles.listContent}>
            <h2>Mina glosor</h2>
            
           {lists.map((list) => (
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
      <button className="secondary-btn delete-list">
        Ta bort
      </button>
    </div>

  </div>
))}


          </div>

        </div>
    )
}
export default WordList;