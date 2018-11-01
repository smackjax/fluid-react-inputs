import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as CLASSES from '../fluid-classes';


class FluidDataInput extends Component {

    handleChange=({target: {value}})=>{
        const errorMsg = 
            this.props.validateChange ?
            this.props.validateChange(value, this.props.currentData) :
            '';

        this.props.handleChange(
            this.props.saveKey, 
            { value, errorMsg } 
        )
    }

    render(){
        const {currentData, saveKey} = this.props;
        const editedValue = currentData[saveKey] && currentData[saveKey].value;
        const currentValue =  editedValue || this.props.value;

        const invalid = (currentData && currentData[saveKey]) ? currentData[saveKey].invalid : false;

        const inputClass = CLASSES.INPUT + 
            (this.props.static ? (' ' + CLASSES.INPUT_STATIC) : '') + 
            (this.props.editing ? (' ' + CLASSES.INPUT_EDITING) : '')  + 
            (invalid ? (' ' + CLASSES.INPUT_INVALID) : '');
            

        const inputFuncs = this.props.static ? 
            {} : {
                onChange: this.handleChange,
                // TODO I don't like having this in render
                // Set onKeydown function
                onKeyDown: this.props.disableTab ?
                    // Disables tab completely
                    this.props.keyCheckDisabledTab :
                    // Disables saving when tabbed
                    this.props.disableSaveOnTab ?
                    this.props.keyCheckOnlyEnter :
                    // Defaults to saving when tabbed
                    this.props.keyCheckTabSave,
                onFocus : this.props.startEditing
            }

        return (
            <input 
            type='text'
            className={inputClass}
            value={currentValue}
            readOnly={this.props.static}
            {...inputFuncs}
            />
        )
    }
}

// Prop types
FluidDataInput.propTypes = {
    // Unique props
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    saveKey: PropTypes.string.isRequired,
    validateChange: PropTypes.func,

    // Passed from HOC
    editing: PropTypes.bool.isRequired,
    startEditing: PropTypes.func.isRequired,
    currentData: PropTypes.object.isRequired,

    handleChange: PropTypes.func.isRequired,
    handleCancel: PropTypes.func.isRequired,
};

export {FluidDataInput};
export default FluidDataInput;
