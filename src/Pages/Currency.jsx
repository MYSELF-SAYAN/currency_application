import React, {useState, useEffect } from 'react';
import Sidebar from '../Components/Sidebar';
import "../App.css"
import CryptoCard from '../Components/CryptoCard';
import axios from "axios"

export default function Currency() {
    const options = {
        method: 'GET',
        url: 'https://coinranking1.p.rapidapi.com/coins',
        params: {
          referenceCurrencyUuid: 'yhjMzLPhuIDl',
          timePeriod: '3h',
       
          orderBy: 'marketCap',
          limit: '100',
          
        },
        headers: {
          'X-RapidAPI-Key': '2659ebf51fmshf53e38f969bbf87p1689e2jsna1f7c22a194e',
          'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
        }
      };
const[data,setData]=useState([])
const getData=async ()=>{
const res=await axios.request(options)
setData(res.data.data.coins)
}
useEffect(()=>{
getData()
},[])
  return (
    <div className='Currency absolute ml-[200px] sm:ml-0 w-[87%]  bg-gray-200 h-auto'>
  
      <div className="CurrencyDetails px-5 mt-4">

      <section className='CurrencyCrypto'>
        <div className="CurrencyCryptoHeading flex justify-between sm:justify-center ">
        <h1 className="CurrencyCryptoTitle text-2xl font-bold">Browse all currencies</h1>
       
        </div>
        <div className="CurrencyCryptoContent grid grid-cols-5 gap-4 sm:flex sm:flex-col sm:justify-center sm:items-center pb-10">
            {data.map((item)=>{
                return( <CryptoCard Item={item}/>)
            })}
     
      
        </div>

      </section>
    
      </div>

    </div>
  );
}
