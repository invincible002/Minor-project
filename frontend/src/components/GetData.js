import React from 'react';
import { collection,getDocs,query } from "firebase/firestore";
import { database } from "../Firebase";



 async function GetData(props) {

    let q = query(collection(database,`${props.substring(0,props.length)}`));
    const querysnapshot = await getDocs(q);
    const allcollections = querysnapshot.docs.map((snap)=>({
        ...snap.data(), id:snap.id
    }));
    // console.log(allcollections)
  return allcollections;
}
export default GetData;
