import React from 'react';
import { useAppContext } from '../provider/ContextProvider.jsx';
import { getAllStats } from '../api/statisticApi.js';
import { useState } from 'react';
import { useEffect } from 'react';
import { Loading } from '../components/UI/Loading.jsx'

const StatisticPage = () => {
  const { currentUser, error: userError } = useAppContext();
  const [allStat, setAllStats] = useState([]);
  const [selectedListId, setSelectedListId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [statsError, setStatsError] = useState(null);

  const fetchStats = async (userId) => {
    setLoading(true);
    setStatsError(null);
    try {
      const data = await getAllStats(userId);
      setAllStats(data);
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
      
    </div>
  )
}

export default StatisticPage
