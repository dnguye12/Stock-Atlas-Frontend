import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
library.add(fas, fab, far)

import { Routes, Route } from 'react-router-dom'
import { useTranslation } from 'react-i18next';

import Header from './components/header/Header'
import Menu from './components/menu/Menu'
import Home from './components/home/Home'
import Stock from './components/stock/Stock'
import MobileMenu from './components/menu/components/mobileMenu'
import Footer from './components/footer/Footer'
import MostShortedStocks from './components/screeners/MostShortedStocks'
import DayGainers from './components/screeners/DayGainers'
import DayLosers from './components/screeners/DayLosers'
import MostActives from './components/screeners/MostActives'

function App() {
  const { t, i18n } = useTranslation();

  return (
    <div className="drawer ">
      <input id="my-drawer-1" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content min-h-screen">
        <Header />
        <div className='flex mx-auto h-full bg-neutral-950'>
          <Menu />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/stock/:ticker/*' element={<Stock />} />

            <Route path='/most-shorted-stocks/*' element={<MostShortedStocks />} />
            <Route path='/day-gainers' element={<DayGainers />} />
            <Route path='/day-losers' element={<DayLosers />} />
            <Route path='/most-active' element={<MostActives />} />
            {/*
            <Route path='/stock/:ticker/statistics' element={<StockStatistics />} />
            <Route path='/stock/:ticker/analyst-ratings' element={<StockAnalystRating />} />
            <Route path='/stock/:ticker/dividends' element={<StockDividend />} />
            <Route path='/stock/:ticker/profile' element={<StockProfile />} />
            */}
          </Routes>
        </div>
        <Footer />
      </div>
      <MobileMenu />
    </div>
  )
}

export default App
