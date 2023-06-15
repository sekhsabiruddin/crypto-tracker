import React, { useEffect, useState } from 'react'
import Header from '../components/Common/Header'
import TabsComponent from '../components/Dashboard/Tabs'
import axios from 'axios';
import Search from '../components/Dashboard/Search';

function DashboardPage() {
    const [coins, setCoins] = useState([]);
    const [search, setSearch] = useState("");

    var filteredCoins = coins.filter((item)=>{
        return item.name.toLowerCase().includes(search.toLowerCase()) || item.symbol.toLowerCase().includes(search.toLowerCase())
    })

    const onSearchChange = (e) =>{
        setSearch(e.target.value)
    }

    useEffect(() => {
        axios.get(
            'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en'
        ).then((response)=>{
            console.log("Response >>> ",response)
            setCoins(response.data);
        }).catch((error)=>{
            console.log("error >>> ",error)
        })
    }, []);
  return (
    <div>
        <Header/>
        <Search search={search} onSearchChange={onSearchChange}/>
        <TabsComponent coins={filteredCoins}/>
    </div>
  )
}

export default DashboardPage