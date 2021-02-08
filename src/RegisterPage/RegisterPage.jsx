import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userActions } from '../_actions';
import {accountActions} from '../_actions/account.actions'
import { date } from 'yup/lib/locale';
import {Grid, makeStyles, Button} from '@material-ui/core';
import {alertActions} from '../_actions/alert.actions';

const useStyles = makeStyles((theme) => ({
    sliderSection: {
      height:600, 
      width: "100%",
      [theme.breakpoints.down('xs')]: {
        width: 300
      },
      [theme.breakpoints.up(1450)]:{
       // width: 1300
      }
    },
    paddLeft:{
        paddingLeft: 20
    },
    boxSubcat:{
        border:"1px solid #ccc",
        padding: 10,
        backgroundColor: "#019DF4",
        width:"25%",
        float:"left",
        textAlign:"center"
    },
    textSubcat:{
        fontSize:12,
        color:"#000"
    },
    contSubcats:{
        minHeight:"200px",
        height:"100%"
    },
    linkWhite:{
        color:"#fff"
    },
    center:{
        textAlign:"center"
    },
    contAdminPanel:{
        border:"1px solid #ccc",
        padding:20,
        borderRadius:20,
        margin: "20px 0px",
        backgroundColor: "#fff"
    },
    dialogMD:{
        width:700,
        [theme.breakpoints.down('xs')]:{
            width:"auto"
        }
    },
    centerCent:{
        justifyContent:"center"
    }
}));


function RegisterPage() {

    const classes = useStyles();
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        acceptTerms:true,
    });
    const [submitted, setSubmitted] = useState(false);
    const registering = useSelector(state => state.registrationAccount.registering);
    const dispatch = useDispatch();

    // reset login status
    useEffect(() => {
        dispatch(userActions.logout());
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setUser(user => ({ ...user, [name]: value,representados: arr }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        if(user.password !== user.confirmPassword){
            dispatch(alertActions.error('No coinciden los passwords'))
        }else{
            setSubmitted(true);
            if (user.firstName && user.lastName && user.email  && user.role && user.genero && user.dateOfBirth ) {
                dispatch(accountActions.register(user));
            }
        }
       
    }


    /*add array representados*/
    const handleAddSubcatArr = ()=>{

        if(arrbefore.nombre !== '' && arrbefore.apellido !== '' && arrbefore.nombre !== undefined && arrbefore.apellido !== undefined
        && arrbefore.fechaNac !== '' && arrbefore.fechaNac !== undefined){
            if(arr.length>0){
                let arrSlice = arr.slice();
                let found =false;
                for(var i=0;i<arrSlice.length;i++){
                   
                    if(arrSlice[i].nombre == arrbefore.nombre && arrSlice[i].apellido == arrbefore.apellido){
                        dispatch(alertActions.error('Ya hay un representado con ese mismo nombre y apellido'));
                        found = true;
                        return;
                    }
                }
               if(!found){
                setarr([...arr, arrbefore]);
               }
                
               return;
            }

            setarr([...arr, arrbefore]);
        }else{
            dispatch(alertActions.error('Debe agregar todos los campos'))
        }
      
    }
    const [arr, setarr] = useState([]);
    const [arrbefore, setarrbefore] = useState({});

    const handleAddArr = (e)=>{
        let name = e.target.name;
        let value = e.target.value;
            setarrbefore({...arrbefore,
                [name]: value,
                edad:_calculateAge(new Date(arrbefore.fechaNac))
            });
        

    }
    const handleDeleteArr = (nombre,apellido) =>{

        if(nombre !== '' && apellido !==''){

            if(arr.length>0){
                let arrSlice = arr.slice();
                for(var i=0;i< arrSlice.length;i++){
                    if(arrSlice[i].nombre == nombre && arrSlice[i].apellido == apellido){
                        const visible = JSON.stringify(arrSlice[i]);
                        console.log('encontro'+visible);
                        const arrFilterd = arrSlice.filter(r=> r.nombre !== nombre && r.apellido !== apellido);
                        const arrRemoved = arr.splice(i,1);
                        const visible1 = JSON.stringify(arrFilterd);
                        console.log('filtrado '+visible1);
                        const visible11 = JSON.stringify(arrRemoved);
                        console.log('removed '+visible11);
                        setarr(arr);
                        getAlll()
                       
                    }
                }
            }
        }
    }
    function getAlll(){
        dispatch(accountActions.getAll());
    }
    function _calculateAge(birthday) { // birthday is a date
        var ageDifMs = Date.now() - birthday.getTime();
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    return (
        <div className="col-lg-8 offset-lg-2">
            <h2>Register</h2>
            <form name="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>First Name</label>
                    <input type="text" name="firstName" value={user.firstName} onChange={handleChange} className={'form-control' + (submitted && !user.firstName ? ' is-invalid' : '')} />
                    {submitted && !user.firstName &&
                        <div className="invalid-feedback">First Name is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" name="lastName" value={user.lastName} onChange={handleChange} className={'form-control' + (submitted && !user.lastName ? ' is-invalid' : '')} />
                    {submitted && !user.lastName &&
                        <div className="invalid-feedback">Last Name is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="text" name="email" value={user.email} onChange={handleChange} className={'form-control' + (submitted && !user.email ? ' is-invalid' : '')} />
                    {submitted && !user.email &&
                        <div className="invalid-feedback">Email is required</div>
                    }
                </div>
            
                  
                <div className="form-group">
                                            <label>Role</label><br/>
                                            <span>Admin <input type="radio" name="role" onChange={handleChange}  value="Admin" ></input></span>
                                            <span> User  <input type="radio" name="role" onChange={handleChange}  value="User" ></input></span>
                                        </div>

                  
                <div className="form-group">
                                            <label>Genero</label><br/>
                                            <span>Masculino <input type="radio" name="genero" onChange={handleChange}  value="masc" ></input></span>
                                            <span>Femenino<input type="radio" name="genero" onChange={handleChange}  value="fem" ></input></span>
                                        </div>
                                        <div className="form-group">
                                            <label>Fecha de nacimiento</label><br/>
                                            <span><input type="date" name="dateOfBirth" onChange={handleChange}  ></input></span>
                                           
                                        </div>


                                        <div className="form-group">
                        <label>Representados</label>
                        <Grid item className={classes.contSubcats}>
                                        {arr.length > 0 ? arr.map((r,index)=>
                                                <div className={classes.boxSubcat} key={r._id}>
                                                    <p className={classes.textSubcat}>{r.nombre+' '+r.apellido}</p>
                                                  <p className={classes.textSubcat}>Edad:{r.edad} Sexo: {r.genero}</p>
                                                    <a className="danger" onClick={()=>handleDeleteArr(r.nombre,r.apellido)}>Borrar</a>
                                                </div>) : <p>NO TIENE REPRESENTADOS</p>}
                                        </Grid>
                                       </div><br/><br/>
                                       <div className="form-group">
                                        <p>Nombre</p>
                                            <input type="text" name="nombre" onChange={handleAddArr} className="form-control"></input>
                                            <p>Apellido</p>
                                            <input type="text" name="apellido" onChange={handleAddArr} className="form-control"></input>
                                        
                                        <Grid className="form-group">
                                            <label>Genero</label><br/>
                                            <span>Masculino <input type="radio" name="genero" onChange={handleAddArr}  value="masc" ></input></span>
                                            <span> Femenino  <input type="radio" name="genero" onChange={handleAddArr}  value="fem" ></input></span>
                                        </Grid>
                                        <Grid className="form-group">
                                            <label>Fecha de Nacimiento</label>
                                            <input type="date" name="fechaNac" onChange={handleAddArr}></input>
                                        </Grid>
                                        
                                    <Button variant="contained" color="primary" onClick={()=>handleAddSubcatArr()}>AGREGAR REPRESENTADO</Button><br></br>
                        </div>



                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" value={user.password} onChange={handleChange} className={'form-control' + (submitted && !user.password ? ' is-invalid' : '')} />
                    {submitted && !user.password &&
                        <div className="invalid-feedback">Password is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>Confirm Password</label>
                    <input type="password" name="confirmPassword" value={user.confirmPassword} onChange={handleChange} className={'form-control' + (submitted && !user.confirmPassword ? ' is-invalid' : '')} />
                    {submitted && !user.confirmPassword &&
                        <div className="invalid-feedback">Confirm Password is required</div>
                    }
                </div>

                <div className="form-group">
                    <button className="btn btn-primary">
                        {registering && <span className="spinner-border spinner-border-sm mr-1"></span>}
                        Register
                    </button>
                    <Link to="/login" className="btn btn-link">Cancel</Link>
                </div>
            </form>
        </div>
    );
}

export { RegisterPage };