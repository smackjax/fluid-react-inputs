/* ==================================================
    Wrapper for simple one-input editable block
===================================================== */
import React from 'react';
import PropTypes from 'prop-types';

// Fluid input generics
import {FluidDataWrappers} from '../fluid-data-wrappers';
import {FluidInputBlock} from '../fluid-input-block';


// Placeholder no-op function if input is static
const noOp = ()=>{}

const BasicFluidInput = (props)=>{
    return (
        <FluidDataWrappers
        static={props.static}
        onSave={props.handleSave}
        >
            <FluidInputBlock 
            value={props.defaultValue}
            label={props.label || 'City'}
            saveKey={props.saveKey || 'city'}
            disableTab={props.disableTab}
            static={props.static}
            validateChange={props.validateChange}
            />
        </FluidDataWrappers>
    )
}
BasicFluidInput.propTypes = {
    // Receives save obj with new input value under it's saveKey
    handleSave: PropTypes.func.isRequired,
    startEditing: PropTypes.func.isRequired,
    // Current saved value of input
    defaultValue: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    saveKey: PropTypes.string,
    
    // (OPTIONAL OVERRIDES)
    label: PropTypes.string,
    disableTab: PropTypes.bool,
    static: PropTypes.bool,
    validateChange: PropTypes.func,
}

BasicFluidInput.defaultProps = {
    handleSave: noOp,
    startEditing: noOp,
}


export { BasicFluidInput };
export default BasicFluidInput;