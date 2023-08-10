import React, { useState } from "react";
import { FormControl,InputLabel,Input,Button,FormHelperText } from "@mui/material";
import { useNavigate } from "react-router-dom";


function Auth(){

    const [username, SetUsername] = useState("")
    const [password, SetPassword] = useState("")
    const navigate = useNavigate();

    const handleUsername = (value) => {
        SetUsername(value)
    }

    const handlePassword = (value) => {
        SetPassword(value)
    }

    const sendRequest = (path) =>{
        fetch("/auth/"+path, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
            },
            body : JSON.stringify({
                userName : username,
                password : password,
            }),
        })

        .then((res) => res.json())
        .then((result) => {localStorage.setItem("tokenKey",result.accessToken);
                         localStorage.setItem("refreshKey",result.refreshToken);
                         localStorage.setItem("currentUser",result.userId);
                         localStorage.setItem("userName",username)})
        
        .catch((err) => console.log(err))

        }
    const handleButton = (path) => {
        sendRequest(path)
        SetUsername("")
        SetPassword("")
       // navigate("")
       // 
        {path == "register" ? navigate(0):setTimeout(() => { navigate("/")}, 100)}
           
       //   }, 100);
      
    }

    

   
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
          <FormControl style={{ width: "400px" }}>
            <InputLabel>Username</InputLabel>
            <Input  style={{ top: -4 }}  onChange={(event) => handleUsername(event.target.value)} />
    
            <InputLabel style={{ top: 50 }}>Password</InputLabel>
            <Input onChange={(event) => handlePassword(event.target.value)} />
    
            <Button
              variant="contained"
              style={{
                marginTop: 20,
                background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                color: "white",
              }}
              onClick={() => handleButton("register")}
            >
              Register
            </Button>
    
            <FormHelperText style={{ margin: 20, textAlign: "center" }}>Are you already registered?</FormHelperText>
    
            <Button
              variant="contained"
              style={{
                background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                color: "white",
              }}
              onClick={() => handleButton("login")}
            >
              Login
            </Button>
          </FormControl>
        </div>
      );
    }
export default Auth;