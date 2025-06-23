//src/main
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import ShopContextProvider from './Context/ShopContext.jsx'
import AddressProvider from './Context/AddressContext.jsx';
import { OrderProvider } from './Context/OrderContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ShopContextProvider>
      <AddressProvider>
        <OrderProvider>
        <App />
        </OrderProvider>
      </AddressProvider>
    </ShopContextProvider>
  </BrowserRouter>,
)
