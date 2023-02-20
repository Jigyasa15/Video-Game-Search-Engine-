import './App.css';
import { useState, useEffect } from 'react';
import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then((response) => response.json())
function App() {
  const [gameTitle, setGameTitle] = useState("");
  const [searchGames, setSearchedGames] = useState([]);
  const { data, error} = useSWR(`https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=20&pageSize=3`, fetcher);
  const searchGame = () =>{
    fetch(`https://www.cheapshark.com/api/1.0/games?title=${gameTitle}&limit=3`)
    .then((response) => response.json())
    .then((data) => {
      setSearchedGames(data);
    })  }

  return (
    <div className="App">
      <div className='searchSection'>
        <h1>Search For A Game</h1>
        <input type="text" placeholder='Minecraft...' onChange={(event)=>{
          setGameTitle(event.target.value);
        }}/>
        <button onClick={searchGame}>Search Game Title</button>

        <div className='games'>
          {searchGames.map((game,key) => {
            return (<div className='game' key={key}>{game.external}
            <img src={game.thumb} />
            {game.cheapest}</div>);
          })}
        </div>
      </div>
      <h1> Latest Deals </h1>
      <div className='dealsSection'>

        {data && data.map((game,key) =>{
          return ( 
          <div className='game' id='deals' key ={key}>
            <h3>{game.title}</h3>
            <p>Normal Price: {game.normalPrice}</p>
            <p>Deal Price: {game.salePrice}</p>
            <h3>YOU SAVE {game.savings.substr(0,2)}%</h3></div>)
        })}
      </div>
    </div>
  );
}

export default App;
