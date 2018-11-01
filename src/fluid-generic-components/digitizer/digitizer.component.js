import React, {Component} from 'react';
import PropTypes from 'prop-types';

const classes = {
    base: 'digitizer',
    active: 'active'
}

// Animation time in ms
const animDuration = 301;

class Digitizer extends Component{
    // Renders from state to allow animation
    state={
        renderDigitizer: false,
        addActiveClass: false,
    }

    componentDidUpdate({active: prevActive}){
        // Prevents loop
        if(prevActive !== this.props.active){
            // Digitizer is now active
            if(this.props.active){
                this.setState({ 
                    renderDigitizer: true
                }, ()=>{
                    setTimeout(this.addActiveClass, 1);
                });
            // Digitizer is becoming inactive
            } else {
                this.setState({
                    addActiveClass: false
                }, ()=>{
                    // Unmounts digitizer once animation completes
                    setTimeout(this.stopRendering, animDuration);
                });
            }
        }
    }

    // Stops rendering digitizer
    stopRendering=()=>{this.setState({renderDigitizer: false});}
    // Adds active class separate from mounting
    addActiveClass=()=>{this.setState({addActiveClass: true});}

    render(){
        if(!this.state.renderDigitizer) return null;

        const activeClass = (this.state.addActiveClass ? classes.active : '')
        const digitizerClass = `${classes.base} ${activeClass} ${this.props.className || ''}`;
        return (
            <div
            className={digitizerClass}
            onClick={ this.props.onClick }
            />
        )
    }
}

Digitizer.propTypes = {
    active: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    onCancel: PropTypes.func,
}

export {Digitizer};

export default Digitizer;
