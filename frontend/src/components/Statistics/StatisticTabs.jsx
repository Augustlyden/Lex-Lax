import React, { useState } from 'react';
import styles from '../../styles/StatisticTabs.module.css';
import { formatDate } from '../../utils/formatDate';

const StatisticTabs = ({ allStats, onSelectList, subjects }) => {
  const [activeTab, setActiveTab] = useState('Alla');

  // Filter stats based on the selected tab
  const filteredStats = activeTab === 'Alla'
    ? allStats
    : allStats.filter(item => item.subject_id === activeTab);

  return (
    <div className={styles.container}>
      <div className={styles.tabRow}>
        <button 
          onClick={() => setActiveTab('Alla')}
          className={activeTab === 'Alla' ? 'primary-btn' : 'flat-btn'}>
            Alla
        </button>

        {subjects.map((sub) => (
          <button
            key={sub.id}
            onClick={() => setActiveTab(sub.id)}
            className={activeTab === sub.id ? 'primary-btn' : 'flat-btn'}>
              {sub.subject_name}
          </button>
        ))}
      </div>

      {filteredStats.length === 0 ? (
        <p className={styles.emptyText}>
          {activeTab === 'Alla'
            ? 'Du har inte övat på några listor än.'
            : 'Du har inte övat på några listor i detta ämne än.'}
        </p>
      ) : (
        <div className={styles.grid}>
          {filteredStats.map((list) => {
            // Calculate accuracy percentage, default to 0 if no attempts
            const totalAnswers = list.correct_answers + list.wrong_answers;
            const successRate = totalAnswers > 0
              ? Math.round((list.correct_answers / totalAnswers) * 100)
              : 0;

            return (
              <div key={list.id} className={styles.card}>
                <div>
                  <span className={styles.metaText}>
                    {list.subject_title} • {list.language}
                  </span>
                  <h3 className={styles.title}>{list.title}</h3>

                  <p className={styles.lastPracticed}>
                    Senast övad: <strong>{formatDate(list.last_practiced)}</strong>
                  </p>

                  <div className={styles.scoreRow}>
                    <span className={styles.correct}>Antal rätt: {list.correct_answers}</span>
                    <span className={styles.wrong}>Antal fel: {list.wrong_answers}</span>
                  </div>

                  <div className={styles.progressBarTrack}>
                    <div className={styles.progressBarFill} style={{ width: `${successRate}%` }}/>
                  </div>

                  <p className={styles.accuracyText}>Träffsäkerhet: {successRate}%</p>
                </div>

                <button
                  onClick={() => onSelectList(list.list_id)}
                  className={styles.detailButton}>
                    Visa historik
                </button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default StatisticTabs
