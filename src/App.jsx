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
import StockStatistics from './components/stock/StockStatistics'
import MobileMenu from './components/mobileMenu/mobileMenu'
import Footer from './components/footer/Footer'

function App() {
  const { t, i18n } = useTranslation();

  return (
    <div className="drawer">
      <input id="my-drawer-1" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content bg-neutral-900 min-h-screen">
        <Header />
        <div className='flex mx-auto h-full'>
          <Menu />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/stock/:ticker' element={<Stock />} />
            <Route path='/stock/:ticker/statistics' element={<StockStatistics />} />
          </Routes>
        </div>
        <Footer/>
      </div>
      <MobileMenu />
    </div>
  )
}

export default App
