import React, { useState } from 'react';
import { Link } from 'react-router-dom';
export default function NewsCard({Item}) {

  const url = Item.image?.thumbnail?.contentUrl
  const url2=Item.provider[0]?.name
  
console.log(Item)

  return (
  
    <div className='NewsCard bg-white w-[400px] sm:w-[300px] h-auto  mt-3 border border-gray-400'>
      <div className="NewsHeading flex p-3 border-b-2 border-gray-500">
        <h1 className='text-lg'>{Item.name}</h1>
        <img src={url} className='NewsCardImage w-20' alt="" />
      </div>
      <p className="NewsCardDesc p-3 text-sm">
       {Item.description}
      </p>
      <div className="source flex p-4 justify-between">
        <span className='flex'>
        <img src={Item.provider[0]?.image?.thumbnail?.contentUrl} className='w-7 rounded-full mr-2 ' alt="" />
        <p className='text-center sm:text-sm  '>{url2}</p>
        </span>
          
        <Link to={Item.url}><p className='border-b-2 border-gray-400 text-gray-600'>Read more</p> </Link>
      </div>
      
    </div>
 
  );
}
