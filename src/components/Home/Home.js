
import React, { useState, useEffect } from "react";
import Post from "../Post/Post";
//import "./Home.scss";
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import PostForm from "../Post/PostForm";





function Home() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoded] = useState(false);
    const [postList, setPostList] = useState([]);

    const refreshPosts = () => {

        fetch("/posts")
        .then(res => res.json())
        .then(
            (result) => {

                setIsLoded(true);
                setPostList(result)

            },
            (error) => {

                setIsLoded(true);
                setError(error);

            }
        )


    }

    useEffect(() => {
        
        refreshPosts();
       
    },[])

    if (error) {
        return <div> Error !!!</div>;
    } else if (!isLoaded) {
        return <div> Loading...</div>;
    }
    else {
        return (

            <React.Fragment>
                <CssBaseline />
               
                <Container fixed    sx={{
  justifyContent: 'center',
  alignItems: 'center',
  display: 'flexbox',
  backgroundColor: '#f0ffff',
  height: '100vh',
  overflow: 'auto',}}>

                        {localStorage.getItem("currentUser") == null ? "":
                         <PostForm userId={localStorage.getItem("currentUser")} userName={localStorage.getItem("userName")} refreshPosts = {refreshPosts}/>}
                
                        {postList.map((post) => (
                            <Post likes = {post.postLikes} postId = {post.id} userId={post.userId} userName={post.userName} title={post.title} text={post.text}  />
                        ))}
        
                </Container>
            
            </React.Fragment>
        );
    }

}

export default Home;