import React from 'react';
import PropTypes from 'prop-types';
import InputField from '../../../../Components/form-controls/InputField';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Avatar, Button, createTheme, Typography, LinearProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { LockOutlined } from '@mui/icons-material';
import PasswordField from 'Components/form-controls/PasswordField';

const theme = createTheme();
const useStyles = makeStyles({
    root: {
        paddingTop: 16,
        position: 'relative'
    },

    title: {
        textAlign: 'center',
        paddingTop: 2,
        paddingRight: 0,
        paddingBottom: 3,
        paddingLeft: 0
    },

    progress: {
        position: 'absolute',
        marginBottom: 23
    }

});

LoginForm.propTypes = {
    onSubmitForm: PropTypes.func,
};

function LoginForm(props) {
    
    const classes = useStyles(props);

    const schema = yup.object().shape({
        identifier: yup.string()
            .required('Please enter your email')
            .email('Please enter a valid email address'),
        password: yup.string()
            .required('Please enter your password')
    });

    //khai báo props form, gán cho bằng useForm
    const form = useForm({
        defaultValues: {
            identifier: '',
            password: '',

        },
        resolver: yupResolver(schema)
    });
    
    const handleSubmit = async (value) => {
        const {onSubmitForm} = props;
        if(onSubmitForm){
            await onSubmitForm(value);
        }
        
    }

    const {
        formState: {isSubmitting},
    } = form; //form của useForm khai báo ở trên

    return (
        <div className={classes.root}>
            {isSubmitting && <LinearProgress className={classes.progress}/>}    
            
            <Avatar 
                sx={{
                    backgroundColor: 'red',
                    margin: '0 auto',
                }}
            >
                <LockOutlined>
                </LockOutlined>
            </Avatar>

            <Typography className={classes.title} component="h3" variant="h5">
                Sign in
            </Typography>

            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <InputField name="identifier" label="Email" form={form}/>
                <PasswordField name="password" label="Password" form={form}/> 
                {/* form,name,label là props của Input Field */}

                <Button type='submit' 
                    sx={{
                        marginTop: 2,
                        marginBottom: 2
                    }}
                    variant="contained" color="primary" fullWidth size="large">
                    Sign in
                </Button>
            </form>
        </div>
    );
}

export default LoginForm;