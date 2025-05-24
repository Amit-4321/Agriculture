import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import './i18n';
import { CartProvider } from './components/pages/CartContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
<CartProvider>

    <App />
</CartProvider>
  </StrictMode>,
)
