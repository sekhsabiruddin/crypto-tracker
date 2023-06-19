import React, { useEffect, useState } from 'react'
import Header from '../components/Common/Header'
import TabsComponent from '../components/Dashboard/Tabs'
import axios from 'axios';
import Search from '../components/Dashboard/Search';
import PaginationComponent from '../components/Dashboard/Pagination';
import Loader from '../components/Common/Loader';
import BackToTop from '../components/Common/BackToTop';
import { get100Coins } from '../functions/get100Coins';

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

    const getData = async() => {
        const myCoins = await get100Coins();
        if(myCoins){
            setCoins(myCoins);
            setPaginatedCoins(myCoins.slice(0,10))
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getData();
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