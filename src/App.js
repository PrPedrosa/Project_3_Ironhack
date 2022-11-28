import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NavBar from './components/NavBar';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import NewFisheryForm from './pages/NewFisheryForm';
import Profile from './pages/Profile';
import Fishes from './pages/Fishes';
import Private from './components/Private';
import AnonUser from './components/AnonUser';
import EditFisheryForm from './pages/EditFisheryForm';
import EditUserForm from './pages/EditUserForm';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path='/' element={<Home/>}/>

        <Route path='/signup' element={
          <AnonUser>
            <SignUp/>
          </AnonUser>
        }/>

        <Route path='/login' element={
          <AnonUser>
            <Login/>
          </AnonUser>
        }/>
        
        <Route path='/add/fishery' element={<NewFisheryForm/>}/>
        <Route path='/edit/fishery/:fisheryId' element={<EditFisheryForm/>}/>

        <Route path='/profile' element={
          <Private>
            <Profile/>
          </Private>
        }/>

        <Route path='/edit/user' element={<EditUserForm/>}/>
        <Route path='/fishes' element={<Fishes/>}/>
      </Routes>
    </div>
  );
}

export default App;
