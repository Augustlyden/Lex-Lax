import styles from "../styles/WordList.module.css";
import {Link} from "react-router-dom"
import { useAppContext } from "../hooks/useAppContext";
import mathIcon from "../assets/subjects/math-icon.webp";

function MathPage({subjectId}) {

  const { currentUser } = useAppContext();



    return (
        <div className = {styles.listContainer}>
          <div className={styles.backBtnBox}>
           <Link to={"/dashboard/" + currentUser?.id} className="flat-btn">Tillbaka</Link>
          </div>

         <div className={`${styles.listHeaderContent} ${styles.mathTheme}`}>
            <div className = "image-content-left">
                  <img src={mathIcon} className = "subject-icon" alt="Math icon" />
                </div>
            
                <div className ={styles.infoContent}>
                <h1>Matematik</h1>
                <p>Här övar du dina kunskaper inom matematik!</p>
                <div>
               <div className= {styles.addNewListBox}>
            
             </div>
            
            </div>
          </div>
        </div>

          <div className = {`${styles.listContent}`}>
        
         <div className = "math-play-btn-box">
      <Link to={`/matematik/${subjectId}/test`} className="primary-btn">ÖVA HÄR!</Link>
    </div>
 </div>
</div>
  )
}
export default MathPage;