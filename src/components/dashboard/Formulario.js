import React, { useState } from 'react';
import { styled, createTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';

import InputAdornment from '@mui/material/InputAdornment';

const drawerWidth = 240;

const BootstrapButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  padding: '6px 12px',
  border: '1px solid',
  lineHeight: 1.5,
  backgroundColor: '#0063cc',
  borderColor: '#0063cc',
  float: 'right',
  right: 16,
  top: 50,
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  '&:hover': {
    backgroundColor: '#0069d9',
    borderColor: '#0062cc',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#0062cc',
    borderColor: '#005cbf',
  },
  '&:focus': {
    boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
  },
});


const FormularioContainer = (props) => {
 const { detalle, add, handleAdd } = props.props;

  const [ formState, setFormState ] = useState({ 
    ...detalle
  });
  console.log(formState)

  const agregarTutorial = () => {
    let params = {
      "nombre": formState.nombre,
      "profesor": formState.profesor,
      "materia": formState.materia,
      "fecha": formState.fecha
    };

    console.log(params);
  
  fetch("https://rayentutorialtestapp.azurewebsites.net/createtutorial", {
  method: 'post',
  mode: 'cors',
  headers : { 
    'Content-Type': 'application/json',
    'Accept': 'application/json'
   },
  body: JSON.stringify(params),
      }).then(function(respuesta) {
        respuesta.json().then(body => {
          console.log(body);
//          actualizar(msg, body);
        });
      }).catch(function (error) {
        // Error :(
          alert()
        console.log(error)
      });
  }

  const handleFieldChange = event => {
    console.log(formState)
    event.persist();
    setFormState(formState => ({
      ...formState,
      [event.target.name]:
        event.target.type === 'checkbox'
          ? event.target.checked
          : event.target.value
    }));
  };

  return (
    <Grid item xs={12} md={12} lg={12}>
       <form>
      <Paper
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          height: '540px',
        }}
      >
        <TextField
          label="Titulo"
          name="nombre"
          onChange={handleFieldChange}
          value={formState.nombre || ''}
          sx={{ m: 1, width: '95%' }}
          InputProps={{
            startAdornment: <InputAdornment position="start"></InputAdornment>,
          }}
        />
        <TextField
          label="Profesor"
          name="profesor"
          onChange={handleFieldChange}
          value={formState.profesor || ''}          
          sx={{ m: 1, width: '95%' }}
          InputProps={{
            startAdornment: <InputAdornment position="start"></InputAdornment>,
          }}
        />
        <TextField
          label="Materia"
          name="materia"
          onChange={handleFieldChange}
          value={formState.materia || ''}
          sx={{ m: 1, width: '95%' }}
          InputProps={{
            startAdornment: <InputAdornment position="start"></InputAdornment>,
          }}
        />
        <TextField
          label="Fecha"
          name="fecha"
          onChange={handleFieldChange}
          value={formState.fecha || ''}          
          sx={{ m: 1, width: '95%' }}
          InputProps={{
            startAdornment: <InputAdornment position="start"></InputAdornment>,
          }}
        />
        <Box sx={{ height: 150, transform: 'translateZ(0px)', flexGrow: 1 }}>
        {add && (
          <BootstrapButton           
          onClick={agregarTutorial}
          variant="contained" disableRipple>
          AGREGAR
        </BootstrapButton>
        )}
                  </Box>
      </Paper>
      </form>
    </Grid>

  );
}

export default function Formulario(props) {
  return <FormularioContainer props={props}/>;
}