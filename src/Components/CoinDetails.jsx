import React, { useEffect, useState } from "react";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import TagIcon from "@mui/icons-material/Tag";
import BoltIcon from "@mui/icons-material/Bolt";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useParams } from "react-router-dom";
import axios from "axios";
import millify from "millify";
import { Link, useNavigate } from "react-router-dom";
import LineChart from "./LineChart";


export default function CoinDetails() {
  const navigate = useNavigate();
  const params = useParams();
  const [datas, setDatas] = useState({});
  const [allTimeHigh, setAllTimeHigh] = useState();
  const [approvedSup, setApprovedSup] = useState();
  const [totalSup, setTotalSup] = useState();
  const [circulatingSup, setCirculatingSup] = useState();
  const [links, setLinks] = useState([]);
  const [timePeriods,setTimePeriod]=useState("7d")
  const [saveHistory,setSaveHistory]=useState()
  const [loading,setLoading]=useState(true);

  const options = {
    method: "GET",
    url: ` https://coinranking1.p.rapidapi.com/coin/${params.id}`,
    params: {
      referenceCurrencyUuid: "yhjMzLPhuIDl",
      timePeriod: "24h",
    },
    headers: {
      "X-RapidAPI-Key": "2659ebf51fmshf53e38f969bbf87p1689e2jsna1f7c22a194e",
      "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
    },
  };
  const optionsHistory = {
    method: 'GET',
    url: `https://coinranking1.p.rapidapi.com/coin/${params.id}/history`,
    params: {
      referenceCurrencyUuid: 'yhjMzLPhuIDl',
      timePeriod: timePeriods
    },
    headers: {
      'X-RapidAPI-Key': '76f96e48b8mshb64cb1151910667p1b6e84jsnc4d9b3c183b5',
      'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
    }
  };





  const getData = async () => {
    const res = await axios.request(options);

    setDatas(res.data.data.coin);

    setAllTimeHigh(res.data.data.coin.allTimeHigh.price);
    setApprovedSup(res.data.data.coin.supply.confirmed);
    setCirculatingSup(res.data.data.coin.supply.circulating);
    setTotalSup(res.data.data.coin.supply.total);
    setLinks(res.data.data.coin.links);
    
  };
  const getHistory = async () => {
    try {
      const res = await axios.request(optionsHistory);
      setSaveHistory(res.data.data.history);
      setLoading(false)
    } catch (error) {
      console.error('Error fetching history:', error);
    }
  };

  useEffect(() => {
    getData();
    getHistory()
  }, [params.id,timePeriods]);
console.log(saveHistory)
 /* useEffect(() => {
    
    console.log(saveHistory); // This should show the updated value after the axios request is complete
  }, [saveHistory]);
*/
  const vol = datas["24hVolume"];
  const marketCap = datas.marketCap;
  const numberOfMarkets = datas.numberOfMarkets;
  const numberOfExchanges = datas.numberOfExchanges;

  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];
  const handleTimeChange = (event) => {
    const selectedValue = event.target.value;
    setTimePeriod(selectedValue);
  };

 // 
  return (
    <div className="CoinDetails ml-[200px] sm:ml-0  ">
    
      <div className="CoinHead border-b-2 border-gray-500 mx-10 text-center">
        <h1 className="text-2xl pt-5 text-blue-800 font-bold">
          {datas.name} Price
        </h1>
        <h6 className="text-gray-700 text-lg pt-5 pb-5">
          {datas.name} live price in US Dollar(USD),View value statistics,
          market cap and supply
        </h6>
      </div>
      <select value={timePeriods} className="ml-16 mt-5 border-2 border-blue-800" onChange={handleTimeChange}>
        {time.map((period) => (
          <option key={period} value={period}>
            {period}
          </option>
        ))}
      </select>
      {loading?"loading":<LineChart className="w-[250px]" historicalData={saveHistory}  />}
      <div className="CoinDesc grid grid-cols-2 gap-3 sm:flex sm:flex-col sm:justify-center sm:items-center mx-10 pt-5">
        <div className="CoinValueStat w-[600px] sm:w-[350px] h-auto  ml-3 px-4">
          <div className="CoinValueStatHead ">
            <h1 className=" text-2xl text-blue-800 mt-5 ">
              {datas.name} Value Statistics
            </h1>
            <h6 className="text-lg text-gray-600 mt-3 mb-2">
              An overview showing the statistics of {datas.name}
            </h6>
          </div>
          <ul>
            <li className="flex justify-between mb-3 border-b border-gray-300 pb-2">
              <span className="text-[1.2rem] text-gray-600">
                <AttachMoneyIcon /> Price to USD
              </span>
              <span className="text-[1.2rem] text-gray-600">
                ${millify(datas.price)}
              </span>
            </li>
            <li className="flex justify-between mb-3 border-b border-gray-300 pb-2">
              <span className="text-[1.2rem] text-gray-600">
                <TagIcon /> Rank
              </span>
              <span className="text-[1.2rem] text-gray-600">{datas.rank}</span>
            </li>
            <li className="flex justify-between mb-3 border-b border-gray-300 pb-2">
              <span className="text-[1.2rem] text-gray-600">
                <BoltIcon />
                24h volume
              </span>
              <span className="text-[1.2rem] text-gray-600">
                ${millify(vol)}
              </span>
            </li>
            <li className="flex justify-between border-b border-gray-300 mb-3  pb-2">
              <span className="text-[1.2rem] text-gray-600">
                <AttachMoneyIcon /> Market Cap
              </span>
              <span className="text-[1.2rem] text-gray-600">
                ${millify(marketCap)}
              </span>
            </li>
            <li className="flex justify-between mb-3  pb-2">
              <span className="text-[1.2rem] text-gray-600">
                <EmojiEventsIcon /> AllTimeHigh(daily avg.)
              </span>
              <span className="text-[1.2rem] text-gray-600">
                ${millify(allTimeHigh)}
              </span>
            </li>
          </ul>
        </div>
        <div className="OtherStat w-[600px] h-auto sm:w-[350px]   ml-3 px-4">
          <div className="CoinValueStatHead ">
            <h1 className=" text-2xl text-blue-800 mt-5 ">Other Stats Info</h1>
            <h6 className="text-lg text-gray-600 mt-3 mb-2">
              An overview showing the statistics of {datas.name}
            </h6>
          </div>
          <ul>
            <li className="flex justify-between mb-3 border-b border-gray-300 pb-2">
              <span className="text-[1.2rem] text-gray-600">
                <QueryStatsIcon /> Number Of Markets
              </span>
              <span className="text-[1.2rem] text-gray-600">
                {millify(numberOfMarkets)}
              </span>
            </li>
            <li className="flex justify-between mb-3 border-b border-gray-300 pb-2">
              <span className="text-[1.2rem] text-gray-600">
                <CurrencyExchangeIcon /> Number Of Exchanges
              </span>
              <span className="text-[1.2rem] text-gray-600">
                {millify(numberOfExchanges)}
              </span>
            </li>
            <li className="flex justify-between mb-3 border-b border-gray-300 pb-2">
              <span className="text-[1.2rem] text-gray-600">
                <ErrorOutlineIcon /> Approved Supply
              </span>
              <span className="text-[1.2rem] text-gray-600">
                {approvedSup ? "✓" : "✖"}
              </span>
            </li>
            <li className="flex justify-between mb-3 border-b border-gray-300 pb-2">
              <span className="text-[1.2rem] text-gray-600">
                <ErrorOutlineIcon /> Total Supply
              </span>
              <span className="text-[1.2rem] text-gray-600">
                {millify(totalSup)}
              </span>
            </li>
            <li className="flex justify-between mb-3  pb-2">
              <span className="text-[1.2rem] text-gray-600">
                <ErrorOutlineIcon /> Circulating Supply
              </span>
              <span className="text-[1.2rem] text-gray-600">
                {millify(circulatingSup)}
              </span>
            </li>
          </ul>
        </div>
        <div className="CoinDefination w-[600px] h-auto  ml-3 px-4 sm:w-[350px] ">
          <div className="CoinWhat mt-5">
            <h1 className="text-2xl text-blue-800 font-bold">
              What is {datas.name}?
            </h1>
            <p className="mt-1 text-gray-500 text-lg">{datas.description}</p>
          </div>
        </div>
        <div className="CoinLinks w-[600px] sm:w-[350px]  h-auto ">
          <h1 className="text-2xl text-blue-800 font-bold px-3">
            {datas.name} Links
          </h1>
          <div className="Links">
            <ul className="mt-5">
              {links.map((lii) => {
                return (
                  <Link to={lii.url}>
                    <li className="flex justify-between px-3 mb-3 cursor-pointer">
                      <span>{lii.type}</span>
                      <span className="text-blue-800 text-lg">{lii.url}</span>
                    </li>{" "}
                  </Link>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
