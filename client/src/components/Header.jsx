import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import logo from '../images/icon.png';
import { Link } from 'react-router-dom';

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Example state for logged in status
  const [userName, setUserName] = useState('');

  // Example useEffect to simulate login status change
  useEffect(() => {
    // Check if user is logged in (You can replace this with actual authentication logic)
    const userLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (userLoggedIn) {
      const storedUserName = localStorage.getItem('userName');
      setUserName(storedUserName);
      setIsLoggedIn(true);
    }
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const logout = () => {
    // Example logout function
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    setIsLoggedIn(false);
  };

  const drawer = (
    <div>
      {isLoggedIn ? (
        <>
          <List>
            <ListItem button
            
             component={Link} to="/create-blog">
              <ListItemText primary="Create Blog" />
            </ListItem>
          </List>
          <List>
            <ListItem button onClick={logout}>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </>
      ) : (
        <List>
          <ListItem button 
          sx={{
                  backgroundColor: '#f50057', // Custom background color
                  color: 'white',
                  fontFamily:'Times New Roman', // Custom text color
                  '&:hover': {
                    backgroundColor: '#d4004a', // Custom hover background color
                  },
                }}
          component={Link} to="/register">
            <ListItemText primary="Register Now" />
          </ListItem>
          <ListItem button 
          sx={{
                  backgroundColor: '#3f51b5', // Custom background color
                  color: 'white', 
                  fontFamily:'Times New Roman',// Custom text color
                  '&:hover': {
                    backgroundColor: '#303f9f', // Custom hover background color
                  },
                  mt: 0.5, // Add left margin to space out the buttons
                }}
          component={Link} to="/login">
            <ListItemText primary="Login" />
          </ListItem>
        </List>
      )}
    </div>
  );

  return (
    <AppBar position="static" sx={{ backgroundColor: 'white' }}>
      <Toolbar>
        {isMobile && (
          <IconButton
           sx ={{
color:'black', border:'1px solid black'
      }}
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Typography variant="h6" component={Link} to="/" 
         sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexGrow: 1, fontFamily: 'Times New Roman', fontWeight: 'bolder', color: 'black', textDecoration: 'none', // Ensure text behaves like a link
          '&:hover': {
            textDecoration: 'none', 
          },}}>
          <img src={logo} alt="Logo" style={{ height: '25px', marginRight: '10px' }} />
          BlogStory
        </Typography>
        {!isMobile && (
          <>
            {isLoggedIn ? (
              <>
                <Avatar sx={{ bgcolor: 'secondary.main', ml: 2 }}>{userName.charAt(0)}</Avatar>
                <Button color="inherit" onClick={logout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button component={Link} to="/register" sx={{ backgroundColor: '#f50057', color: 'white', fontFamily: 'Times New Roman', '&:hover': { backgroundColor: '#d4004a' } }}>
                  Register Now
                </Button>
                <Button component={Link} to="/login" sx={{ backgroundColor: '#3f51b5', color: 'white', fontFamily: 'Times New Roman', ml: 2, '&:hover': { backgroundColor: '#303f9f' } }}>
                  Login
                </Button>
              </>
            )}
          </>
        )}
      </Toolbar>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Header;
