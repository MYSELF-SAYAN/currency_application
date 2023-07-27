import React, {useState, useEffect } from 'react';
import Sidebar from '../Components/Sidebar';
import "../App.css"
import CryptoCard from '../Components/CryptoCard';
import axios from "axios"
import NewsCard from '../Components/NewsCard';
export default function NewsPage() {
    const optionsNews = {
        method: 'GET',
        url: 'https://bing-news-search1.p.rapidapi.com/news/search',
        params: {
          q: 'crypto',
          count: '100',
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
      const[news,setNews]=useState([])
      const getNews=async()=>{
        const res=await axios.request(optionsNews)
        setNews(res.data.value)
       
      }
      useEffect(()=>{
       
        getNews()
        },[])
  return (
    <div className='ml-[200px] sm:ml-0 p-5'>
       <div className="HomeCryptoNewsPageHeading flex justify-between pb-5 border-b-2 border-gray-600 ">
        <h1 className="HomeCryptoNewsPageTitle text-2xl font-bold text-blue-800 sm:text-xl ">Top Cypto news around the world</h1>
       
        </div>
        <div className="HomeCryptoNewsPageContent grid grid-cols-3 gap-4 sm:flex sm:flex-col sm:justify-center sm:items-center pb-10">
        {news.map((item)=>{
                return( <NewsCard Item={item} />)
            })}
           
     
      
        </div>
    </div>
  );
}
