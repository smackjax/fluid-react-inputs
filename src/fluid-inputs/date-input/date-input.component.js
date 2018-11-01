import React from 'react';
import PropTypes from 'prop-types';
import Validator from 'validator';
// Fluid input generics
import {
    BasicFluidInput
} from '../_fluid-generic-components';

// Validates on change
const validateChange = (date)=>{
    return Validator.isISO8601(date) ? '' :
        "Not ISO date(YYYY-MM-DD)"
}

export const DateInput = (props)=>{
    return (
        <BasicFluidInput 
        {...props}
        label={props.label || 'Date'}
        saveKey={props.saveKey || 'date'}
        validateChange={props.validateChange || validateChange}
        />
    )
}
DateInput.propTypes = {
    // Current saved value of input
    defaultValue: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    // Not required if input is static
    handleSave: PropTypes.func,
    
    // (OPTIONAL OVERRIDES)
    label: PropTypes.string,
    saveKey: PropTypes.string,
    disableTab: PropTypes.bool,
    static: PropTypes.bool,
    validateChange: PropTypes.func,
}

export default DateInput;