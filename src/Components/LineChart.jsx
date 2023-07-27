import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
export default function LineChart({historicalData}) {
  const [timestamp,setTimestamp]=useState()
    const coinPrice = [];
    const coinTimestamp = [];
    let arrayLength = historicalData.length;

    for(let i=0;i<arrayLength;i++){
      coinPrice.push(historicalData[i].price)
    }
    for(let i=0;i<arrayLength;i++){
      
      coinTimestamp.push(new Date(historicalData[i].timestamp*1000).toLocaleDateString())
    }
  
    const data = {
      labels: coinTimestamp,
      datasets: [
        {
          label: 'Price In USD',
          data: coinPrice,
          fill: false,
          backgroundColor: '#0071bd',
          borderColor: '#0071bd',
        },
      ],
    };
    /*const options = {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };*/
    const options = {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    };
  return (
    
    <div className='ml-10 sm:h-[250px] sm:ml-0  sm:m-2'>
      <Line data={data} options={options} />
    </div>
  );
}
