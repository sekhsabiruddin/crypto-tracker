import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/Common/Header';
import Loader from '../components/Common/Loader';
import axios from 'axios';
import { coinObject } from '../functions/coinObject';
import List from '../components/Dashboard/List';
import CoinInfo from '../components/Coin/CoinInfo';

function CoinPage() {
    const {id} = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [coinData, setCoinData] = useState();

    useEffect(() => {
       if(id){
        axios.get(
            `https://api.coingecko.com/api/v3/coins/${id}`
        )
        .then((response)=>{
            console.log("Response >>> ",response)
            coinObject(setCoinData, response.data)
            setIsLoading(false)
        })
        .catch((error)=>{
            console.log("error >>> ",error)
            setIsLoading(false)
        })
       }
    }, [id]);

    console.log("coinData >> ",coinData)
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