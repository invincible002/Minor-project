import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link, useNavigate } from "react-router-dom";
import { auth, database, storage } from '../Firebase';
import {FaPlusCircle} from "react-icons/fa";
import { useEffect, useState } from 'react';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { ref, uploadBytes } from 'firebase/storage';
import { async } from '@firebase/util';

export default function UploadFile( props) {

    const navigate = useNavigate();
    const [storageRef, setStorageRef] = useState();
    const [display,setDisplay] = useState(true)
    const [file, setFile] = useState({
      name:'No file chosen'
    });

    const uploadFile =(storageRef)=>{
      uploadBytes(storageRef,file).then(()=>{
        alert("File Uploaded");
        window.location.reload(true);
      })
    }
    const submissionHandler=()=>{
        
      onAuthStateChanged(auth,async(user)=>{
        setStorageRef (await ref(storage,`${user.email}/`+ file.name));
        // console.log(file.name);
        
        })
        console.log(storageRef)
        uploadFile(storageRef);
     
        
      // console.log(file.name);   
      setDisplay(false);
      navigate("/folder");
   }

    const uploadHandler= (event)=>{
       setFile(event.target.files[0]);
    }
  return (
    <div>

<Modal show={props.name&&display}onHide={()=>setDisplay(false)}>
  <Modal.Header closeButton>
    <Modal.Title className='font'>Upload File</Modal.Title>
  </Modal.Header>
  <Modal.Body>
      <form className="formHorizontal">
         <div className='upload-box'>
            <button className='upload-btn'><FaPlusCircle className='upload-icon'/>Upload</button>
            <input  className='upload-input' type='file' onChange={uploadHandler}></input>
            <div className='alert alert-success'>{file.name}</div>
         </div>
      </form>
  </Modal.Body>
  <Modal.Footer>
      <Button variant="primary" onClick={submissionHandler}>
    <span style={{color:"white"}}>Submit</span>
    </Button>
  </Modal.Footer>
</Modal>

    </div>
  );
}
