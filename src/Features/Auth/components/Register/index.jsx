import React from 'react';
import PropTypes from 'prop-types';
import RegisterForm from '../RegisterForm';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { register } from 'Features/Auth/userSlice';
import { useSnackbar } from 'notistack';

Register.propTypes = {
    
};

function Register(props) {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit = async (values) =>{
        try {
            //auto set username = email
            values.username = values.email;

            const action = register(values); //register bên userSlice
            const resultAction = await dispatch(action);
            const user = unwrapResult(resultAction);
            

            //close dialog
            const {closeDialog} = props;
            if(closeDialog){
                closeDialog(); //cho props closeDialog bằng hàm handleClose bên Header
            }

            //do something here on register successfully
            console.log('New user', user);
            enqueueSnackbar('This is a success message!', { variant: 'success' });
        } catch (error) {
            enqueueSnackbar(error.message, { variant: 'error' });
        }
    };

    return (
        <div>
            <RegisterForm onSubmitForm={handleSubmit}/>
        </div>
    );
}

export default Register;