import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MultiligualAPI=()=> {

    const [data, setData] = useState();
    const [sourceText, setSourceText] = useState(''); 
    const translatetext=()=>{
          axios.get("https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=hi&dt=t&q=" + encodeURI(sourceText)).then((res)=>{
          console.log(res)
          setData(res.data[0][0][0])
         })
    }
    const freeTranslate=()=>{
      axios.post('http://localhost:5000/lang',{sourceText}).then((res)=>{
        setData(res.data);
      })
    }
      
  
  return (
    <div className='multiLang_API_wrapper'>
     <div className='textbox_wrapper'>
      <h2 style={{textAlign: 'center'}}>Write anything to change its language</h2>
      <div className='textbox'>
      <div className='source_text'>
       <textarea placeholder='Write here' onChange={(e)=>setSourceText(e.target.value)}></textarea>
      </div>
      <div className='target_text'> 
        <textarea placeholder='Output' value={data}></textarea>
      </div>
      </div>
      <button onClick={translatetext}>Translate using google api</button>
      <button onClick={freeTranslate}>Translate using free-translate</button>
     </div>
    </div>
  );
}
export default MultiligualAPI
