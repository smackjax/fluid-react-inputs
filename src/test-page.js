import React, {Component} from 'react';
import {
    flatten,
    unflatten
} from 'flat';
import {
    NameInput,
    EmailInput,
    DateInput,
    OnlyNumsInput,
    StaticExampleInput,
} from './fluid-inputs';

import {
    AddressCompositeInput,
    RiddleCompositeInput,
} from './fluid-composite-inputs';

class TestPage extends Component {
    state={
        // Holds the data for all inputs
        data: {}
    }

    // I nested the data object to demonstrate the dot notation
    updateData=(saveObj)=>{
        console.log("SAVED VALS OBJ: ", saveObj);
        const updatedData = 
            unflatten({
                ...flatten(this.state.data),
                ...flatten(saveObj)
            });
        this.setState({
            data: updatedData
        })
    }

    render(){
        const {data} = this.state;
        return (
            <div>
                <div>
                    <h2>Singular Inputs</h2>
                    <NameInput 
                    handleSave={this.updateData}
                    saveKey='name'
                    defaultValue={data.name || ''}
                    />

                    <EmailInput 
                    handleSave={this.updateData}
                    saveKey='email'
                    defaultValue={data.email || ''}
                    />

                    <DateInput 
                    handleSave={this.updateData}
                    saveKey='date'
                    defaultValue={data.date || ''}
                    />

                    <OnlyNumsInput 
                    handleSave={this.updateData}
                    saveKey='customKey.onlyNums'
                    defaultValue={(data.customKey && data.customKey.onlyNums) || ''}
                    />

                    <StaticExampleInput 
                    defaultValue="I'm invincible"
                    />
                </div>

                <div>
                    <h2>Composite Inputs</h2>
                    <AddressCompositeInput 
                    defaultValues={data.address || {}}
                    // Parent save key, because it's composite
                    saveKey='address'
                    handleSave={this.updateData}
                    />

                    <RiddleCompositeInput 
                    defaultValues={data.riddle || {}}
                    // Parent save key, because it's composite
                    saveKey='riddle'
                    handleSave={this.updateData}
                    />
                </div>
            </div>
        )
    }
}

export {TestPage};
export default TestPage;