import { useAppContext } from '../hooks/useAppContext.js';
import { getAllStats } from '../api/statisticApi.js';
import { getAllSubjects } from '../api/subjectApi.js';
import { useState, useEffect } from 'react';
import Loading from '../components/UI/Loading.jsx'
import StatisticTabs from '../components/Statistics/StatisticTabs.jsx';
import StatisticDetails from '../components/Statistics/StatisticDetails.jsx';

const StatisticPage = () => {
  // Global and local states
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
      // Fetch both statistics and subjects in parallel
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

  // Fetch data automatically when current user is available
  useEffect(() => {
    if (currentUser?.id) {
      fetchStats(currentUser.id);
    }
  }, [currentUser]);

  // Handle separate error states (user API error takes precedence)
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
      <StatisticTabs 
        allStats={allStats} 
        onSelectList={setSelectedListId} 
        subjects={subjects}/>
      {selectedListId && (
        <StatisticDetails 
         userId={currentUser.id}
         listId={selectedListId}
         onClose={() => setSelectedListId(null)}/>
      )}
    </div>
  )
}

export default StatisticPage
