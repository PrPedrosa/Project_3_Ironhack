import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NavBar from './components/NavBar';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import NewFisheryForm from './pages/NewFisheryForm';
import Profile from './pages/Profile';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/add/fishery' element={<NewFisheryForm/>}/>
        <Route path='/profile' element={<Profile/>}/>
      </Routes>
    </div>
  );
}

export default App;
