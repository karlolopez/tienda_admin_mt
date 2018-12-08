import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import AccountCircle from '@material-ui/icons/AccountCircle';
import PersonPin from '@material-ui/icons/PersonPin';
import LocationOn from '@material-ui/icons/LocationOn';
import Group from '@material-ui/icons/Group';
import Share from '@material-ui/icons/Share';
import Notifications from '@material-ui/icons/Notifications';
import NotificationsActive from '@material-ui/icons/NotificationsActive';
import Security from '@material-ui/icons/Security';
import Backup from '@material-ui/icons/Backup';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputAdornment from '@material-ui/core/InputAdornment';
import APIRoutes from '../../../../APIRoutes';
const axios = require('axios');



function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
    overflow: 'hidden'
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  tabLabel: {
    maxWidth: '100%',
    textTransform: 'capitalize'
  },
  toggleContainer: {
    flexDirection: 'row',
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center'
  }
});

class ProfileTabs extends React.Component {
  
  constructor(props){
      super(props);
      
      this.state = {
        value: 0,
        price:0,
        stock:0,
        name: 'Christos',
        lastname: 'Pantazis',
        email: 'info@oxygenna.com',
        password: '',
        newpassword: '',
        confirmpassword: '',
        marca:'',
        lista_marcas:[]
      };

      this.loadMarcas();
  }


  loadMarcas(){

    axios.get(APIRoutes.marcas).then((response)=>{
      
      console.log("REspuesta correcta!");
      console.dir(response);

      if(response.data.status == "succes"){
        this.setState({lista_marcas:response.data.objects});
      }

      



    }).catch((error)=>{
      console.log("Error: " + error)
    });

  }


  validate(name, lastname, email) {
    // true means invalid, so our conditions got reversed
    return {
      name: name.length === 0,
      lastname: lastname.length === 0,
      email: email.length === 0
    };
  }
  validatePassword(password, newPassword, confirmPassword) {
    // true means invalid, so our conditions got reversed
    return {
      password: password.length === 0,
      newPassword: newPassword.length === 0,
      confirmPassword: confirmPassword.length === 0
    };
  }
  handleChange = name => (event) => {

    var value = event.target.value

    if((name == "stock" || name == "price") && !isNaN(value)){
      this.setState({[name]:value});
    }else if(name != "stock" && name != "price"){
      this.setState({[name]:value});

      console.log(name + ": " + value)

    }

  };

  handleTabChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { classes, theme } = this.props;

    const { name, lastname, email, password, newpassword, confirmpassword, price , stock} = this.state;
    
    const errors = this.validate(name, lastname, email);
    const pwdErrors = this.validatePassword(password, newpassword, confirmpassword);

    var marcasCells = [];

    var marcasTemp =  this.state.lista_marcas.slice();
    if(marcasTemp.length > 0){

      marcasTemp.forEach((marcaObject)=>{
        marcasCells.push(
          <option value={marcaObject.id}>{marcaObject.marca}</option>
        );
      })

    }

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleTabChange}
            indicatorColor="primary"
            textColor="secondary"
            fullWidth
          >
            <Tab className={classes.tabLabel} label="Producto" icon={<AccountCircle />}/>
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}>
            <form className={classes.container} autoComplete="off">
              <Grid container>
                <Grid item sm={6} xs={12}>
                  <TextField
                    id="name"
                    label="Nombre del producto"
                    className={classes.textField}
                    error={errors.name}
                    value={name}
                    onChange={this.handleChange('name')}
                    fullWidth
                    required
                    margin="normal"
                  />
                  { errors.name &&
                  <FormHelperText error>This is a required field</FormHelperText>
                  }
                </Grid>
                <Grid item sm={6} xs={12}>
                <FormControl className={classes.formControl}>
                    <InputLabel shrink htmlFor="age-native-label-placeholder">
                      Marca
                    </InputLabel>
                    <Select
                      value={this.state.marca}
                      onChange={this.handleChange('marca')}
                    >
                      {
                        marcasCells
                      }
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="price"
                    label="Introduce el precio del producto"
                    className={classes.textField}
                    value={price}
                    onChange={this.handleChange('price')}
                    fullWidth
                    required
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="stock"
                    label="Ingresa la cantidad en stock:"
                    value={stock}
                    onChange={this.handleChange('stock')}
                    fullWidth
                    required
                    margin="normal"
                  />
                </Grid>
              </Grid>
            </form>
          </TabContainer>
          
        </SwipeableViews>
      </div>
    );
  }
}

ProfileTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ProfileTabs);
