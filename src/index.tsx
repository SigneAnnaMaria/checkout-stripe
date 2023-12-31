import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { ShopProvider } from './components/ShopContext'
import { BrowserRouter as Router } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <ShopProvider>
    <Router>
      <App />
    </Router>
  </ShopProvider>
)
