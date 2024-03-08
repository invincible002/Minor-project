// ---------------------------THIS PAGE WILL SHOW EVERY FOLDER AND FILE OF A PERTICULAR USER----------------------------

import { Link } from "react-router-dom";
import "../App.css";
import { AiOutlinePlus } from "react-icons/ai";
import { FcFolder } from "react-icons/fc";
import { RiComputerFill } from "react-icons/ri";
import { IoMdSettings } from "react-icons/io";
import { auth, database } from "../Firebase";
import FolderModel from "../components/FolderModel";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import GetData from "../components/GetData";

function Homescreen(props) {
  const [showModal, setShowModal] = useState(false);
  const [listFolder, setListFolder] = useState([]);

  useEffect(() => {
    function newUser() {
      return onAuthStateChanged(auth, async (user) => {
        let data = await GetData(user.email);
        setListFolder(data);
        console.log(setListFolder);
      });
    }
    newUser();
  }, []);

  return (
    <div>
      <FolderModel name={showModal} />
      <div class="background" style={{ height: window.innerHeight }}>
        <Link to="/folder">
          {" "}
          <div
            class="dekstop_icons marginBottom font"
            style={{ color: "white", fontSize: "15px" }}
          >
            <RiComputerFill color="#00A6ED" size={"55px"} />
            This PC
          </div>
        </Link>
        {listFolder.map((item) => {
          return (
            <Link to={"/folder"}>
              <div
                className="dekstop_icons marginBottom font"
                style={{ color: "white", fontSize: "15px" }}
              >
                <FcFolder size={"55px"} />
                {item.id}
              </div>
            </Link>
          );
        })}
        <button
          class="create-folder "
          onClick={() => {
            setShowModal(true);
          }}
        >
          <AiOutlinePlus size="35px" />
        </button>
        {/* <div className="Translator"><Link to={'/MultilingualAPI'}><button>English to Hindi Translator</button></Link></div> */}
      </div>
    </div>
  );
}
export default Homescreen;
