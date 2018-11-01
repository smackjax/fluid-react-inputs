import React from 'react';
import PropTypes from 'prop-types';

// Fluid input generics
import {
    BasicFluidInput
} from '../_fluid-generic-components';

// Validates name on change
const validateOnlyNums = (onlyNums, currentData)=>{
    let valid = !isNaN(onlyNums);
    return !valid ? 'Gotta putta numbah, yo' : '';
}

const OnlyNumsInput = (props)=>{
    return (
        <BasicFluidInput 
        {...props}
        label={'Only Numbers allowed'}
        saveKey={props.saveKey || 'onlyNums'}
        validateChange={validateOnlyNums}
        />
    )
}

OnlyNumsInput.propTypes = {
    // Receives save obj with new input value under it's saveKey
    handleSave: PropTypes.func.isRequired,
    // Current saved value of input
    defaultValue: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
}

export { OnlyNumsInput};
export default OnlyNumsInput;