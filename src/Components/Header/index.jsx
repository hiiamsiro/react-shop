import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CodeIcon from '@mui/icons-material/Code';
import { Link, NavLink } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Register from 'Features/Auth/components/Register';
import { AccountCircle, Close } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import Login from 'Features/Auth/components/Login';
import { useDispatch, useSelector } from 'react-redux';
import { Menu, MenuItem } from '@mui/material';
import { logout } from 'Features/Auth/userSlice';


const useStyles = makeStyles({

});
const MODE = {
  LOGIN: 'login',
  REGISTER: 'register'
}

export default function Header() {
  const loggedInUser = useSelector(state => state.user.current);
  const isLoggedIn = !!loggedInUser.id; //cho gía trị Boolean cho loggedInUser (true)
  
  const classes = useStyles();
  const dispatch = useDispatch()
  const [open, setOpen] = React.useState(false);
  const [mode, setMode] = React.useState(MODE.LOGIN);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleUserClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = ()=>{
    const action = logout();
    dispatch(action);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
  
            <CodeIcon 
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
            />
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link 
              style={{
                textDecoration: 'none',
                color: 'white',
              }}
              to="/">EZ Shop </Link> 
          </Typography>

          <NavLink 
            style={{
              textDecoration: 'none',
              color: 'white',
            }}
            to="/todos">
            <Button color="inherit">Todos</Button>  
          </NavLink>
          <NavLink 
            style={{
              textDecoration: 'none',
              color: 'white',
            }}
            to="/albums">
            <Button color="inherit">Album</Button>
          </NavLink>
          
          {!isLoggedIn && (
            <Button onClick={handleClickOpen} color="inherit">Login</Button>
          )}

          {isLoggedIn && (
            <IconButton color="inherit" onClick={handleUserClick}>
              <AccountCircle/>
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Dropdown Menu */}
      <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleCloseMenu}>Profile</MenuItem>
          <MenuItem onClick={handleCloseMenu}>My account</MenuItem>
          <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
      </Menu>

      <Dialog 
        onBackdropClick
        disableEscapeKeyDown
        open={open} 
        onClose={handleClose}
      >
        <IconButton
          sx={{
            position: 'absolute',
            top: 4,
            right: 4,
            zIndex: 1
          }}
          onClick={handleClose}>
          <Close/>
        </IconButton>
        <DialogContent>
          {
            mode === MODE.REGISTER && (
              <>
                <Register closeDialog={handleClose}/>

                <Box textAlign="center">
                  <Button color="primary" onClick={() => setMode(MODE.LOGIN)}>
                    Already have an account. Login here
                  </Button>
                </Box>
              </>
            )
          }

          {
            mode === MODE.LOGIN && (
              <>
                <Login closeDialog={handleClose}/>

                <Box textAlign="center">
                  <Button color="primary" onClick={() => setMode(MODE.REGISTER)}>
                    Dont have an account. Register here
                  </Button>
                </Box>
              </>
            )
          }
          {/* //Register bên kia */}
        </DialogContent>
      </Dialog>
    </Box>
  );
}
