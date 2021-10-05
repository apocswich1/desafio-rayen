import React, { useState, useEffect } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { alpha } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import NotificationsIcon from '@mui/icons-material/Notifications';
import TextField from '@mui/material/TextField';
import Lista from './Lista';
import Formulario from './Formulario';
import EditIcon from '@mui/icons-material/Edit';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import Stack from '@mui/material/Stack';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();

function DashboardContent() {
  const [open, setOpen] = React.useState(false);
  const [listar, setListar] = React.useState(true);
  const [agregar, setAgregar] = React.useState(false);
  const [tutoriales, setTutoriales] = React.useState([]);
  const [detalle, setDetalle] = React.useState();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const select = (id) => {
    fetchTutorialsById(id);
    setListar(false);
  }

  const agregartutorial = () => {
    setListar(false);
    setAgregar(true);

  }

  const handleAdd = () => {
    setListar(true);
    setAgregar(false);

  }

  useEffect(() => {
    let mounted = true;
    let tutoriales = [];
    const fetchTutorials = () => {
      fetch('https://rayentutorialtestapp.azurewebsites.net/tutorials', {
        method: 'get',
        mode: 'cors',
      }).then(function (respuesta) {
        respuesta.json().then(body => {
          setTutoriales(body)
        });
      }).catch(function (err) {
        // Error :(
      });
    };
    if(listar){
      fetchTutorials();
    }

    return () => {
      mounted = false;
    };
  }, []);


    const fetchTutorialsById = (id) => {
      fetch(`https://rayentutorialtestapp.azurewebsites.net/tutorials/${id}`, {
        method: 'get',
        mode: 'cors',
      }).then(function (respuesta) {
        respuesta.json().then(body => {
          console.log(body)
          setDetalle(body)
        });
      }).catch(function (err) {
        // Error :(
      });
    };


  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Tutoriales
            </Typography>
            <IconButton color="inherit">
              <EditIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
            
            {(!listar && detalle) && (
            <Formulario detalle={detalle} add={false}/>
            )}

            {(!listar && agregar) && (
            <Formulario detalle={detalle} add={true} handleAdd/>
            )}

            {listar && (
            <Grid item xs={12} md={12} lg={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    // height: 240,
                  }}
                >
                  <TextField id="outlined-basic" label="Buscar por titulo" variant="outlined" />
                  <Lista tutoriales={tutoriales} select={select}/>

                  <div style={{ textAlign: "center", margin: "30px auto" }}>
                    <Stack spacing={2} sx={{ width: "200px" }}>
                      <Button align="center" variant="outlined">Eliminar todos</Button>
                    </Stack>
                  </div>
                  <Box sx={{ height: 150, transform: 'translateZ(0px)', flexGrow: 1 }}>
                    <SpeedDial
                      onClick={()=>agregartutorial()}
                      ariaLabel="SpeedDial basic example"
                      sx={{ position: 'absolute', bottom: 16, right: 16 }}
                      icon={<SpeedDialIcon />}
                    >
                    </SpeedDial>
                  </Box>
                </Paper>
              </Grid>
            )}
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
