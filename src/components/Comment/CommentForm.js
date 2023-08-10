import React, { useState } from "react";
import { Avatar, CardContent, InputAdornment, OutlinedInput, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import SendIcon from '@mui/icons-material/Send';
import { refreshToken } from "../../services/HttpService";


const CommentContainer = styled(CardContent)(({ theme }) => ({
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "center",
}));

const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: theme.spacing(4),
    height: theme.spacing(4),
}));

const CommentLink = styled(Link)(({ theme }) => ({
    textDecoration: 'none',
    boxShadow: 'none',
    color: theme.palette.common.white,
}));



function CommentForm(props) {
    const { userId, userName, postId, setCommentRefresh } = props;
    const [text, setText] = useState("");
    const navigate = useNavigate();


    const logout = () => {

        localStorage.removeItem("tokenKey")
        localStorage.removeItem("currentUser")
        localStorage.removeItem("refreshKey")
        localStorage.removeItem("userName")

        navigate(0);



    }


    const saveComment = () => {
        const createCommentRequest = {
            userId: userId,
            postId: postId,
            text: text,
        };
    
        fetch("/comments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("tokenKey")
            },
            body: JSON.stringify(createCommentRequest),
        })
        .then((res) => {
            if (!res.ok) {
                refreshToken()
                .then((refreshRes) => {
                    if (!refreshRes.ok) {
                        logout();
                    } else {
                        return refreshRes.json();
                    }
                })
                .then((result) => {
                    console.log(result);
    
                    if (result !== undefined) {
                        localStorage.setItem("tokenKey", result.accessToken);
                        saveComment();
                        setCommentRefresh();
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
            } else {
                return res.json();
            }
        })
        .then((data) => {
            // Handle the response data here if needed
        })
        .catch((err) => {
            console.log(err);
        });
    }
    

    const handleSubmit = () => {

        saveComment();
        setText("");
        setCommentRefresh();

    }
    const handleText = (value) => {
        setText(value);

    };

    return (
        <CommentContainer>
            <OutlinedInput
                id="outlined-adorment-amount"
                multiline
                inputProps={{ maxLength: 250 }}
                fullWidth
                onChange={(i) => handleText(i.target.value)}
                startAdornment={
                    <InputAdornment>
                        <CommentLink to={{ pathname: "/users/" + userId }}>
                            <SmallAvatar >{userName.charAt(0).toUpperCase()}</SmallAvatar>
                        </CommentLink>
                    </InputAdornment>
                }
                endAdornment={
                    <InputAdornment position="end">
                        <Button variant="contained"
                            size="small"
                            endIcon={<SendIcon />}
                            style={{
                                background: 'linear-gradient(45deg, #2196F3 30%,#21CBF3 90%)',
                                color: 'white'
                            }}
                            onClick={handleSubmit}
                        >
                            Comment
                        </Button>
                    </InputAdornment>
                }
                value={text}
                style={{ color: "black", backgroundColor: "white" }}
            ></OutlinedInput>
        </CommentContainer>
    );
}

export default CommentForm;
