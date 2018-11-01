import React from 'react';
import PropTypes from 'prop-types';
import Validator from 'validator';
// Fluid input generics
import {
    BasicFluidInput
} from '../_fluid-generic-components';

// Validates name on change
const validateChange = (email)=>{
    return Validator.isEmail(email) ? '' : 
        "That's not an email";
}

export const EmailInput = (props)=>{
    return (
        <BasicFluidInput 
        {...props}
        label={props.label || 'Email'}
        saveKey={props.saveKey || 'email'}
        validateChange={props.validateChange || validateChange}
        />
    )
}
EmailInput.propTypes = {
    // Receives save obj with new input value under it's saveKey
    handleSave: PropTypes.func.isRequired,
    // Current saved value of input
    defaultValue: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    
    // (OPTIONAL OVERRIDES)
    label: PropTypes.string,
    saveKey: PropTypes.string,
    disableTab: PropTypes.bool,
    static: PropTypes.bool,
    validateChange: PropTypes.func,
}

export default EmailInput;