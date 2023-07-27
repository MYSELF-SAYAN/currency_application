import React, { useEffect, useState } from "react";
import "../App.css";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import axios from "axios";
export default function Converter() {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [codes, setCodes] = useState([]);
  const [exchangeRate, setExchangeRate] = useState();
  const [input, setInput] = useState();
  const [fromInputChange, setFromInputChange] = useState(true);

  const getCurCode = async () => {
    const res = await axios.get(
      `https://api.currencyapi.com/v3/latest?apikey=cur_live_XlzZgWytPAMrQFVj5LkTC52UNQmKLlNx8rsnAKsD`
    );
    const currencyCodes = Object.keys(res.data.data).map(
      (code) => res.data.data[code].code
    );
    setCodes(currencyCodes);
  };
 
  const getRate = async () => {
    try {
      const res = await axios.get(`https://api.currencyapi.com/v3/latest?apikey=cur_live_XlzZgWytPAMrQFVj5LkTC52UNQmKLlNx8rsnAKsD&base_currency=${fromCurrency}&currencies=${toCurrency}`);
     

      setExchangeRate(res.data.data[toCurrency].value)
    
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCurCode();
  }, []);

  useEffect(() => {
    getRate();
  }, [fromCurrency, toCurrency]);

  let toAmount,fromAmount
  if(fromInputChange){
fromAmount=input
toAmount=exchangeRate*input
  }
  else{
    toAmount=input
    fromAmount=input/exchangeRate
  }
  const handlFromChange = (event) => {
    const selectedValue = event.target.value;
    setFromCurrency(selectedValue);
  };
  const handleToChange = (event) => {
    const selectedValue = event.target.value;
    setToCurrency(selectedValue);
 
  };

  const handleToInput = (event) => {
    const selectedValue = event.target.value;
    setInput(selectedValue);
   setFromInputChange(false)
  };

  const handleFromInput = (event) => {
    const selectedValue = event.target.value;
    setInput(selectedValue);
    setFromInputChange(true)
  };

  const handleSwap=()=>{
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
   
  }

  return (
    <div className="Converter  bg-gray-200 ml-[200px] h-[100vh] flex justify-center items-center sm:ml-0">
      <div className="ConverterWrapper w-[65%] sm:w-[95%] sm:h-1/2 sm:mb-[300px] h-1/2 bg-white  bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-50 border border-gray-100 ">
        <h1 className="py-5 px-5 text-center text-2xl bg-blue-800 font-bold text-white">
          Converter
        </h1>
        <div className="Convertion flex p-8 justify-between ">
          <div className="FromCurrency flex h-10 flex-col w-1/3 ">
            <select
              className="mb-8 p-2 py-3 w-full border-2 border-blue-800"
              value={fromCurrency}
              onChange={handlFromChange}
            >
              {codes.map((cd) => (
                <option key={cd} value={cd}>
                  {cd}
                </option>
              ))}
            </select>
            <input
              type="text"
              className="mb-5 p-2 py-3 w-full bg-slate-300"
              value={fromAmount}
       
              onChange={handleFromInput}
            />
            <p>
              1 {fromCurrency} ={" "}
              {(Math.round(exchangeRate * 100) / 100).toFixed(2)} {toCurrency}
            </p>
          </div>
          <SwapHorizIcon
            size="large"
            className="SwapIcon mt-10 text-blue-800 cursor-pointer" onClick={handleSwap}
          />
          <div className="ToCurrency flex h-10 flex-col w-1/3">
            <select
              className="mb-8 p-2 py-3 w-full  border-2 border-blue-800"
              value={toCurrency}
              onChange={handleToChange}
            >
              {codes.map((cd) => (
                <option key={cd} value={cd}>
                  {cd}
                </option>
              ))}
            </select>
            <input
              type="text"
              className="mb-5 p-2 py-3 w-full bg-slate-300 border-none"
              value={(Math.round(toAmount * 100) / 100).toFixed(2)}
              onChange={handleToInput}
            />
            <p>
              1 {toCurrency} ={" "}
              {(Math.round((1 / exchangeRate) * 100) / 100).toFixed(4)}{" "}
              {fromCurrency}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
