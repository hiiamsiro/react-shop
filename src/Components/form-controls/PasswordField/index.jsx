import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

PasswordField.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.object.isRequired,

    label: PropTypes.string,
    disabled: PropTypes.bool
};

function PasswordField(props) {
    const {form,name,label,disabled} = props; //form là props của const form = useForm bên TodoForm
    const {control, formState: { errors,touchedFields }} = form; //lấy ra object form trong props form trên
    const hasError = !!errors[name];
    const [showPassword, setShowPassword] = useState('');
    const toggleShowPassword = () =>{
        setShowPassword(x => !x);
    }
    
    return (
        <div>
            {/* <Controller
            name={name}
            control={control}
            render={({ field: { onChange, onBlur, name, value}}) => (
                <TextField
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    
                    error={!!hasError}
                    helperText={errors[name]?.message}
                    
                    value={value}
                    label={label} //cho thuộc tính label bằng props label bên thằng cha(TodoForm)
                    onChange={onChange}
                    onBlur={onBlur}
                    name={name}
                    disabled={disabled}
                />
            )}
        ></Controller> */}

        <FormControl fullWidth error={hasError} margin='normal' variant="outlined">
          <InputLabel htmlFor={name}>{label}</InputLabel>
          <Controller
            name={name}
            control={control}
            
            render={({ field: { onChange, onBlur, name, value}}) => (
                <OutlinedInput
                    fullWidth
                    id={name}
                    name={name}
                    label={label}
                    value={value}
                    disabled={disabled}
                    type={showPassword ? 'text' : 'password'}

                    error={!!hasError}

                    onChange={onChange}
                    onBlur={onBlur}

                    endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={toggleShowPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                    }
                />
            )}
          />
          
          <FormHelperText>{errors[name]?.message}</FormHelperText>

        </FormControl>
        </div>
    );
}

export default PasswordField;