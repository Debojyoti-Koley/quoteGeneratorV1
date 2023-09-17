// import React from "react";
// import Home from "./Pages/home";
// import Navbar from "./Pages/navbar";
// import { Route, Routes } from "react-router-dom";
// import Quotes from "./Pages/quotes";
// import AddQuote from "./Pages/addQuote";
// import Login from "./Pages/Login";
// function App() {
//   return (
//     <>
//     <Navbar/>
//     <div>
//       <Routes>
//         <Route path="/" element={<Home/>} />
//         <Route path="/quotes" element={<Quotes/>} />
//         <Route path="/addQuote" element={<AddQuote/>} />
//         <Route path="/Login" element = {<Login/>} />
//       </Routes>
//     </div>
//     </>
    
//   );
// }

// export default App;


import React from "react";
import Home from "./Pages/home";
import Navbar from "./Pages/navbar";
import { Route, Routes, Navigate } from "react-router-dom";
import Quotes from "./Pages/quotes";
import AddQuote from "./Pages/addQuote";
import Login from "./Pages/Login";
import  useAuth  from "./auth"; // Import the authentication hook

function App() {
  // const { user} = useAuth(); // Use the authentication hook
  let userState = localStorage.getItem("sessionState");
  // console.log("isAuthenticated:", isAuthenticated);
  return (
    <>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quotes" element={<Quotes />} />
          {/* Protect the /addQuote route */}
          <Route
            path="/addQuote"
            element={userState ? <AddQuote /> : <Navigate to="/Login" />}
          />
          {/* <Route path="/addQuote" element={<AddQuote />} /> */}
          <Route path="/Login" element={<Login />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
