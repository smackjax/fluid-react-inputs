import React, {Component} from 'react';
import PropTypes from 'prop-types';

const initialState={
    editing: false,
    data: {},
    errorMsg: '',
}
const FluidLogicHOC = (WrappedComponent)=>{
    class FluidLogicClass extends Component {
        state={...initialState}
        
        componentDidMount(){
            if(this.props.editOnMount) this.startEditing();
        }

        handleChange=(saveKey, changes)=>{
            if(changes.errorMsg) changes.invalid = true;
            const data = {
                ...this.state.data, 
                [saveKey] : changes
            };
            const errorMsg = (changes.errorMsg || this.getNextErrorMsg(saveKey));

            this.setState({
                data, 
                errorMsg
            });
        }

        // Looks for errors in save data
        getNextErrorMsg=(notThisKey)=>{
            const keys = Object.keys(this.state.data);
            let errorMsg = '';
            keys.forEach(key=>{
                if(key!== notThisKey && this.state.data[key].errorMsg){
                    errorMsg = this.state.data[key].errorMsg;
                }
            })
            return errorMsg;            
        }

        /* Key checks handle 'enter' and 'tab' functionality */
        // Disables tabbing completely
        keyCheckDisabledTab=(e)=>{
            this.masterKeyCheck(e, false, true);
        }
        // Doesn't run save function when tabbed
        keyCheckTabSave=(e)=>{
            this.masterKeyCheck(e, true);
        }
        // Only catches 'enter'
        keyCheckOnlyEnter=(e)=>{
            this.masterKeyCheck(e);
        }
        masterKeyCheck=(e, saveOnTab, disableTab)=>{
            const lKey = e.key.toLowerCase();
            if(lKey === 'enter') return this.handleSave();
            if(lKey === 'tab'){
                if(disableTab) return e.preventDefault();
                if(saveOnTab) return this.handleSave();
            }
        }

        // Switches input into editing mode
        startEditing=()=>{
            this.setState({ editing: true })
        }
        handleSave=()=>{
            // Get edited value
            const { data, errorMsg } = this.state;

            // Don't allow save if there is an error
            if(errorMsg) return false;

            // Blur active input
            if(document.activeElement) document.activeElement.blur();

            // Extract new values under their saveKeys
            const saveObj = {};
            for(const saveKey in data){
                saveObj[saveKey] = data[saveKey].value;
            }
            // Reset state
            this.setState({
                ...initialState
            }, ()=>{
                // Pass changed values to save handling function
                this.props.onSave(saveObj);
            });
        }
        handleCancel=()=>{
            this.setState({ ...initialState });
        }

        
        doNothing = ()=>{}
        render(){
            return (
                <WrappedComponent
                {...this.props}
                editing={this.state.editing}
                errorMsg={this.state.errorMsg}
                currentData={this.state.data}
                
                keyCheckTabSave={this.keyCheckTabSave}
                keyCheckDisabledTab={this.keyCheckDisabledTab}
                keyCheckOnlyEnter={this.keyCheckOnlyEnter}

                startEditing={!this.state.editing ? this.startEditing : this.doNothing}
                handleChange={this.handleChange}
                handleSave={this.handleSave}
                handleCancel={this.handleCancel}
                />
            )
        }
    }

    FluidLogicClass.propTypes={
        onSave: PropTypes.func.isRequired,
        editOnMount: PropTypes.bool,
        
    };
    
    return FluidLogicClass;
}

export {FluidLogicHOC};
export default FluidLogicHOC;