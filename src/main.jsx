import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'

document.documentElement.setAttribute('data-theme', 'dark')

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)
