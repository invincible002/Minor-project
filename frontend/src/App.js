import './App.css';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import Homescreen from './screens/Homescreen.js'
import Folder from './screens/Folder';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import {auth} from './Firebase';
import { useEffect, useState } from 'react';
import Test from './screens/Test';
import MultiligualAPI from './screens/MultiLingualAPI';

// function deviceHeight(){
//   return window.innerHeight
// }
function App() {
  const [displayUser, setDisplayUser] = useState();
  useEffect(()=>{
    auth.onAuthStateChanged((user)=>{
      if(user){
        setDisplayUser(user.displayName);
      }
    })
  },[displayUser]);
  return (
    <BrowserRouter>
     <Routes>
      <Route path="/" exact element={<Login/>}  ></Route>
      <Route path="/signup" exact element={<SignUp/>}  ></Route>
      <Route path="/homescreen" exact element={<Homescreen name={displayUser}/>}  ></Route>
      <Route path="/folder" element={<Folder/>} ></Route>
      <Route path="/test" element={<Test/>} ></Route>
      <Route path="/MultilingualAPI" element={<MultiligualAPI/>} ></Route>
     </Routes>
    </BrowserRouter>
  );
}

export default App;
