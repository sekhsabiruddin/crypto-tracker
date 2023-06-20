import { useEffect, useState } from "react";
import { get100Coins } from "../functions/get100Coins";
import Header from "../components/Common/Header";
import TabsComponent from "../components/Dashboard/Tabs";
import Button from "../components/Common/Button";
import Loader from "../components/Common/Loader";


function WatchlistPage() {
    const coins = JSON.parse(localStorage.getItem("watchlist"));
    console.log("watchlist page LS >>", coins);
    const [myWatchlist, setMyWatchlist] = useState([]);
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      getData();
      console.log("setLoad ",loading);
    }, []);
  
    const getData = async () => {
      setLoading(true);
      const allCoins = await get100Coins();
      if (coins) {
        setMyWatchlist(allCoins.filter((item) => coins.includes(item.id)));
      }
      setLoading(false);
    };
  
    return (
      <div>
        {(loading || !coins ) && coins !== null? (
          <Loader />
        ) : (
          <div style={{ minHeight: "90vh" }}>
            {myWatchlist?.length == 0 || !coins ? (
              <div>
                <Header />
                <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>
                  No Items in the Watchlist
                </h1>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <a href="/dashboard">
                    <Button text={"Dashboard"} />
                  </a>
                </div>
              </div>
            ) : (
              <div style={{ height: "95vh" }}>
                <Header />
                <TabsComponent coins={myWatchlist} isWatchlistPage={true} />
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
  
  export default WatchlistPage;