import React, { useEffect, useState } from 'react'
import Header from '../components/Common/Header'
import TabsComponent from '../components/Dashboard/Tabs'
import axios from 'axios';
import Search from '../components/Dashboard/Search';
import PaginationComponent from '../components/Dashboard/Pagination';
import Loader from '../components/Common/Loader';
import BackToTop from '../components/Common/BackToTop';

function DashboardPage() {
    const [coins, setCoins] = useState([]);
    const [search, setSearch] = useState("");
    const [paginatedCoins, setPaginatedCoins] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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
        )
        .then((response)=>{
            console.log("Response >>> ",response)
            setCoins(response.data);
            setPaginatedCoins(response.data.slice(0,10))
            setIsLoading(false)
        })
        .catch((error)=>{
            console.log("error >>> ",error)
            setIsLoading(false)
        })
    }, []);
  return (
    <>
        <Header/>
        <BackToTop/>
        {isLoading ? (<Loader/> )
            :
            (
                <div>
                    <Search search={search} onSearchChange={onSearchChange}/>
                    <TabsComponent
                        coins={search ? filteredCoins : paginatedCoins}
                        setSearch={setSearch}
                    />
                    {!search && (
                        <PaginationComponent page={page} handleChange={handlePageChange}/>
                    )}
                </div>
            )
        }
    </>
  )
}

export default DashboardPage