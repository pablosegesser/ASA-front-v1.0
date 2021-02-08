import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import {useDispatch} from 'react-redux';
import { accountService, alertService } from '../_services';
import {accountActions} from '../_actions/account.actions'
import { alertActions } from '../_actions';

function VerifyEmail({ history }) {
    const EmailStatus = {
        Verifying: 'Verifying',
        Failed: 'Failed'
    }
    const dispatch = useDispatch()

    const [emailStatus, setEmailStatus] = useState(EmailStatus.Verifying);

    useEffect(() => {
        const { token } = queryString.parse(location.search);

        // remove token from url to prevent http referer leakage
        history.replace(location.pathname);

        accountService.verifyEmail(token)
        
            .then(() => {
               dispatch(alertActions.success('Verification successful, you can now login'));
               setTimeout(function(){
                history.push('/login');
               },8000)
                
            })
            .catch(() => {
                setEmailStatus(EmailStatus.Failed);
            });
    }, []);

    function getBody() {
        switch (emailStatus) {
            case EmailStatus.Verifying:
                return <div>Verification successful, you redirected to login soon</div>;
            case EmailStatus.Failed:
                return <div>Verification failed, you can also verify your account using the <Link to="forgot-password">forgot password</Link> page.</div>;
        }
    }

    return (
        <div>
            <h3 className="card-header">Verify Email</h3>
            <div className="card-body">{getBody()}</div>
        </div>
    )
}

export { VerifyEmail }; 