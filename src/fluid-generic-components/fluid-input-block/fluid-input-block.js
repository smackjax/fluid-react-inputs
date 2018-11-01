import React from 'react';
import PropTypes from 'prop-types';
import {FluidError} from '../fluid-error';
import {FluidDataInput} from '../fluid-data-input';
import * as CLASSES from '../fluid-classes';

const noOp = ()=>{};

const FluidInputBlock=(props)=>{
    const {currentData, saveKey} = props;

    // Get input error msg
    const errorMsg = 
        (currentData && currentData[saveKey] && currentData[saveKey].errorMsg) || 
        // Default msg
        ''; 

    return (
        <>
            {(errorMsg && props.displayErrorMsg) && (
                <FluidError msg={errorMsg} />
            )}
            <label className={CLASSES.LABEL}>
                <span className={CLASSES.LABEL_TEXT}>{props.label}</span>
                <FluidDataInput 
                {...props}
                />
            </label>
        </>
    )
};


FluidInputBlock.propTypes = {
    label: PropTypes.string,
    errorMsg: PropTypes.string.isRequired,
    saveKey: PropTypes.string.isRequired,
    editing: PropTypes.bool.isRequired,
    currentData: PropTypes.object.isRequired,

    // Key checks
    disableTab: PropTypes.bool,
    disableSaveOnTab: PropTypes.bool,
    keyCheckTabSave: PropTypes.func.isRequired,
    keyCheckDisabledTab: PropTypes.func.isRequired,
    keyCheckOnlyEnter: PropTypes.func.isRequired,

    // Editing lifecycle methods
    startEditing: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleCancel: PropTypes.func.isRequired,
};

// Default props are needed so isRequired doesn't fail when cloning
FluidInputBlock.defaultProps = {
    label: '',
    errorMsg: '',
    saveKey: '',
    editing: false,
    currentData: {},

    disableTab: false,
    static: false,
    displayErrorMsg: true,

    keyCheckTabSave: noOp,
    keyCheckDisabledTab: noOp,
    keyCheckOnlyEnter: noOp,

    startEditing: noOp,
    handleChange: noOp,
    handleCancel: noOp,
};


export {FluidInputBlock};
export default FluidInputBlock;