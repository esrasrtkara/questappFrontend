import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {
  Box,
  Modal,
  List,
 
  ListItemSecondaryAction,
  Radio,
  ListItem,
} from '@mui/material';

export default function Avatar(props) {
  const {avatarId,userId,userName} = props;
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(avatarId);
  

  const saveAvatar = () => {
    


    console.log("Hello")
    fetch("/users/"+localStorage.getItem("currentUser"),{
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : localStorage.getItem("tokenKey"),
      },
      body: JSON.stringify({
        avatar : selectedValue,
      }),
    })
    .then((res) => res.json())
    .catch((err) => console.log(err) )
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    saveAvatar();
  };

  


  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div>
      <Card sx={{ maxWidth: 345, margin: 5 }}>
        <CardMedia component="img" alt="User Avatar"  image={`/avatars/avatar${selectedValue}.png`}/>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          {userName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Hi,
            My name is {userName}
          </Typography>
        </CardContent>
        <CardActions>
          {localStorage.getItem("currentUser") == userId ? <Button onClick={handleOpen}>
          Change Avatar
          </Button> : ""}
        </CardActions>
      </Card>

      <Modal
       
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Hello
          </Typography>
          <List dense>
      {[1, 2, 3, 4, 5, 6].map((key) => {
        const labelId = `checkbox-list-secondary-label-${key}`;
        return (
          <ListItem key={key} >
              <CardMedia
              style = {{maxWidth: 100}}
              component="img"
              alt={`Avatar n°${key}`}
              image={`/avatars/avatar${key}.png`}
              title="User Avatar"
              />
            <ListItemSecondaryAction>
              <Radio
                edge="end"
                value= {key}
                onChange={handleChange}
                checked={""+selectedValue === ""+key}
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
        </Box>
      </Modal>
    </div>
  );
}
