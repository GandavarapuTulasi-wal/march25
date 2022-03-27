import logo from './logo.svg';
import './App.css';
import Home from './Home';
import { Routes, BrowserRouter, Route, Link } from 'react-router-dom';
import User from './User';
import CookieTime from './CookieTime';
import Category from './Category';
import Dishes from './Dishes';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="container">
          <div>
            <h1 className="heading">Car Rental app</h1>
          </div>
          <div className="nav">
            <Link to="/" className="link">
              Home
            </Link>
            <Link to="/user" className="link">
              User
            </Link>
            <Link to="/cookietime" className="link">
              Todos
            </Link>
            <Link to="/category" className="link">
              categories
            </Link>
            <Link to="/dishes" className="link">
              Dishes
            </Link>
          </div>
        </div>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/user" element={<User />}></Route>
          <Route path="/cookietime" element={<CookieTime />}></Route>
          <Route path="/category" element={<Category />}></Route>
          <Route path="/dishes" element={<Dishes />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
