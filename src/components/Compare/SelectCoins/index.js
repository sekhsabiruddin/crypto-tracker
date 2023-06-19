import React, { useEffect, useState } from 'react'
import './styles.css'
import { get100Coins } from '../../../functions/get100Coins';
import { MenuItem, Select } from '@mui/material';

function SelectCoins({crypto1,crypto2,handleCoinChange}) {

    const [allCoins, setAllCoins] = useState([]);

    const styles = {
        height: "2.5rem",
        color: "var(--white)",
        "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--white)",
        },
        "& .MuiSvgIcon-root": {
            color: "var(--white)",
        },
        "&:hover": {
            "&& fieldset": {
            borderColor: "#3a80e9",
            },
        },
    }

    

    useEffect(() => {
        getData();
    }, []);

    async function getData(){
        const myCoins = await get100Coins();
        setAllCoins(myCoins);
    }

  return (
    <div className='coin-flex'>
        <p>Crypto 1</p>
        <Select
          value={crypto1}
          lable = "Crypto 1"
          onChange={(event)=>handleCoinChange(event,false)}
          sx={styles}
        >
        {
            allCoins.map((coin)=>
                <MenuItem key={coin.id} value={coin.id}>{coin.name}</MenuItem>
            )
        }
            
        </Select>

        <p>Crypto 2</p>
        <Select
          value={crypto2}
          lable = "Crypto 2"
          onChange={(event)=>{handleCoinChange(event,true)}}
          sx={styles}
        >
        {
            allCoins.map((coin)=>
                <MenuItem key={coin.id} value={coin.id}>{coin.name}</MenuItem>
            )
        }
            
        </Select>
    </div>
  )
}

export default SelectCoins