import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css";
// function for a form in two props 1st register and then login or viceversa
//route --> So the route will be when we want to submit the form so it could be either register route or token route
// method --> it will be tell us whether the user is logging in in or registering

function Form({route, method}){
    const [username, setUsername ] = useState("");
    const [password, setPassword ] = useState("");
    const [loading , setLoading] = useState(false);
    const navigate = useNavigate();

    const name = method === "login" ? "Login" : "Register";
    const handleSubmit = async (e) => {

        setLoading(true);
        e.preventDefault()

    // send the request if there is an error it will catch and 
    // whether it worked or did not we set loading equals to false

        try {
            // the username and password will be sent and if there is an error it will be catch 
            // and if not then we gonna check if the method was login and 
            // if it was then we need to get the access tokken and refresh from the local storage
            const res = await api.post(route, {username, password})
            if (method === "login"){
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/"); // it will navigate to the home page
            }else{
                navigate("/login")
            }
            
        } catch (error) {
            alert(error)
        }
        finally  {
            setLoading(false)
        }
    }

    return <form onSubmit={handleSubmit} className="form-container">
        <h1>{name}</h1>
        <input
            className="form-input"
            type="text"
            value={username}
            onChange={(e) =>setUsername(e.target.value)}
            placeholder="Username"
        />
        <input
            className="form-input"
            type="password"
            value={password}
            onChange={(e) =>setPassword(e.target.value)}
            placeholder="Password"
        />

        <button className="form-button" type="submit">
            {name}
        </button>
    </form>
 
}

export default Form