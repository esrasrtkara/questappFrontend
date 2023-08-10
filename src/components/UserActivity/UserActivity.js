import React, { useEffect, useState } from "react";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, useTheme } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Post from "../Post/Post";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const columns = [
    {
      id: 'User Activity',
      label: 'User Activity',
      minWidth: 170,
      align: 'center',
      format: (value) => value.toLocaleString('en-US'),
    },
  ];

 function PopUp(props) {
    const [open, setOpen] = useState(isOpen); 
    const [post, setPost] = useState();
    const {isOpen, postId, setIsOpen} = props;
    


    const getPost = () => {
        fetch("/posts/"+postId,{
        method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization" : localStorage.getItem("tokenKey")
            },
        })

        .then(res => res.json())
        .then(
            (result) => {
                console.log(result);
                setPost(result);
            },
            (error) => {
                console.log(error)
            }
        )
        }
  
   
  
    const handleClose = () => {
      setOpen(false);
      setIsOpen(false);
    };
    useEffect(() => {
        setOpen(isOpen);
      }, [isOpen]);

    useEffect(() => {
        getPost();
    }, [postId])
  
    return (
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <AppBar sx={{ position: 'relative' }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                Close
              </Typography>
            </Toolbar>
          </AppBar>
          {post? <Post likes = {post.postLikes} postId = {post.id} userId = {post.userId} userName = {post.userName}  
                    title={post.title} text={post.text}></Post>: "loading"}
            
        </Dialog>
    );
  }



function UserActivity(props) {
  const [page, setPage] = React.useState(0);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [rows, setRows] = useState([]);
  const { userId } = props;
  const [isOpen, setIsOpen] = useState();
  const [selectedPost, setSelectedPost] = useState();
  const theme = useTheme();
    const getActivity = () => {
        fetch("/users/activity/" +userId, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("tokenKey"),
            },
        })
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setRows(result)
                },
                (error) => {
                    console.log(error)
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }

    useEffect(() => {
        getActivity()
    }, [])



    const handleNotification = (postId) => {
        setSelectedPost(postId);
        setIsOpen(true);
    };

    return (
        <div>
        {isOpen? <PopUp isOpen={isOpen} postId={selectedPost} setIsOpen={setIsOpen}/>: ""}
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer >
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth, fontWeight: theme.typography.fontWeightBold, color: 'blue' }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                <TableCell align="center" style={{ fontWeight: theme.typography.fontWeightBold, color: 'blue' }}>
                                    <Button onClick={() => handleNotification(row[1])}>
                                        {row[3] + " " + row[0] + " your post"}
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>
            </TableContainer>
            <TablePagination

            />
        </Paper>
        </div>
    );
}

export default UserActivity;