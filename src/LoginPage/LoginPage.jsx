import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {accountActions} from '../_actions/account.actions';
import { userActions } from '../_actions';
import {Button} from '@material-ui/core';

function LoginPage() {
    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const { email, password } = inputs;
    const loggingIn = useSelector(state => state.authenticationAccount.loggingIn);
    const dispatch = useDispatch();
    const location = useLocation();

    

    function handleChange(e) {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if (email && password) {
            // get return url from location state or default to home page
            const { from } = location.state || { from: { pathname: "/" } };
            dispatch(accountActions.login(email, password, from));
        }
    }

    return (
        <div className="col-lg-4 offset-lg-4">
            <h2>Ingresar</h2>
            <form name="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email</label>
                    <input type="text" name="email" value={email} onChange={handleChange} className={'form-control' + (submitted && !email ? ' is-invalid' : '')} />
                    {submitted && !email &&
                        <div className="invalid-feedback">El email es requerido</div>
                    }
                </div>
                <div className="form-group">
                    <label>Constraseña</label>
                    <input type="password" name="password" value={password} onChange={handleChange} className={'form-control' + (submitted && !password ? ' is-invalid' : '')} />
                    {submitted && !password &&
                        <div className="invalid-feedback">La contraseña es requerida</div>
                    }
                </div>
                <div className="form-group">
                    <Button type="submit" variant="contained" color="primary">
                        {loggingIn && <span className="spinner-border spinner-border-sm mr-1"></span>}
                        Ingresar
                    </Button>
                    <Link to="/register" className="btn btn-link">Registrarse</Link>
                    <div className="form-group col text-right" style={{display:"inline"}}>
                                <Link to="forgot-password" className="btn btn-link pr-0">Olvidaste tu contraseña?</Link>
                            </div>
                </div>
            </form>
        </div>
    );
}

export { LoginPage };