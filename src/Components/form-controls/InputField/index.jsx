import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';


InputField.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.object.isRequired,

    label: PropTypes.string,
    disabled: PropTypes.bool
};

function InputField(props) {
    const {form,name,label,disabled} = props; //form là props của const form = useForm bên TodoForm
    const {control, formState: { errors,touchedFields }} = form; //lấy ra object form trong props form trên
    const hasError = errors[name];
    
    return (
        <Controller
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
    ></Controller>
    );
}

export default InputField;