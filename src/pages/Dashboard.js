import React, { useEffect, useState } from 'react'
import Header from '../components/Common/Header'
import TabsComponent from '../components/Dashboard/Tabs'
import axios from 'axios';
import Search from '../components/Dashboard/Search';
import PaginationComponent from '../components/Dashboard/Pagination';

function DashboardPage() {
    const [coins, setCoins] = useState([]);
    const [search, setSearch] = useState("");
    const [paginatedCoins, setPaginatedCoins] = useState([]);

    const [page, setPage] = useState(1);
    const handlePageChange = (event, value) => {
      setPage(value);
      let previousIndex = (value - 1) * 10;
      setPaginatedCoins(coins.slice(previousIndex,previousIndex+10))
    };

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
            setPaginatedCoins(response.data.slice(0,10))
        }).catch((error)=>{
            console.log("error >>> ",error)
        })
    }, []);
  return (
    <div>
        <Header/>
        <Search search={search} onSearchChange={onSearchChange}/>
        <TabsComponent
            coins={search ? filteredCoins : paginatedCoins}
        />
        {!search && (
            <PaginationComponent page={page} handleChange={handlePageChange}/>
        )}
    </div>
  )
}

export default DashboardPage