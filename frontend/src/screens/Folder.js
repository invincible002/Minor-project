//----------------THIS IS THE BASIC LOOK OF A FOLDER AND WILL ROUTE THE USER TO DIFFERENT FOLDERS --------------------

import "../App.css";
import { AiFillFolder } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import { RiComputerFill } from "react-icons/ri";
import { BsFileTextFill, BsFillFileTextFill } from "react-icons/bs";
import { TfiDownload } from "react-icons/tfi";
import { TfiHome } from "react-icons/tfi";
import { Link } from "react-router-dom";
import UploadFile from "../components/UploadFile";
import React, { useEffect, useState } from "react";
import { listAll, ref, getDownloadURL, deleteObject } from "firebase/storage";
import { auth, storage } from "../Firebase";
import { onAuthStateChanged } from "firebase/auth";

function Folder() {
  const [showModal, setShowModal] = useState(false);
  const [listRef, setListRef] = useState();
  const [currentUser, setCurrentUser] = useState();
  const [Url, setUrl] = useState([]);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      await setListRef(ref(storage, `${user.email}`));
      setCurrentUser(user.email);
    });
  }, []);
  useEffect(() => {
    listAll(listRef).then((res) => {
      res.items.forEach(function (itemRef) {
        setFiles((p) => [...p, itemRef.name.toString()]);
      });
    });
  }, [listRef]);

  useEffect(() => {
    getUrl();
  }, [files]);

  const getUrl = () => {
    files.map((data, i) => {
      console.log(data);
      getDownloadURL(ref(storage, `${currentUser + "/" + data}`)).then(
        (url) => {
          let downloadurl = { index: i, link: url, file: data };
          setUrl((prev) => [...prev, downloadurl]);
        }
      );
    });
  };

  const Delete = (data) => {
    let deleteRef = ref(storage, `${currentUser + "/" + data}`);
    deleteObject(deleteRef).then(() => {
      console.log("deleted");
      window.location.reload(true);
    });
  };

  return (
    <>
      <UploadFile name={showModal} />
      <div
        className="folder-body"
        style={{ height: window.innerHeight - 1, width: window.innerWidth }}
      >
        <div className="folder-wrapper container-fluid">
          <div className="row top">
            {" "}
            {/*Name of the folder at the top */}
            <div className="col-md-1 home-wrapper">
              <Link to={"/homescreen"}>
                <div className="home">
                  <TfiHome size="25px" />
                </div>
              </Link>
            </div>
            <div className="col-md-9 navigation-border">
              <p>
                <AiFillFolder color="yellow" size={"25px"} />
                <span className="this-pc">This PC</span> {">"}
              </p>
            </div>
            <div className="col-md-2 home-wrapper">
              <button
                className="uploadBtn"
                onClick={() => {
                  setShowModal(true);
                }}
              >
                <strong>Upload Files</strong>
              </button>
            </div>
          </div>
        </div>
        <div className="folder-content">
          <div className="row">
            <div
              className="col-md-2 left-navigation"
              style={{ height: window.innerHeight - 70 }}
            >
              <div className="left-content">
                <ul className="left-list">
                  <li className="left-listItems font">
                    {" "}
                    <IoIosArrowForward />
                    <RiComputerFill
                      color="#00A6ED"
                      style={{ marginRight: "8px", marginLeft: "5px" }}
                      size="20px"
                    />
                    This Pc
                  </li>
                  <li className="left-listItems font">
                    {" "}
                    <IoIosArrowForward />
                    <BsFileTextFill
                      color="#8DABC6"
                      style={{ marginRight: "8px", marginLeft: "5px" }}
                      size="20px"
                    />
                    Documents
                  </li>
                  <li className="left-listItems font">
                    {" "}
                    <IoIosArrowForward />
                    <TfiDownload
                      color="#15BB94"
                      style={{ marginRight: "8px", marginLeft: "5px" }}
                      size="20px"
                    />
                    Download
                  </li>
                  <li></li>
                </ul>
              </div>
            </div>
            <div
              className="col-md-10 "
              style={{ height: window.innerHeight - 70 }}
            >
              <ul className="folder-items">
                {Url &&
                  Url.map((data, index) => {
                    return (
                      <div className="file-list">
                        <a href={`${data.link}`}>
                          <li className="left-listItems font ">
                            <BsFillFileTextFill
                              size="20px"
                              color="rgb(255, 217, 0)"
                              style={{ marginRight: "8px", marginLeft: "5px" }}
                            />
                            {data.file}{" "}
                          </li>
                        </a>{" "}
                        <button
                          className="Delete font"
                          onClick={() => {
                            Delete(data.file);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    );
                  })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Folder;
// listAll().then((res) => {
//   res.items.forEach((itemRef) => {
//   console.log(itemRef.name)
//   });
// }).catch((error) => {
//   // Uh-oh, an error occurred!
// })
// files.map((data,i)=>{

//   let link = getDownloadURL(ref(storage,`${currentUser + "/"+ data}`)).then((url)=>{
//      return ({url});
//    })
//    link.then((res)=>{
//      console.log(res.url);
//    })
//    return(
//      <a href={link.then((res)=>{return (res.url)})}><li className="left-listItems font file-list"><BsFillFileTextFill size="20px" color="rgb(255, 217, 0)" style={{marginRight:"8px",marginLeft:"5px"}}/>{data}</li></a>
//    )
//  })
