import React, { useState ,useRef,useEffect} from "react";
import { Link } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import { Container } from "@mui/material";
import Comment from "../Comment/Comment.js";
import CommentForm from "../Comment/CommentForm.js";


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  // transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));


const CommentContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
}));

function Post(props) {
  const { title, text, userId, userName ,postId,likes} = props;
  const [expanded, setExpanded] = useState(false);
  const [commentList, setCommentList] = useState([]);
  const isInitialMount = useRef(true);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoded] = useState(false);
  const [isLiked,setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes.length);
  const [likeId,setLikeId] = useState(null);
  const [refresh,setRefresh] = useState(false);
  let disabled = localStorage.getItem("currentUser") == null ? true : false;
  
  
  
  const setCommentRefresh = () => {
    setRefresh(true);
  }
    const handleExpandClick = () => {
    setExpanded(!expanded);
    refreshComments();
    console.log(commentList);
  };
  const handleLike = () =>{

    setIsLiked(!isLiked);
    if(!isLiked){
      saveLike();
      setLikeCount(likeCount + 1);
    }
      
    else{
      deleteLike();
      setLikeCount(likeCount - 1);

    }
      
  };
  const refreshComments = () => {

    fetch("/comments?postId="+postId)
    .then(res => res.json())
    .then(
        (result) => {

            setIsLoded(true);
            setCommentList(result)

        },
        (error) => {

            setIsLoded(true);
            setError(error);

        }
    )

  setRefresh(false)
}
const saveLike = () => {
  const createLikeRequest = {
    userId: localStorage.getItem("currentUser"),
    postId: postId,
  
};

fetch("/likes", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Authorization" : localStorage.getItem("tokenKey")

    },
    body: JSON.stringify(createLikeRequest),
})
    .then((res) => res.json())
    .then((data) => {
        console.log("Comment saved:", data);
        console.log( userId,postId);
    })
    .catch((err) => {
        console.log("Error:", err);
    });
}
const deleteLike = () => {
  fetch("/likes/"+likeId ,{
    method:"DELETE",
    headers: {
    
      "Authorization" : localStorage.getItem("tokenKey")

  }

  })
  .then((res) => res.json())
  .catch((err) => console.log(err))
}
const checkLikes = () =>{
 var likeControl = likes.find((like =>"" + like.userId === localStorage.getItem("currentUser")));
 if(likeControl != null){
  setLikeId(likeControl.id);
  setIsLiked(true);
 }
 
}
useEffect(() => {
  if(isInitialMount.current)
    isInitialMount.current = false;
  else
  refreshComments();
 
}, [refresh])
useEffect(() => {checkLikes()},[])



  return (
    <div >
      
      <Card sx={{ maxWidth: 800, textAlign: "left",margin: 20,   }}>
        <CardHeader

          avatar={
            
            <Link to={{ pathname: "/users/" + userId }} style={{ textDecoration: "none", boxShadow: "none", color: "white" }}>
              <Avatar sx={{background:'linear-gradient(45deg, #2196F3 30%,#21CBF3 90%)' }} aria-label="recipe">
                {userName.charAt(0).toUpperCase()}
              </Avatar>
            </Link>

          }

          title={title}




        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {text}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          {disabled ? 
          <IconButton disabled aria-label="add to favorites" onClick={handleLike}>
            <FavoriteIcon style={isLiked? {color : "red"} : {color : null}}/>
           
          </IconButton>:
          <IconButton  aria-label="add to favorites" onClick={handleLike}>
          <FavoriteIcon style={isLiked? {color : "red"} : {color : null}}/>
         
        </IconButton>}
          
          {likeCount}

          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <CommentIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CommentContainer>
            {error ? "error" :
              isLoaded ? commentList.map(comment => (
                <Comment userId={comment.userId} userName={comment.userName} text={comment.text} />
              )) : "Loading"}
              
            {disabled? "":
            <CommentForm userId={localStorage.getItem("currentUser")} userName={localStorage.getItem("userName")}  postId={postId} setCommentRefresh= {setCommentRefresh}></CommentForm>}
          </CommentContainer>
        </Collapse>
      </Card>

    </div>
  );
}

export default Post;
