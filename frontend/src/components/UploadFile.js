import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link, useNavigate } from "react-router-dom";
import { auth, database, storage } from "../Firebase";
import { FaPlusCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { ref, uploadBytes } from "firebase/storage";
import { async } from "@firebase/util";

export default function UploadFile(props) {
  const navigate = useNavigate();
  const [file, setFile] = useState([]);

  const uploadFile = (storageRef, index) => {
    uploadBytes(storageRef, file).then(() => {
      if (index == file.length - 1) {
        alert("File Uploaded");
        props.setUrl([]);
        props.setFiles([]);
        props.refresh();
      }
    });
  };
  const submissionHandler = () => {
    // console.log("state" + file[0]);
    try {
      Array.from(file).forEach((filee, index) => {
        onAuthStateChanged(auth, async (user) => {
          const storageRef = await ref(storage, `${user.email}/` + filee.name);
          // console.log(file.name);
          uploadFile(storageRef, index);
        });
      });

      props.setShowModal(false);
    } catch {
      alert("File Not Uploaded");
    }
    // console.log(file.name);
  };

  const uploadHandler = (event) => {
    setFile(event.target.files);
  };
  return (
    <div>
      <Modal
        show={props.showModal}
        onHide={() => {
          props.setShowModal(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title className="font">Upload File</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="formHorizontal">
            <div className="upload-box">
              <button className="upload-btn">
                <FaPlusCircle className="upload-icon" />
                Upload
              </button>
              <input
                className="upload-input"
                type="file"
                multiple
                onChange={uploadHandler}
              ></input>
              <div className="alert alert-success">{file.name}</div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={submissionHandler}>
            <span style={{ color: "white" }}>Submit</span>
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
