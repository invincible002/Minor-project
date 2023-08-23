import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, database, storage } from '../Firebase';
import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';

export default function SignUp() {
    const navigate = useNavigate();
 const [value, setValues] = useState({
    name: "",
    email: "",
    pass : "",
    confPass: ""
 });
 const [errMesg, setErrMesg] = useState();


 const submissionHandler=()=>{
    if(!value.name || !value.email || !value.pass || !value.confPass){
        setErrMesg("Fill all Fields");
        return
    }
    createUserWithEmailAndPassword(auth, value.email, value.pass).then(
       async (res)=>{
            const user = res.user;
          await updateProfile(user,{
                displayName: value.name
            });
            const newUserRef = collection(database,value.email);
            const storageRef = ref(storage, `${value.email}/test.pdf`);
            addDoc(newUserRef,{text:"test"});
            uploadBytes(storageRef);
            navigate("/homescreen")
            console.log(user);
    }).catch((err)=> setErrMesg(err.message));
}
  return (
    <>
        <div className="login-background" style={{height:window.innerHeight}}>

      <Modal show={true}>
        <Modal.Header closeButton>
          <Modal.Title className='font'>SignUp</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form className="form-horizontal">
            <div className="form-group input-margin-bottom">
                    <label for="name" className="control-label font">
                       Full Name
                    </label>
                    <input type="text" id="name" placeholder="Enter Name" className="form-control" onChange={(event)=>setValues((prev)=>({...prev,name:event.target.value}))}></input>
                </div>
                <div className="form-group input-margin-bottom">
                    <label for="email" className="control-label font">
                        Email
                    </label>
                    <input type="email" id="email" placeholder="Email" className="form-control"  onChange={(event)=>setValues((prev)=>({...prev, email:event.target.value}))}></input>
                </div>
                <div className="form-group input-margin-bottom">
                    <label for="password" className="control-label font">
                       Create Password
                    </label>
                    <input type="password" id="password" placeholder="Password" className="form-control" onChange={(event)=>setValues((prev)=>({...prev,pass:event.target.value}))}></input>
                </div> 
                <div className="form-group input-margin-bottom">
                    <label for="password" className="control-label font">
                       Confirm Password
                    </label>
                    <input type="password" id="password" placeholder="Password" className="form-control" onChange={(event)=>setValues((prev)=>({...prev,confPass:event.target.value}))}></input>
                </div>
            </form>
            <div className='error-Style font alert alert-danger' role="alert">
              {errMesg}
            </div>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="primary" onClick={submissionHandler}>
          <span style={{color:"white"}}>Register</span>
          </Button>
        </Modal.Footer>
        <div className='signUP'>
        <h6 className='font'>Already have a account? <Link to={"/"}>login</Link></h6>
      </div>
      </Modal>
     
        </div>
        </>
  );
}
