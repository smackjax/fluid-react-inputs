import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FluidLogicHOC} from '../fluid-logic-hoc/fluid-logic-hoc.component';
import {Digitizer} from '../digitizer';
import {FluidError} from '../fluid-error';
import * as CLASSES from '../fluid-classes';

const REFS = {
    placeholder: 'placeholderElement',
    innerWrap: 'innerWrapElement'
}
// Taken with appreciation from:
// https://stackoverflow.com/questions/11805955/how-to-get-the-distance-from-the-top-for-an-element
const getYPosition = (element)=>{
    var yPosition = 0;
    while(element) {
        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
    }
    return yPosition;
}

/* NOTES 
When the input is being edited, the placeholder style is set dynamically to its current width and height, preserving the dom space.
The inner wrap is switched to 'fixed' and placed relative to screen size, or placed at the top of the screen for small screens
*/
class FluidDataWrappersClass extends Component {
    state={
        placeholderStyles: {},
        innerWrapStyles: {}
    }

    componentDidUpdate({editing: prevEditing}){
        if(prevEditing !== this.props.editing){
            const placeholderStyles = this.getPlaceholderStyles(this.props.editing);
            const innerWrapStyles = this.getInnerWrapStyles(this.props.editing);
            this.setState({
                placeholderStyles,
                innerWrapStyles
            })
        }
    }

    // Stores element references
    createRef=(refKey)=>(el)=>{
        this[refKey] = el; 
    }

    getPlaceholderStyles=(editing)=>{
        if(!editing) return {};
        // Get rendered element values
        const placeholderRect = this[REFS.placeholder].getBoundingClientRect();
        return {
            height: placeholderRect.height,
            width: placeholderRect.width
        };
    }
    getInnerWrapStyles=(editing)=>{
        // Clear styles if not editing
        if(!editing) return (this.props.innerWrapStyles || {});

        // Get rendered element values
        const innerWrapRect = this[REFS.innerWrap].getBoundingClientRect();
        // TODO check for small screens
        return {
            position: 'absolute',
            top: getYPosition(this[REFS.innerWrap]),
            left: innerWrapRect.left,
            width: innerWrapRect.width
        };
        // return {
        //     position: 'fixed',
        //     top: innerWrapRect.top,
        //     left: innerWrapRect.left,
        //     width: innerWrapRect.width
        // };
    }

    render(){
        // get render classes
        const innerWrapClass = 
            `${CLASSES.INNER_WRAP} ${this.props.editing ? CLASSES.INNER_WRAP_EDITING : ''}`;
        
        // Spreads HOC props into children
        const childrenWithProps = React.Children.map(
            this.props.children, child=>{
                return React.cloneElement(child, {
                    ...child.props,
                    ...this.props,
                })
            }
        );

        return (
            <div
            className={CLASSES.PLACEHOLDER}
            ref={this.createRef(REFS.placeholder)}
            style={this.state.placeholderStyles}
           
            >

                <Digitizer 
                active={this.props.editing}
                onClick={this.props.handleSave}
                onCancel={this.props.handleCancel}
                />

                <div
                className={innerWrapClass}
                ref={this.createRef(REFS.innerWrap)}
                style={this.state.innerWrapStyles}
                >
                    {(this.props.errorMsg && this.props.displayErrorMsg) && (
                        <FluidError msg={this.props.errorMsg} />
                    )}


                    {childrenWithProps}
                </div>
            </div>
        )
    }
}

FluidDataWrappersClass.propTypes = {
    // Passed from HOC
    editing: PropTypes.bool.isRequired,
    errorMsg: PropTypes.string.isRequired,
    currentData: PropTypes.object.isRequired,
    
    keyCheckTabSave: PropTypes.func.isRequired,
    keyCheckDisabledTab: PropTypes.func.isRequired,
    
    static: PropTypes.bool,

    displayErrorMsg: PropTypes.bool,

    // Editing lifecycle methods
    startEditing: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleSave: PropTypes.func.isRequired,
    handleCancel: PropTypes.func.isRequired,
}

FluidDataWrappersClass.defaultProps = {
    static: false,
}
const FluidDataWrappers = FluidLogicHOC(FluidDataWrappersClass);

export  {FluidDataWrappers};
export default FluidDataWrappers;