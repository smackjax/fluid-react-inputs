/* ==============================================
    Composite component that functions as one
================================================== */

import React from 'react';
import PropTypes from 'prop-types';

// Fluid input generics
import {
    FluidDataWrappers,
    FluidInputBlock
} from '../../fluid-generic-components';

// Validates changes to each field, right now there's no validation
const validateAddressOne = (addressOne, currentVals)=>{
    return '';
}
const validateAddressTwo=(addressTwo, currentVals)=>{
    return '';
}
const validateCity=(city, currentVals)=>{

    return city.indexOf('nowhere') === -1 ? '' :
        "You can't put that there!";
}
const validateState=(state, currentVals)=>{
    return '';
}
const validateZip=(zip, currentVals)=>{
    return (/^\d+$/.test(zip) && zip.length === 5) ? '' : 
        "Zip has to be five digits"
}

const AddressCompositeInput = (props)=>{
        // Gets nested saveKey, if present
    const parentSaveKey = 
        props.saveKey ? (props.saveKey + '.') : '';
    return (
        <FluidDataWrappers
        onSave={props.handleSave}
        editOnMount={props.editOnMount || false}
        static={props.static}
        displayErrorMsg={true}
        >
            <FluidInputBlock
            label='Address'
            disableSaveOnTab={true}
            value={props.defaultValues.addressOne || ''}
            saveKey={parentSaveKey + 'addressOne'}
            validateChange={validateAddressOne}
            static={props.static}
            />

            <FluidInputBlock
            label='Address 2'
            disableSaveOnTab={true}
            value={props.defaultValues.addressTwo || ''}
            saveKey={parentSaveKey + 'addressTwo'}
            validateChange={validateAddressTwo}
            static={props.static}
            />
            
            <FluidInputBlock
            label="City(don't put 'nowhere')"
            disableSaveOnTab={true}
            value={props.defaultValues.city || ''}
            saveKey={parentSaveKey + 'city'}
            validateChange={validateCity}
            static={props.static}
            />

            <FluidInputBlock
            label='State'
            disableSaveOnTab={true}
            value={props.defaultValues.state || ''}
            saveKey={parentSaveKey + 'state'}
            validateChange={validateState}
            static={props.static}
            />

            <FluidInputBlock
            label='Zip'
            value={props.defaultValues.zip || ''}
            saveKey={parentSaveKey + 'zip'}
            validateChange={validateZip}
            />

        </FluidDataWrappers>
    )
}
AddressCompositeInput.propTypes = {
    // Current saved value of input
    defaultValues: PropTypes.shape({
        addressOne: PropTypes.string,
        addressTwo: PropTypes.string,
        city: PropTypes.string,
        state: PropTypes.string,
        zip: PropTypes.string
    }).isRequired,
    // Not required if input is static
    handleSave: PropTypes.func,
    editOnMount: PropTypes.bool,

    // (OPTIONAL OVERRIDES)
    saveKey: PropTypes.string,
    static: PropTypes.bool,
    validateChange: PropTypes.func,
}
AddressCompositeInput.defaultProps = {
    saveKey: '',
    defaultValues: {
        addressOne: "",
        addressTwo: '',
        city: '',
        state: '',
        zip: '',
    }
}
export {AddressCompositeInput};
export default AddressCompositeInput;