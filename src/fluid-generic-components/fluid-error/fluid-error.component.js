import React from 'react';
import PropTypes from 'prop-types';
import * as CLASSES from '../fluid-classes';

const FluidError = (props)=>(
    <div className={CLASSES.ERROR_MSG}>
        {props.msg}
    </div>
)
FluidError.propTypes = {
    msg: PropTypes.string.isRequired
}
export {FluidError};
export default FluidError;