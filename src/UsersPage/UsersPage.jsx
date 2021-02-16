import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector, connect } from 'react-redux';
import {alertActions} from '../_actions/alert.actions'
import { accountActions} from '../_actions/account.actions';
import {campeonatosActions} from '../_actions/campeonatos.actions';
import {Grid, makeStyles, Button, Typography} from '@material-ui/core';
import moment from 'moment';
import {accountService} from '../_services/account.service'


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
        textAlign:"center",
        [theme.breakpoints.down('xs')]:{
            width:"50%"
        }
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
        justifyContent:"center",
        textAlign:"center"
    },
    contRepre:{
        border:"1px solid #ccc",
        backgroundColor:"#f5f5f5",
        borderRadius:10,
        padding:10,
        marginBottom:30
    },
    padd20:{
        padding:20
    }
}));


function UsersPage() {
    const classes = useStyles();
   
    const users = useSelector(state => state.accounts);
    const campeonatos = useSelector(state => state.campeonatos);
    const user = useSelector(state => state.authenticationAccount.user);
    const userValue = accountService.userValue;
    const userss = useSelector(state => state.authenticationAccount.user);
    const userCurrent = useSelector(state => state.authentication.user);
    const dispatch = useDispatch();
    const visibleeee = JSON.stringify(userValue);
    console.log('use value: '+visibleeee);
    const [edit,setEdit] = useState({
        open:false,
        id:''
    });
    const [editchamp,setEditchamp] = useState({
        open:false,
        id:''
    });
    const [loading, setloading] = useState();
    const [openAdd, setopenAdd] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [champs, setchamps] = useState({
        nombre:'',
        fecha:'',
        lugar:'',
        descripcion: '',
        id: ''
    });
    const [champsNew, setchampsNew] = useState({
        nombre:'',
        fecha:'',
        lugar:'',
        descripcion: ''
    });
    const [error, seterror] = useState(false);
    const [search, setSearch] = useState();
    const [newUser, setNewUser] = useState({
        representados:arr
    });
    const [inscripto, setInscripto] = useState({
        nombre:'',
        apellido:'',
        edad: '',
        id:''
    });
    const [suscribed, setSuscribed] = useState();

    useEffect(() => {
        getAlll();
        setInscripto({
            nombre: user.firstName,
            apellido: user.lastName,
            edad: 20,
            id: user.id
        });
    }, []);

    const setearRepresentados =() =>{
        setNewUser({...newUser,representados:arr})
        
    }
    const findIndexx = (arr)=>{
        if(arr !== undefined){
            for(var i =0;i < arr.length;i++){
                if(arr[i].id == user.id){
                    return i
                }
            }
        }else{
            dispatch(alertActions.error('accounts not charged'))
        }
        
    }

    function getAlllChamps(){
        dispatch(campeonatosActions.getAll());
    }
    

    function getAlll(){
        dispatch(accountActions.getAll());
    }
    function handleDeleteUser(id) {
        dispatch(accountActions.delete(id));
    }
    function handleDeleteChamp(id) {
        dispatch(campeonatosActions.delete(id));
    }
    function handleSearchById(id){
        dispatch(userActions.get_by_id(id));
    }
    function handleUpdate(id,user){
        dispatch(accountActions.update_user(id,user));
       
    }
    function handleChange(e){
    const target = e.target;
    const value = target.value;
    const name = target.name;

    setNewUser({ ...newUser,
      [name]: value,
      representados:arr
    });
    }
    function handleEdit(id){
        console.log('iddddd  '+id);
        setNewUser({
            id
        });
        setEdit(
            {
                open:true, 
                id: id
            });

    }
    function handleEditChamp(user){
        console.log('iddddd  '+user.id);
        setchamps({...champs,
            descripcion: user.descripcion,
            lugar: user.lugar,
            fecha: user.fecha,
            nombre: user.nombre,
            id: user.id
        });
        setEditchamp(
            {
                open:true, 
                id: user.id
            });

    }
    function loadingClose(bool){
        setloading(bool); 
    }

    function handleSubmit(e){
        loadingClose(true);
       e.preventDefault();
      let objectUser = JSON.stringify(newUser);
      let objectUser1 = JSON.stringify(users);
      // console.log('jajajaj'+objectUser);
      dispatch(accountActions.update_user(user.id,newUser))
       setEdit({
        open: false
    });
       console.log('newUser '+objectUser);
       console.log('Users '+objectUser1);
       setTimeout(() => {    
        getAlll();
        loadingClose(false);
      }, 300);

     
      
    }
function close(){
    setEdit({
        open: false
    })
}

const changeSearch = (e) =>{
    const target = e.target;
    const value = target.value;
    //const name = target.name;

    setSearch(value);
}

const submitSearch = (e)=>{
    e.preventDefault();
    setSubmitted(true);
    if(search !== ''){
        handleSearchById(search);
    }else{
        seterror(true);
    }
    
}

const refresh = () =>{
    setSearch('');
    document. getElementById('searchInput').value='';
    getAlll();
    seterror(false);
    setSubmitted(false);
}
 const addChamp = (champ) =>{
    dispatch(campeonatosActions.register(champ));
 }
 const updateChamps = (champ)=>{
     dispatch(campeonatosActions.update_user(champ));
 }

 const handleChangeChamps = (e) =>{
    const target = e.target;
    const value = target.value;
    const name = target.name;

    setchampsNew({...champsNew,
      [name]: value
    });
 }
 const handleChangeChampsUpdate = (e) =>{
    const target = e.target;
    const value = target.value;
    const name = target.name;

    setchamps({ ...champs,
      [name]: value
    });
 }
 const openAdding = ()=>{
     setopenAdd(!openAdd);
 }

 const handleSubmitChampsNew = (e) =>{
    e.preventDefault();
    console.log('champnew '+champsNew);
    if (champsNew.nombre !== '' && champsNew.fecha !== '' && champsNew.lugar !== '' && champsNew.descripcion !== '') {
       dispatch(campeonatosActions.register(champsNew));
    }else{
        console.log('no entro');
    }
    setTimeout(() => {    
        getAlllChamps();
        getAlll();
      }, 300);
 }

 const handleSubmitChampsUpdate = (e) =>{
    e.preventDefault();
    updateChamps(champs);
    setTimeout(() => {    
        getAlllChamps();
        getAlll();
      }, 300);

    
 }


 const handleSuscribe = (champ)=>{

       
        if(inscripto.nombre !== '' && inscripto.apellido !== '' && inscripto.edad !== ''){
            const inscriptosArray =champ.inscriptos.slice();
            let found = false;   
           for(var i = 0; i < inscriptosArray.length; i++) {  
                   if (inscriptosArray[i].nombre == inscripto.nombre && inscriptosArray[i].apellido == inscripto.apellido) {
                       dispatch(alertActions.error('Ya existe inscripto con ese nombre y apellido'));
                       found= true;
                       break;
                       }
               } 
           if(!found){
               inscriptosArray.push(inscripto);
               updateChamps({
                   inscriptos:inscriptosArray,
                   id: champ.id
               });
               }
           
         const visible = JSON.stringify(inscripto);
          console.log('inscripto '+visible);
          setTimeout(() => {    
           getAlllChamps();
           getAlll();
         }, 300);
        }
       
 }

 const deleteIncripcion = (id, champ)=>{
    console.log('user '+id);

    const inscriptosArray =champ.inscriptos.slice();
    const filtradoArray = inscriptosArray.filter( ins => ins.id !== id);

   updateChamps({
       inscriptos:filtradoArray,
       id: champ.id
   })
   console.log('inscripto '+inscripto);
   setTimeout(() => {    
    getAlllChamps();
    getAlll();
  }, 300);
 }


 const onchangeSubcat = (e)=>{
    let name = e.target.name;
    let value = e.target.value;
    setRepresentados({...representadoss,
    [name]: value,
    edad:_calculateAge(new Date(representadoss.fechaNac))
    });
    
    }

    const [representadoss,setRepresentados] = useState({
        nombre:'',
        apellido:'',
        genero:'',
        edad:''
    }); 


    const handleAddSubCategory = (account,repreName,repreApellido)=>{
         /*reset form representados */
         document.getElementById('nombreRepre').value = "";
         document.getElementById('apellidoRepre').value = "";
         document.getElementById('generoRepre').checked=false;
         document.getElementById('fechaRepre').value='';


        let name = repreName;
        let apellido = repreApellido;
        if(name !== '' && apellido !== ''){
            
        
        
            if(representadoss.nombre !== '' && representadoss.apellido !== ''){
                const repreArray =userValue.representados.slice();
                let found = false;   
               for(var i = 0; i < repreArray.length; i++) {  
                       if (repreArray[i].nombre == repreName && repreArray[i].apellido == repreApellido) {
                           dispatch(alertActions.error('Ya existe un representado con ese nombre'));
                           found= true;
                           break;
                           }
                   } 
               if(!found){
                   repreArray.push(representadoss);
                   const repre = {representados:repreArray}
                   const idd = user.id;
                   console.log('idd de update '+idd)
                   accountService.update(idd,repre)
            .then(() => {
               dispatch( alertActions.success('Update successful'))
                //history.push('.');
            })
            .catch(error => {
              //  setSubmitting(false);
               dispatch( alertActions.error(error));
            });
                    
               
             const visible = JSON.stringify(representadoss);
              console.log('representado '+visible);
              setTimeout(() => {
               
               getAlll();
             }, 300);
            }
           }
        }
    }
    
        const handleDeleteSubCategory = (repreName,repreApellido)=>{
    
            let name = repreName;
            let apellido = repreApellido
            if(name !== '' && apellido !== ''){
               
                const repreArray =userValue.representados.slice(); 
                let found = false; 
                   for(var i = 0; i < repreArray.length; i++) {  
                           if (repreArray[i].nombre == repreName && repreArray[i].apellido == repreApellido) {
                           const repreArrayFiltered= repreArray.filter(r=>r.nombre !== name && r.apellido !== apellido);
                           const repreArraySpliced = repreArray.splice(i,1);
                          //dispatch(accountActions.update_user(user.id,{representados:repreArrayFiltered}));
                          const repre = {representados:repreArrayFiltered}
                        const idd = user.id;
                          accountService.update(idd,repre)
                          .then(() => {
                             dispatch( alertActions.success('Delete successful'));
                             getAlll();
                              //history.push('.');
                          })
                          .catch(error => {
                            //  setSubmitting(false);
                             dispatch( alertActions.error(error));
                          });
                               break;
                               }
                       } 
                 
                   
                
                  setTimeout(() => {   
                  
                   getAlll();
                 }, 300);
                
               }
}
            function _calculateAge(birthday) { // birthday is a date
                var ageDifMs = Date.now() - birthday.getTime();
                var ageDate = new Date(ageDifMs); // miliseconds from epoch
                return Math.abs(ageDate.getUTCFullYear() - 1970);
            }

            const iddd = findIndexx(users);
            console.log('idddddd '+users);
            const visible = JSON.stringify(users);
              console.log('rusers '+visible);

            const [arr, setarr] = useState(user.representados.slice());
    return (
        <div className="col-lg-8 offset-lg-2">
           
            
            <h1>Tu Perfil</h1>
           {/* <form onSubmit={submitSearch}>
                            <div className="form-group">
                                <label>Buscar por ID</label>
                                <input id="searchInput" type="text" name="search" onChange={changeSearch} className={'form-control' + (submitted && error ? ' is-invalid' : '')}></input>
                                {error &&
                        <div className="invalid-feedback">This field is required</div>
                    }
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary" style={{margin: "10px"}}>BUSCAR</button>
                                <button type="button" className="btn btn-primary" onClick={refresh} style={{margin: "10px"}}>CLEAR</button>
                            </div>
                        </form>
                        <h3>All registered users:</h3>
            {users.loading && <em>Loading users...</em>}
            {users.error && <span className="text-danger">ERROR: {users.error}</span>}
            {loading ? <em>Loading users...</em> : ''}
            {users.items &&
                <ul>
                    {users.items.map((user, index) =>
                        <li key={user.id}>
                            {user.firstName + ' ' + user.lastName + ' ' + user.email}
                            <div>ID: {user.id}</div>
                            <div>Date of Birth: {user.dateOfBirth}</div>
                            <ul>
                               {/* {user.representados && user.representados.map(r=>
                                 <li key={r.id}>
                                     <p>{r.nombre+' '+r.apellido+' '+r.edad+' '+r.genero}</p>
                                 </li>   
                                    
                               )}
                            </ul>
                            {
                                user.deleting ? <em> - Deleting...</em>
                                : user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
                                : <div><span> - <a onClick={() => handleDeleteUser(user.id)} className="text-primary">Delete</a></span> <span> - <a onClick={() => handleEdit(user.id)} className="text-primary">Edit</a></span> </div>
                            }
                             {edit.open && edit.id == user.id &&
                    
                    <div>
                        
                        <form onSubmit={handleSubmit}>
                        <div className="form-group">
                        <label>firstName</label>
                        <input type="text" name="firstName" onChange={handleChange} defaultValue={user.firstName} className="form-control"></input>
                        </div>
                        <div className="form-group">
                        <label>lasstName</label>
                        <input type="text" name="lastName" onChange={handleChange} defaultValue={user.lastName} className="form-control"></input>
                        </div>
                        <div className="form-group">
                        <label>userName</label>
                        <input type="text" name="username" onChange={handleChange} defaultValue={user.username} className="form-control"></input><br></br>
                        </div>
                        <div className="form-group">
                        <label>dateOfBirth</label>
                        <input type="date" name="dateOfBirth" onChange={handleChange} defaultValue={user.dateOfBirth} className="form-control"></input><br></br>
                        </div>
                        <button onClick={close} className="btn btn-primary" style={{margin: "10px"}}>Cancel</button>        
                        <button type="submit" className="btn btn-primary" style={{margin: "10px"}}>Guardar</button>
                        
                        </form>
                        
                    </div>
                    
                    }
                        </li>
                            
                        
                    )}

                   
                </ul>
            }*/}
            
           
                <Grid item className={classes.contRepre}>
                <form onSubmit={handleSubmit}>
                        <div className="form-group">
                        <label>Nombre</label>
                        <input type="text" name="firstName" onChange={handleChange} defaultValue={userValue !== null ? userValue.firstName: user.firstName} className="form-control"></input>
                        </div>
                        <div className="form-group">
                        <label>Apellido</label>
                        <input type="text" name="lastName" onChange={handleChange} defaultValue={userValue !== null ? userValue.lastName : user.lastName} className="form-control"></input>
                        </div>
                        {userValue == null ? <Grid className="form-group">
                                            <label>Genero</label><br/>
                                            <span>Masculino <input type="radio" name="genero" defaultChecked={user.genero == 'masc'  ? true : ''} onChange={handleChange}  value="masc" ></input></span>
                                            <span> Femenino  <input type="radio" name="genero" defaultChecked={user.genero == 'fem'  ? true : ''} onChange={handleChange}  value="fem" ></input></span>
                                        </Grid> : <Grid className="form-group">
                                            <label>Genero</label><br/>
                                            <span>Masculino <input type="radio" name="genero" defaultChecked={userValue.genero == 'masc'  ? true : ''} onChange={handleChange}  value="masc" ></input></span>
                                            <span> Femenino  <input type="radio" name="genero" defaultChecked={userValue.genero == 'fem'  ? true : ''} onChange={handleChange}  value="fem" ></input></span>
                                        </Grid>}
                        <div className="form-group">
                        <label>Fecha de Nacimiento</label>
                        <p>{moment.utc(new Date(userValue !== null ? userValue.dateOfBirth : user.dateOfBirth)).format('DD/MM/YYYY')}</p><br></br>
                        </div>
                        <Grid item className={classes.center}>
                        <Button type="submit" variant="contained" color="primary"  style={{marginTop: "10px",textAlign:"center"}} >Guardar cambios de perfil</Button>
                        </Grid>
                      
                        </form>
                </Grid>
               
               
                        <Grid container className={classes.contRepre}>
                                                    <Grid item xs={12}>
                                                        <Typography variant="h5" className={classes.center}>Representados</Typography> 
                                                        <Grid item className={classes.contSubcats}>
                                                        {userValue !== null ? userValue.representados.map((r,index)=>
                                                                <div className={classes.boxSubcat} key={r._id}>
                                                                    <p className={classes.textSubcat}>{r.nombre+' '+r.apellido}</p>
                                                                   <p className={classes.textSubcat}>Edad: {r.edad} Sexo: {r.genero}</p>
                                                                    <a className="danger" onClick={()=>handleDeleteSubCategory(r.nombre,r.apellido)}>Borrar</a>
                                                                </div>) : <p className={classes.center}>NO TIENE REPRESENTADOS REGISTRADOS</p>}
                                                        </Grid>
                                                        </Grid>
                                                            <Grid item xs={12} md={6} className={classes.padd20}>
                                                            <p>Nombre</p>
                                                            <input type="text" name="nombre" id="nombreRepre" onChange={onchangeSubcat} className="form-control"></input>
                                                            <p>Apellido</p>
                                                            <input type="text" name="apellido" id="apellidoRepre" onChange={onchangeSubcat} className="form-control"></input>
                                                        
                                                            </Grid>
                                                            <Grid item xs={12} md={6} className={classes.padd20}>

                                                                <Grid className="form-group">
                                                                    <label>Genero</label><br/>
                                                                    <span>Masculino <input type="radio" id="generoRepre" name="genero" onChange={onchangeSubcat}  value="masc" ></input></span>
                                                                    <span> Femenino  <input type="radio" id="generoRepre" name="genero" onChange={onchangeSubcat}  value="fem" ></input></span>
                                                                </Grid>
                                                                <Grid className="form-group">
                                                                    <label>Fecha de Nacimiento</label><br />
                                                                    <input type="date" name="fechaNac" id="fechaRepre" onChange={onchangeSubcat}></input>
                                                                </Grid>
                                                                <Grid>
                                                                    <Typography>Edad: {representadoss.edad !== null ? representadoss.edad : ''}</Typography>
                                                                </Grid>
                                                            </Grid>
                                                      
                                                      <Grid item xs={12} className={classes.centerCent}>
                                                      <Button variant="contained" color="primary" onClick={()=>handleAddSubCategory(user,representadoss.nombre,representadoss.apellido)}>AGREGAR REPRESENTADO</Button>
                                                          </Grid>  
                                                    

                                
                                                    </Grid>
                           
                       
                        
                        
            
           
        </div>
    );
}


  
  export {UsersPage};