import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom"
function CryptoCard({Item}) {
const num=Item.price


  return (
    <Link to={"/coindetails/" + Item.uuid }>
    <div className='CryptoCard bg-white w-[250px] h-auto pt-3 mt-3' >
    <div className="CryptoCardHeading flex justify-between px-2 border-b-2 border-gray-300 pb-2 ">
      <h1 className='CryptoCardHeadingTitle'>{Item.rank}. <span>{Item.name}</span></h1>
      <img src={Item.iconUrl} className='w-5' alt="" />
    </div>
    <div className="CryptoCardStats">
<ul className="mt-2 pb-2">
    <li className="mt-2 pl-6 ">Price: <span >{(Math.round(num * 100) / 100).toFixed(2)}$</span></li>
    <li className="mt-2 pl-6">Market cap: <span>{Item.marketCap}</span></li>
    <li className="mt-2 pl-6">Daily change: <span>{Item.change}</span></li>
</ul>
    </div>
  </div>
  </Link>
  );
}

export default CryptoCard;
