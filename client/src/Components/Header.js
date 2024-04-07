import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AccountCircle from '@mui/icons-material/AccountCircle';

import logo from '../images/logo2.png'
import './Header.css'
import { BrowserRouter, Redirect, useHistory } from 'react-router-dom'
import { TextField } from '@mui/material';

const pages = ['פירסום מודעה חדשה', 'הסר מודעה'];


const ResponsiveAppBar = () => {
  const history = useHistory()
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleAds = () => {
    setAnchorElNav(null);
    if ("user" in localStorage) {
      history.push('AddNewAd')
    } else {
      alert("משתמש לא רשום אינו יכול להוסיף מודעה")
      history.push('signIn')
    }

  };
  const handleDeleteAds = () => {
    setAnchorElNav(null);
    if ("user" in localStorage) {
      history.push('deleteAd')
    } else {
      alert("משתמש לא רשום אינו יכול להסיר מודעה")
      history.push('signIn')
    }

  };
  const handlelogout = () => {
    if(localStorage.getItem('user') && localStorage.getItem('user').name != null)
    {
      alert('תודה ולהתראות  ' + JSON.parse(localStorage.getItem('user')).name)
    } else {
      alert('תודה ולהתראות')
    }
    localStorage.clear()
  }
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleSignIn = () => {
    setAnchorElUser(null);
    history.push('signIn')
  };
  const handleSignUp = () => {
    setAnchorElUser(null);
    history.push('signUp')
  };
  const handleLogo = () => {
    setAnchorElUser(null);
    history.push('/')
  };
  return (
    <div>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            >
              <button onClick={handleLogo}>
                <img src={logo} />
              </button>
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >

                <MenuItem key={pages[0]} onClick={handleAds}>
                  <Typography textAlign="center">{pages[0]}</Typography>
                </MenuItem>
                <MenuItem key={pages[1]} onClick={handleDeleteAds}>
                  <Typography textAlign="center">{pages[1]}</Typography>
                </MenuItem>

              </Menu>
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
            >
              <button onClick={handleLogo}>
                <img src={logo} />
              </button>

            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button
                key={pages[0]}
                onClick={handleAds}
                sx={{ my: 2, color: 'white', display: 'block', }}
              >
                {pages[0]}
              </Button>
              <Button
                key={pages[1]}
                onClick={handleDeleteAds}
                sx={{ my: 2, color: 'white', display: 'block', }}
              >
                {pages[1]}
              </Button>
              {/* <Button
                key={pages[3]}
                onClick={handleFilter}
                sx={{ my: 2, color: 'white', display: 'block', }}
              >
                {pages[3]}
              </Button> */}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">

                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenUserMenu}
                  sx={{ p: 0 }}
                  color="inherit"
                >
                  <AccountCircle />

                  {/* //  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" /> */}
                </IconButton>
              </Tooltip>

              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >

                <MenuItem onClick={handleSignIn}>כניסה</MenuItem>
                <MenuItem onClick={handleSignUp}>הרשמה</MenuItem>
                <MenuItem onClick={handlelogout}>יציאה</MenuItem>
              </Menu>

            </Box>
            {localStorage.getItem('user') && <TextField
              value={JSON.parse(localStorage.getItem('user')).name}></TextField> }
          </Toolbar>

        </Container>
      </AppBar>
    </div>
  );
};
export default ResponsiveAppBar;















// import * as React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// import AccountCircle from '@mui/icons-material/AccountCircle';
// import Switch from '@mui/material/Switch';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormGroup from '@mui/material/FormGroup';
// import MenuItem from '@mui/material/MenuItem';
// import Menu from '@mui/material/Menu';

// import { BrowserRouter, Redirect, useHistory } from 'react-router-dom'

// export default function MenuAppBar() {
//   const history = useHistory()

//   const [auth, setAuth] = React.useState(true);
//   const [anchorEl, setAnchorEl] = React.useState(null);

//   const handleChange = (event) => {
//     setAuth(event.target.checked);
//   };

//   const handleMenu = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };
//   const handleSignIn = () => {
//     setAnchorEl(null);
//     history.push('signIn')
//   };
//  const handleSignUp = () => {
//     setAnchorEl(null);
//     history.push('signUp')
//   };
//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       {/* <FormGroup>
//         <FormControlLabel
//           control={
//             <Switch
//               checked={auth}
//               onChange={handleChange}
//               aria-label="login switch"
//             />
//           }
//           label={auth ? 'Logout' : 'Login'}
//         />
//       </FormGroup> */}
//       <AppBar position="static">
//         <Toolbar>
//           <IconButton
//             size="large"
//             edge="start"
//             color="inherit"
//             aria-label="menu"
//             sx={{ mr: 2 }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//            <img src='./images/logo.png'/>
//           </Typography>
//           {auth && (
//             <div>
// <IconButton
//   size="extalarge"
//   aria-label="account of current user"
//   aria-controls="menu-appbar"
//   aria-haspopup="true"
//   onClick={handleMenu}
//   color="inherit"
// >
//   <AccountCircle />
// </IconButton>
//               <Menu
//                 id="menu-appbar"
//                 anchorEl={anchorEl}
//                 anchorOrigin={{
//                   vertical: 'top',
//                   horizontal: 'right',
//                 }}
//                 keepMounted
//                 transformOrigin={{
//                   vertical: 'top',
//                   horizontal: 'right',
//                 }}
//                 open={Boolean(anchorEl)}
//                 onClose={handleClose}
//               >
//                 <MenuItem onClick={handleSignIn}>כניסה</MenuItem>
//                 <MenuItem onClick={handleSignUp}>הרשמה</MenuItem>
//               </Menu>
//             </div>
//           )}
//         </Toolbar>
//       </AppBar>
//     </Box>
//   );
// }
