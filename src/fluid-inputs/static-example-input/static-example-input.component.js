import React from 'react';
import PropTypes from 'prop-types';

// Fluid input generics
import {
    BasicFluidInput
} from '../_fluid-generic-components';


const StaticExampleInput = (props)=>{
    return (
        <BasicFluidInput 
        handleSave={props.handleSave}
        defaultValue={props.defaultValue}
        label={props.label || "I cannot be changed"}
        static={true}
        />
    )
}
StaticExampleInput.propTypes = {
    // Current saved value of input
    defaultValue: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
}

export {StaticExampleInput};
export default StaticExampleInput;