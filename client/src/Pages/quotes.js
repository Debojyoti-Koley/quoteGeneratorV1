import React from "react";
import { useState, useEffect } from "react";
function Quotes(){
    const [quote,setQuote] = useState("");

    const fetchNewquote = () => {
        fetch('http://localhost:3001/quotes')
        .then((res)=>res.json())
        .then((data)=>{
            console.log("data is",data.text);
            setQuote(data.text);
        })
        .catch((err)=>{
            console.log("Error while fetching data using button",err);
        })
    }
    // useEffect(()=>{
    //     fetch('http://localhost:3001/quotes')
    //     .then((res)=>res.json())
    //     .then((data)=>{
    //         setQuote(data.quote);
    //     })
    //     .catch((error)=>{
    //         console.log("Error fetching the quote ",error);
    //     });
    //     fetchNewquote();
    // },[]);
    return(
        <>
        <h1>Quotes Page</h1>
        <div>{quote}</div>
        <button onClick={fetchNewquote}>Click</button>
        </>
    )
}
export default Quotes;