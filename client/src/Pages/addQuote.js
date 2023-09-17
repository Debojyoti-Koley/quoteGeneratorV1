import React from "react";
import { useState } from "react";
import  useAuth  from "../auth"; // Import the authentication hook
import { redirect, useNavigate } from 'react-router-dom';

function AddQuote(){
    // const {user, setUser} = useAuth();
    let userState = localStorage.getItem("sessionState");
    const navigate = useNavigate();
    const [newQuoteText, setNewQuoteText] = useState("");
    const addNewquote = async ()=>{
        try{
            const response = await fetch('http://localhost:3001/addQuote',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({text : newQuoteText}),
            });
            if(response.status === 201){
                console.log("Quote added successfully");
                alert("Quote added successfully");
            }
            else{
                console.error("error adding quote", await response.text());
            }
        }
        catch (err){
            console.error("error adding quote",err);
        }
    }

    const textareaChange = (e)=>{
        setNewQuoteText(e.target.value);
    }
    const logout = () =>{
        // setUser(false);
        localStorage.setItem("sessionState",false);
        navigate("/");
    }
    userState = localStorage.getItem("sessionState");
    return (
    <>
        {
            userState ? 
            <>
            <div>AddQuote </div>
            <form>
                <textarea placeholder="Write here" value={newQuoteText} onChange={textareaChange}/>
                <br/>
                <button onClick={addNewquote}>Add Quote</button>
            </form>
                <button type="submit" onClick={logout}>Logout</button>
            </>
            :
            navigate("/")
        }

    </>
        
    )
}

export default AddQuote;