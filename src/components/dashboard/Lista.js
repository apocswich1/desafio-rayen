import * as React from 'react';
import { styled } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import EditIcon from '@mui/icons-material/Edit';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Moment from 'moment';


const StyledMenu = styled((props) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      {...props}
    />
  ))(({ theme }) => ({
    '& .MuiPaper-root': {
      borderRadius: 6,
      marginTop: theme.spacing(1),
      minWidth: 180,
      color:
        theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
      boxShadow:
        'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
      '& .MuiMenu-list': {
        padding: '4px 0',
      },
      '& .MuiMenuItem-root': {
        '& .MuiSvgIcon-root': {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5),
        },
        '&:active': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity,
          ),
        },
      },
    },
  }));
  
export default function Lista(props) {
    const { tutoriales, select } = props;
    const [anchorEl, setAnchorEl] = React.useState(null);

    const opent = Boolean(anchorEl);
  
    const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


    return (
        <React.Fragment>
            <div>
                    <Typography
                      component="h1"
                      variant="h6"
                      color="inherit"
                      noWrap
                      sx={{ flexGrow: 1, textAlign: "right", mt: 4 }}
                      onClick={handleClick}
                    >
                      Ordenado por Titulo
                      <KeyboardArrowDownIcon />
                    </Typography>
                    <StyledMenu
                      id="demo-customized-menu"
                      MenuListProps={{
                        'aria-labelledby': 'demo-customized-button',
                      }}
                      anchorEl={anchorEl}
                      open={opent}
                      onClose={handleClose}
                    >
                      <MenuItem onClick={handleClose} disableRipple>
                        <EditIcon />
                        Titulo
                      </MenuItem>
                      <MenuItem onClick={handleClose} disableRipple>
                        <EditIcon />
                        Fecha
                      </MenuItem>
                    </StyledMenu>
                  </div>
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {tutoriales.map((item, index) => (
                <div key={index} >
                    <ListItem alignItems="flex-start" id={item.id}>
                        <ListItemText
                            onClick={()=>select(item.id)}
                            primary={item.nombre}
                            secondary={
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    {item.profesor}
                                </Typography>
                            }
                        />
                        {Moment(item.fecha).format('d MMM YYYY')}
                    </ListItem>
                    <Divider variant="inset" component="li" sx={{ marginLeft: '15px' }} />
                </div>
            ))}
        </List>
        </React.Fragment>
    );
}