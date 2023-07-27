import React, {useState, useEffect } from 'react';
import Sidebar from '../Components/Sidebar';
import "../App.css"
import CryptoCard from '../Components/CryptoCard';
import axios from "axios"
import NewsCard from '../Components/NewsCard';
import { Link } from 'react-router-dom';
function Home() {
 
  const optionsNews = {
    method: 'GET',
    url: 'https://bing-news-search1.p.rapidapi.com/news/search',
    params: {
      q: 'crypto',
      count: '6',
      freshness: 'Day',
      textFormat: 'Raw',
      safeSearch: 'Off'
    },
    headers: {
      'X-BingApis-SDK': 'true',
      'X-RapidAPI-Key': '2659ebf51fmshf53e38f969bbf87p1689e2jsna1f7c22a194e',
      'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
    }
  };
    const options = {
        method: 'GET',
        url: 'https://coinranking1.p.rapidapi.com/coins',
        params: {
          referenceCurrencyUuid: 'yhjMzLPhuIDl',
          timePeriod: '3h',
       
          orderBy: 'marketCap',
          limit: '10',
          
        },
        headers: {
          'X-RapidAPI-Key': '2659ebf51fmshf53e38f969bbf87p1689e2jsna1f7c22a194e',
          'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
        }
      };
const[data,setData]=useState([])
const[news,setNews]=useState([])

const getData=async ()=>{
const res=await axios.request(options)
setData(res.data.data.coins)
}
const getNews=async()=>{
  const res=await axios.request(optionsNews)
  setNews(res.data.value)
 
}
useEffect(()=>{
getData()
getNews()
},[])
  return (
    <div className='Home absolute  ml-[200px] w-[87%] sm:ml-0 bg-gray-200 h-auto'>
  
      <div className="HomeDetails px-5 mt-4">

      <section className='HomeCrypto border-b-2 sm:pt-3 border-gray-500'>
        <div className="HomeCryptoHeading flex justify-between">
        <h1 className="HomeCryptoTitle text-2xl font-bold">Top 10 crypto currencies in the world</h1>
        <Link to="/currency">
        <span className="ShowMore float-right text-blue-800 text-2xl sm:text-xl font-bold cursor-pointer">Show more</span>
        </Link>
        </div>
        <div className="HomeCryptoContent grid grid-cols-5 sm:flex sm:flex-col sm:justify-center sm:items-center  pb-10">
            {data.map((item)=>{
                return( <CryptoCard Item={item}/>)
            })}
     
      
        </div>

      </section>
      <section className='HomeCryptoNews mt-5'>
      <div className="HomeCryptoNewsHeading flex justify-between">
        <h1 className="HomeCryptoNewsTitle text-2xl font-bold">Top Cypto news around the world</h1>
        <Link to="/newspage">
        <span className="ShowMore float-right text-blue-800 text-2xl font-bold cursor-pointer">Show more</span>
        </Link>
        </div>
        <div className="HomeCryptoNewsContent grid grid-cols-3 sm:flex sm:flex-col sm:justify-center sm:items-center gap-4 pb-10">
        {news.map((item)=>{
                return( <NewsCard Item={item} />)
            })}
           
     
      
        </div>
      </section>
      </div>

    </div>
  );
}
export default Home