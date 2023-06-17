import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/Common/Header';
import Loader from '../components/Common/Loader';
import { coinObject } from '../functions/coinObject';
import List from '../components/Dashboard/List';
import CoinInfo from '../components/Coin/CoinInfo';
import { getCoinData } from '../functions/getCoinData';
import { getCoinPrices } from '../functions/getCoinPrices';

function CoinPage() {
    const {id} = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [coinData, setCoinData] = useState();
    const [days, setDays] = useState(7);

    useEffect(() => {
       if(id){
            getData()
       }
       
    }, [id]);

    async function getData(){

        const data = await getCoinData(id);
        if(data){
            coinObject(setCoinData,data);
            const prices = await getCoinPrices(id,days);
            if(prices.length > 0){
                console.log("prices get")
                setIsLoading(false);
            }
        }
    }

  return (
    <>
        <div>
            <Header/>
            {isLoading ? (<Loader/>)
                :
                (  <React.Fragment>
                        <div className='grey-wrapper'>
                             <List coin={coinData}/>
                        </div>
                        <CoinInfo heading={coinData.name} desc={coinData.desc} />
                    </React.Fragment>
                )
            }
        </div>
    </>
  )
}

export default CoinPage