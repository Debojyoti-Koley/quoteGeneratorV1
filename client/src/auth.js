// auth.js

import { useState, useEffect } from 'react';
import { redirect, useNavigate } from 'react-router-dom';

export default function useAuth() {
  // let user=false;
  localStorage.setItem("sessionState",false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Check if the user is authenticated based on the response from the /login route
    async function checkAuthentication() {
      try {
        const response = await fetch('/Login'); // Replace with your server's login endpoint
        if (response.ok) {
          // User is authenticated
          // console.log("testing response", response); //Uncomment it 
          localStorage.setItem("sessionState",true);
          navigate("/addQuote")
          
        } else {
          // User is not authenticated
          // Authentication fails
        }
      } catch (error) {
        console.error('Error checking user authentication:', error);
      } finally {
        setLoading(false);
      }
    }
  
    checkAuthentication();
  }, []);
  

  return { loading };
}
