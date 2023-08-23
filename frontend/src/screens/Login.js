import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import {signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../Firebase';


function Login(){
    const navigate = useNavigate();
    const [value, setValues] = useState({
       email: "",
       pass : "",
    });
    const [errMesg, setErrMesg] = useState();
   
   
    const submissionHandler=()=>{
       if(!value.email || !value.pass){
           setErrMesg("Fill all Fields");
           return
       }
       signInWithEmailAndPassword(auth, value.email, value.pass).then(
          async (res)=>{
               const user = res.user;
               navigate("/homescreen")
       }).catch((err)=>{
        setErrMesg(err.message);
       }
       );
   }
    return(
        <>
        <div className="login-background" style={{height:window.innerHeight}}>

      <Modal show={true}>
        <Modal.Header>
          <Modal.Title className='font'>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form className="form-horizontal">
                <div className="form-group">
                    <label for="email" className="control-label font">
                        Email
                    </label>
                    <input type="email" id="email" placeholder="Email" className="form-control" onChange={(event)=>setValues((prev)=>({...prev, email:event.target.value}))}></input>
                </div>
                <div className="form-group">
                    <label for="password" className="control-label font">
                        Password
                    </label>
                    <input type="password" id="password" placeholder="Password" className="form-control"  onChange={(event)=>setValues((prev)=>({...prev, pass:event.target.value}))}></input>
                </div>
            </form>
            <div className='error-Style font alert alert-danger' role="alert">
              {errMesg}
            </div>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="primary" onClick={submissionHandler}>
          <span style={{color:"white"}}>Login</span>
          </Button>
        </Modal.Footer>
        <div className='signUP'>
        <h6 className='font'>Don't have a account? <Link to={"/signup"}>Sign Up</Link></h6>
      </div>
      </Modal>
     
        </div>
        </>
    );
}
export default Login;