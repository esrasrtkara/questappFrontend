import React from "react";
import { Avatar, CardContent, InputAdornment, OutlinedInput } from "@mui/material";
import { Link } from "react-router-dom";
import { styled } from '@mui/material/styles';

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
  textDecoration: "none",
  boxShadow: "none",
  color: "white",
}));

function Comment(props) {
  const { text, userId, userName } = props;

  return (
    <CommentContainer>
      <OutlinedInput
        disabled
        id="outlined-adorment-amount"
        multiline
        inputProps={{ maxLength: 25 }}
        fullWidth
        value={text}
        startAdornment={
          <InputAdornment>
            <CommentLink to={{ pathname: "/users/" + userId }}>
              <SmallAvatar>{userName.charAt(0).toUpperCase()}</SmallAvatar>
            </CommentLink>
          </InputAdornment>
        }
        style={{ color: "black", backgroundColor: "white" }}
      ></OutlinedInput>
    </CommentContainer>
  );
}

export default Comment;
