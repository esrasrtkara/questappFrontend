import React from "react";
import { Link,useNavigate } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import LockIcon from '@mui/icons-material/Lock';



function Navbar() {


  const navigate = useNavigate();

  const onClick = () => {

    localStorage.removeItem("tokenKey")
    localStorage.removeItem("currentUser")
    localStorage.removeItem("refreshKey")
    localStorage.removeItem("userName")

    navigate(0);

    

  }
 
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 , textAlign : "start"}}>
  <         Link to="/" style={{ textDecoration: "none",boxShadow :"none", color :"white" }}>
              Home
            </Link>
          </Typography >
          <Typography variant="h6" >
            {localStorage.getItem("currentUser") == null ? <Link  to="/auth">Login/Register</Link>:
            <div><IconButton onClick={onClick}><LockIcon></LockIcon></IconButton>
            <Link to={{ pathname: "/users/" + localStorage.getItem("currentUser") }} style={{ textDecoration: "none",boxShadow :"none", color :"white" }}>
            Profile
            </Link>
            </div>}
            </Typography>
          
        </Toolbar>
      </AppBar>
      </Box>
    </div>
  );
}

export default Navbar;