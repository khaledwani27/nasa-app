import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar';
import Search from './components/Search';
import Favourites from './components/Favourites';
import Home from './components/Home';

function App() {
  return (
    <Router>
        <NavBar/> 
        <Routes>
           <Route path="/" element={<Home/>} />
           <Route path="/search" element={<Search/>} />
           <Route path="/favourites" element={<Favourites/>} />
        </Routes>
    </Router>
    
  );
}

export default App;

