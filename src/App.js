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
import AddFishForm from './pages/AddFishForm';
import EditFishForm from './pages/EditFishForm';
import UserFishes from './pages/UserFishes';
import AddTrashForm from './pages/AddTrashForm';
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <NavBar />
      <ToastContainer />
      
      <Routes>
        <Route path='/' element={<Home/>}/>

        <Route path='/fishes' element={<Fishes/>}/>

        <Route path='/add/trash' element={<AddTrashForm/>}/>

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
        
        <Route path='/add/fishery' element={
          <Private>
            <NewFisheryForm/>
          </Private>
        }/>

        <Route path='/edit/fishery/:fisheryId' element={
          <Private>
            <EditFisheryForm/>
          </Private>
        }/>

        <Route path='/profile' element={
          <Private>
            <Profile/>
          </Private>
        }/>

        <Route path='/edit/user/' element={
          <Private>
            <EditUserForm/>
          </Private>
        }/>

        <Route path='/userfishes' element={
          <Private>
            <UserFishes/>
          </Private>
        }/>

        <Route path='/add/fish/' element={
          <Private>
            <AddFishForm/>
          </Private>
        }/>

        <Route path='/edit/fish/:fishId' element={
          <Private>
            <EditFishForm/>
          </Private>
        }/>
      </Routes>
    </div>
  );
}

export default App;
