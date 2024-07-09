import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
library.add(fas, fab, far)

import {Routes, Route} from 'react-router-dom'

import Header from './components/header/Header'
import Menu from './components/menu/Menu'
import Home from './components/home/Home'
import Stock from './components/stock/Stock'

function App() {

  return (
    <div className=' bg-neutral-900 min-h-screen'>
      <Header />
      <div className='flex mx-auto h-full'>
        <Menu />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/stock/:ticker' element={<Stock/>} />
        </Routes>
      </div>
    </div>
  )
}

export default App
