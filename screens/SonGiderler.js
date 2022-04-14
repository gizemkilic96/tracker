import { useContext ,useEffect,useState } from 'react';
import GiderlerCikti from './../components/ExpensesOutput/GiderlerCikti';
import LoadingOverlay from './../components/UI/LoadingOverlay';
import { GiderlerContext } from '../store/giderler-context';
import { getDateMinusDays } from '../util/date';
import {fetchGiderler} from '../util/http';

function SonGiderler() {
  const [isFetching,setIsFetching]=useState(true);
  const giderlerCtx = useContext(GiderlerContext);

  useEffect(() => {
    async function getGiderler() {
      setIsFetching(true);
      const giderler = await fetchGiderler();
      setIsFetching(false);
      giderlerCtx.setExpenses(giderler);
    }

    getGiderler();
  }, []);
  if(isFetching){
   return <LoadingOverlay/>
  }

  const recentGiderler = giderlerCtx.giderler.filter((gider) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return gider.date >= date7DaysAgo && gider.date <= today;
  });

  return (
    <GiderlerCikti
      giderler={recentGiderler}
      giderlerPeriod="Last 7 Days"
      fallbackText="No expenses registered for the last 7 days."
    />
  );
}

export default SonGiderler;