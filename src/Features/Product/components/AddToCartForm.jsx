import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import InputField from './../../../Components/form-controls/InputField/index';
import { Button } from '@mui/material';
import QuantityField from './../../../Components/form-controls/QuantityField/index';

AddToCartForm.propTypes = {
    onSubmit: PropTypes.func,
};

function AddToCartForm({onSubmit = null}) {
    
    const schema = yup.object().shape({
        quantity: yup
            .number()
            .required('Please enter quantity')
            .min(1, 'Please enter at least 1')
            .typeError('Please enter a number'),
    });

    //khai báo props form, gán cho bằng useForm
    const form = useForm({
        defaultValues: {
            quantity: 1,
        },
        resolver: yupResolver(schema)
    });
    
    const handleSubmit = async (value) => {
        if(onSubmit){
            await onSubmit(value);
        }
    }

    return (
        <form onSubmit={form.handleSubmit(handleSubmit)}>
                <QuantityField name="quantity" label="Quantity" form={form}/>
                {/* form,name,label là props của Input Field */}

                <Button 
                    type='submit' 
                    sx={{
                        marginTop: 2,
                        marginBottom: 2
                    }}
                    variant="contained" 
                    color="primary" 
                    style={{width: '250px'}} 
                    size="large">
                    ADD TO CART
                </Button>
            </form>
    );
}

export default AddToCartForm;