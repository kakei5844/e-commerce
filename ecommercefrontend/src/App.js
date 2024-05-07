import './App.css';
import Navigation from './customer/components/Navigation/Navigation';
import HomePage from './customer/pages/HomePage/HomePage';
import Footer from './customer/components/Footer/footer';
import Product from './customer/components/Product/Product';
import { Route, Routes } from 'react-router-dom';
import ProductDetails from './customer/components/ProductDetails/ProductDetails';
import Cart from './customer/components/Cart/Cart';
import Checkout from './customer/components/Checkout/Checkout';
import CustomerRouters from './Routers/CustomerRouters';

function App() {
  return (
    <div className=''>
      <Routes>
        <Route path='/*' element={<CustomerRouters/>}></Route>
      </Routes>
    </div>
    
  );
}

export default App;
