import { Link } from "react-router-dom"
export default function Navbar(){
    return(
        <nav>
            <Link to="/">Home</Link >
            <Link to="/quotes">Quotes</Link >
            <Link to="/addQuote">Add Quotes</Link>
            <Link to = "/Login"> Login</Link>
            <Link to= "/addQuote">Logout</Link>
        </nav>
    )
}