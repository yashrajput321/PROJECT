//src/main
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import ShopContextProvider from './Context/ShopContext.jsx'
import AddressProvider from './Context/AddressContext.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ShopContextProvider>
      <AddressProvider>
        <App />
      </AddressProvider>
    </ShopContextProvider>
  </BrowserRouter>,
)
