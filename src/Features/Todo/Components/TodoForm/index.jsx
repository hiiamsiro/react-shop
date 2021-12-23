import React from 'react';
import PropTypes from 'prop-types';
import InputField from '../../../../Components/form-controls/InputField';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";



TodoForm.propTypes = {
    onSubmitForm: PropTypes.func,
};

function TodoForm(props) {
    const schema = yup.object({
        title: yup.string()
            .required('Please enter title')
            .min(5, 'Title is too short')
    }).required();

    //khai báo props form, gán cho bằng useForm
    const form = useForm({
        defaultValues: {
            title: '',
        },
        resolver: yupResolver(schema)
    });
    
    const handleSubmit = (value) => {
        const {onSubmitForm} = props;
        if(onSubmitForm){
            onSubmitForm(value);
        }
        
        form.reset();
    }
    return (
        <form onSubmit={form.handleSubmit(handleSubmit)}>
            <InputField name="title" label="Todo" form={form}/> 
            {/* form,name,label là props của Input Field */}
        </form>
    );
}

export default TodoForm;