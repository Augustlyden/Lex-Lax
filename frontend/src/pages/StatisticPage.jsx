import { useAppContext } from '../provider/ContextProvider.jsx';
import { getAllStats } from '../api/statisticApi.js';
import { getAllSubjects } from '../api/subjectApi.js';
import { useState, useEffect } from 'react';
import Loading from '../components/UI/Loading.jsx'
import StatsTabs from '../components/Statistics/StatisticTabs.jsx';

const StatisticPage = () => {
  const { currentUser, error: userError } = useAppContext();
  const [allStats, setAllStats] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedListId, setSelectedListId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [statsError, setStatsError] = useState(null);

  const fetchStats = async (userId) => {
    setLoading(true);
    setStatsError(null);
    try {
      const [statsData, subjectData] = await Promise.all([
        getAllStats(userId),
        getAllSubjects()
      ]);
      setAllStats(statsData);
      setSubjects(subjectData);
    } catch (error) {
      setStatsError(
        error?.error ||
        'Kunde inte ansluta till servern. Kontrollera din internetanslutning eller försök igen senare.'
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (currentUser?.id) {
      fetchStats(currentUser.id);
    }
  }, [currentUser]);

  if (userError) {
    return <div>{userError}</div>
  }

  if (statsError) {
    return <div>{statsError}</div>
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <StatsTabs allStats={allStats} onSelectList={setSelectedListId} subjects={subjects}/>
    </div>
  )
}

export default StatisticPage
