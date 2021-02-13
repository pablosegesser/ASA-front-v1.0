import React, { Fragment, useEffect, useState } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';
import { ChampsPage } from '../ChampsPage/ChampsPage';
import MainContainer from '../_layout/MainContainer'
import { UsersPage } from '../UsersPage/UsersPage';
import {Dialog, DialogActions, DialogContent, DialogTitle, Divider} from "@material-ui/core";
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import {Login} from '../account/Login';
import {Register} from '../account/Register';
import {VerifyEmail} from '../account/VerifyEmail';
import {ForgotPassword} from '../account/ForgotPassword';
import {ResetPassword} from '../account/ResetPassword';
import CloseIcon from '@material-ui/icons/Close';



function App() {
    const loggingIn = useSelector(state => state.authenticationAccount); 
    const alert = useSelector(state => state.alert);
    const dispatch = useDispatch();
if(loggingIn !== undefined && loggingIn !== ''){
    console.log('listo');
}else{
    console.log('no')
}
const [open, setopen] = useState(true);
const close = ()=>{
    setopen(!open);
    setTimeout(() => {
        dispatch(alertActions.clear());
        setopen(true)
    }, 300)
}
    useEffect(() => {
        history.listen((location, action) => {
            // clear alert on location change
          dispatch(alertActions.clear());
        });
        
    }, []);
{/*
      setTimeout(() => {
        dispatch(alertActions.clear());
    }, 8000)*/}


    const theme = createMuiTheme({
        palette: {
            primary: {
                main:'#019DF4'
            }
          },
      });


    return (
        <div>
                   
            <Router history={history}>
                   
           <ThemeProvider theme={theme}>
                <MainContainer loggedIn={loggingIn.loggedIn}>
                        {alert.message && 
                        <Dialog open={open} onClose={()=>close()}>
                            
                               
                           
                            <DialogContent>
                            <CloseIcon onClick={close}></CloseIcon>
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                            </DialogContent>
                        </Dialog>}
                        <Switch>
                            <PrivateRoute exact path="/" component={HomePage} />
                            <PrivateRoute exact path="/campeonatos" component={ChampsPage} />
                            <PrivateRoute exact path="/perfil" component={UsersPage} />
                            <Route path="/login" component={LoginPage} />
                            <Route path="/verify-email" component={VerifyEmail} />
                            <Route path="/forgot-password" component={ForgotPassword} />
                            <Route path="/reset-password" component={ResetPassword} />
                            <Route path="/register" component={RegisterPage} />
                            <Redirect from="*" to="/" />
                        </Switch>
                    </MainContainer>
           </ThemeProvider>
                       
                    
                   
            </Router>
     </div>
       
    );
}

export { App };