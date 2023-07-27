
import './App.css';
import Sidebar from './Components/Sidebar';
import Home from './Pages/Home';
import Currency from './Pages/Currency';
import CoinDetails from './Components/CoinDetails';
import Converter from './Pages/Converter';
import { Route,Routes } from 'react-router-dom';
import NewsPage from './Pages/NewsPage';
function App() {
  return (
    <div className="App ">
          <Sidebar/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/currency" element={<Currency/>}/>
            <Route path="/coindetails/:id" element={<CoinDetails/>}/>
            <Route path="/converter" element={<Converter/>}/>
            <Route path="/newspage" element={<NewsPage/>}/>
          </Routes>
        
    </div>
  );
}

export default App;
