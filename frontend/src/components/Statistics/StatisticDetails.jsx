import React, { useEffect, useState } from 'react'
import { getHistory } from '../../api/statisticApi';
import styles from '../../styles/StatisticDetails.module.css'
import { formatDate } from '../../utils/formatDate';
import Loading from '../UI/Loading';

const StatisticDetails = ({ userId, listId, onClose }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistoryData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getHistory(userId, listId);
        setHistory(data);
      } catch (error) {
        setError(
          error?.error || 
          'Kunde inte ansluta till servern. Kontrollera din internetanslutning eller försök igen senare.'
        );
      } finally {
        setLoading(false);
      }
    }

    if (userId && listId) {
      fetchHistoryData();
    }
  }, [userId, listId]);

  return (
    <div className={styles.backdrop} onClick={onClose}>
      {/* Prevent modal clicks from triggering the backdrop's onClose event */}
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>

        <button className={`flat-btn ${styles.closeButton}`} onClick={onClose}>X</button>
        <h2 className={styles.modalTitle}>Övningshistorik</h2>
        <p className={styles.modalSub}>Se din utveckling över tid för denna lista</p>

        {loading && <Loading />}
        {error && <p className={styles.errorText}>{error}</p>}

        {!loading && !error && (
          <div className={styles.timeline}>
            {history.map((run, index) => {
              // Calculate accuracy percentage, default to 0 if no attempts
              const total = run.correct_answers + run.wrong_answers;
              const percent = total > 0 ? Math.round((run.correct_answers / total) * 100) : 0;

              return (
                <div key={index} className={styles.timelineItem}>
                  <div className={styles.dateSide}>
                    {formatDate(run.practiced_at)}
                  </div>

                  <div className={styles.lineSide}>
                    <div className={styles.dot} />
                  </div>

                  <div className={styles.contentSide}>
                    <div className={styles.scoreRow}>
                      <span className={styles.correct}> {run.correct_answers} rätt</span>
                      <span className={styles.wrong}> {run.wrong_answers} fel</span>
                    </div>
                    <div className={styles.percentBadge}>
                      {percent}% avklarat
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default StatisticDetails
