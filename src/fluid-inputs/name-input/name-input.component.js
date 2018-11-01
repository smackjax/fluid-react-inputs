import React from 'react';
import PropTypes from 'prop-types';

// Fluid input generics
import {
    BasicFluidInput
} from '../_fluid-generic-components';

const NameInput = (props)=>{
    return (
        <BasicFluidInput 
        {...props}
        label={props.label || 'Name'}
        saveKey={props.saveKey || 'name'}
        />
    )
}
NameInput.propTypes = {
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
    static: PropTypes.bool,
}


export {NameInput};
export default NameInput;