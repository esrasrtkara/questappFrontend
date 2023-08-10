import React, { useState } from "react";
import { Link } from "react-router-dom";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Button, InputAdornment, OutlinedInput } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

function PostForm(props) {
    const { userId, userName, refreshPosts } = props;
    const [text, setText] = useState("");
    const [title, setTitle] = useState("");
    const [isSent, setIsSent] = useState(false);

   

    const savePost = () => {
        const createPostRequest = {
            title: title,
            userId: userId,
            text: text,
        };

        fetch("/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization" : localStorage.getItem("tokenKey")
            },
            body: JSON.stringify(createPostRequest),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("Post saved:", data);
                console.log(title, text, userId);
            })
            .catch((err) => {
                console.log("Error:", err);
            });
    };

    const handleSubmit = () => {
        savePost();
        setIsSent(true);
        setTitle("");
        setText("");
        refreshPosts();
    };

    const handleTitle = (event) => {
        setTitle(event.target.value);
        setIsSent(false);
    };

    const handleText = (event) => {
        setText(event.target.value);
        setIsSent(false);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setIsSent(false);
    };

    return (
        <div>

            <Snackbar open={isSent} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Your post is sent!
                </Alert>
            </Snackbar>
            <Card sx={{ maxWidth: 800, textAlign: "left", margin: 20 }}>
                <CardHeader
                    avatar={
                        <Link
                            to={{ pathname: "/users/" + userId }}
                            style={{ textDecoration: "none", boxShadow: "none", color: "white" }}
                        >
                            <Avatar
                                sx={{ background: 'linear-gradient(45deg, #2196F3 30%,#21CBF3 90%)' }}
                                aria-label="recipe"
                            >
                                {userName.charAt(0).toUpperCase()}
                            </Avatar>
                        </Link>
                    }
                    title={
                        <OutlinedInput
                            id="outlined-adorment-amount"
                            multiline
                            placeholder="Title"
                            inputProps={{ maxLength: 25 }}
                            fullWidth
                            value={title}
                            onChange={handleTitle}
                        />
                    }
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        <OutlinedInput
                            id="outlined-adorment-amount"
                            multiline
                            placeholder="Text"
                            inputProps={{ maxLength: 250 }}
                            fullWidth
                            value={text}
                            onChange={handleText}
                            endAdornment={
                                <InputAdornment position="end">
                                    <Button
                                        variant="contained"
                                        style={{
                                            background: 'linear-gradient(45deg, #2196F3 30%,#21CBF3 90%)',
                                            color: 'white'
                                        }}
                                        onClick={handleSubmit}
                                    >
                                        Post
                                    </Button>
                                </InputAdornment>
                            }
                        />
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}

export default PostForm;
