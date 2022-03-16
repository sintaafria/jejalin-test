import "./App.css"
import { useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { listen } from './app/listener';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Home from './pages/Product';
import RegisterUser from './pages/Register';
import ProductDetail from "./pages/ProductDetail";

function App() {

  useEffect(() => {
    listen();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/register" element={<RegisterUser/>} />
        {/* <Route path="/register-success" element={RegisterSuccess} /> */}
        <Route path="/login" element={<Login/>} />
        <Route path="/logout" element={<Logout/>} />
        <Route path="/product/:id" element={<ProductDetail/>} />
      </Routes>
    </Router>
  );
}

export default App;
