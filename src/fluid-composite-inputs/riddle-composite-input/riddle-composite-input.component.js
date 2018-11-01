/* ==============================================
    Composite component which can only be edited 
    when adding a new item
================================================== */

import React from 'react';
import PropTypes from 'prop-types';

// Fluid input generics
import {
    FluidDataWrappers,
    FluidInputBlock
} from '../../fluid-generic-components';

// Validates name on change
const validateAnswer = (answer, currentVals)=>{
    return (answer.indexOf('microwaves') !== -1) ? '' : 
        "(type 'microwaves' somewhere)";
}

const RiddleCompositeInput = (props)=>{
    const parentSaveKey = props.saveKey ? 
        (props.saveKey + '.') : '';
    return (
        <FluidDataWrappers
        onSave={props.handleSave}
        static={props.static}
        >
            <FluidInputBlock
            {...props}
            label='What washes up on tiny beaches?'
            // Allows tabbing, but doesn't attempt save
            disableSaveOnTab={true}
            value={props.defaultValues.riddle || ''}
            saveKey={parentSaveKey + 'riddle'}
            validateChange={validateAnswer}
            />

            <FluidInputBlock
            {...props}
            label='How was my riddle?'
            value={props.defaultValues.thoughts || ''}
            saveKey={parentSaveKey + 'thoughts'}
            />

        </FluidDataWrappers>
    )
}
RiddleCompositeInput.propTypes = {
    // Current saved value of input
    defaultValues: PropTypes.shape({
        riddle: PropTypes.string,
        thoughts: PropTypes.string
    }).isRequired,
    // Not required if input is static
    handleSave: PropTypes.func,
    // Parent save key
    saveKey: PropTypes.string,
}
RiddleCompositeInput.defaultProps = {
    saveKey: '',
    defaultValues: {
        riddle: '',
        anything: '',
    }
}
export {RiddleCompositeInput};
export default RiddleCompositeInput;