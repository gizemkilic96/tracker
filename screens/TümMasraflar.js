import { useContext } from 'react';
import GiderlerCikti from './../components/ExpensesOutput/GiderlerCikti';
import { GiderlerContext } from '../store/giderler-context';

function TümMasraflar(){
    const giderlerCtx = useContext(GiderlerContext);

    return(
        <GiderlerCikti 
        giderler={giderlerCtx.giderler} 
        giderlerPeriod='Total'
        fallbackText="Kayıtlı gider bulunamadı!"/>
    )
}

export default TümMasraflar;
