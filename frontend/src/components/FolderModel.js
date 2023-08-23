import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link, useNavigate } from "react-router-dom";
import { auth, database } from '../Firebase';
import { useEffect, useState } from 'react';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

export default function FolderModel( props) {

    const navigate = useNavigate();
    const [value, setValues] = useState({
       folderName: "",
    });
    const [display,setDisplay] = useState(true)
    const submissionHandler=()=>{
        function newUser(){
            return onAuthStateChanged(auth,async (user)=>{
            
              setDoc(doc(database, `${user.email}`, `${value.folderName}`),{
                text: "test"
              });
            })
           
        }
        setDisplay(false);
        navigate("/homescreen");
        newUser();
   }
  
  return (
    <div>

<Modal show={props.name&&display}onHide={()=>setDisplay(false)}>
  <Modal.Header closeButton>
    <Modal.Title className='font'>Create New Folder</Modal.Title>
  </Modal.Header>
  <Modal.Body>
      <form className="form-horizontal">
          <div className="form-group">
              <label for="text" className="control-label font">
                  Folder Name
              </label>
              <input required type="text" id="text" placeholder="Create a name" className="form-control" onChange={(event)=>setValues((prev)=>({...prev, folderName:event.target.value}))}></input>
          </div>
      </form>
  </Modal.Body>
  <Modal.Footer>
      <Button variant="primary" onClick={submissionHandler}>
    <span style={{color:"white"}}>Create</span>
    </Button>
  </Modal.Footer>
</Modal>

    </div>
  );
}
