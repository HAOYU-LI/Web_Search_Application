import React from 'react';
import { Radio } from 'antd';

const RadioGroup = Radio.Group;

export class Filter extends React.Component {
    state = {
        value: 1,
    }

    onChange = (e) => {
        this.setState({
            value: e.target.value,
        });
        this.props.filterChange(e.target.value);
    }

    render() {
        // const radioStyle = {
        //
        // };
        return (
            <RadioGroup onChange={this.onChange} value={this.state.value}>
                <Radio className= 'Radio' value={1}>All</Radio>
                <Radio className= 'Radio' value={2}>Title</Radio>
                <Radio className= 'Radio' value={3}>Author</Radio>
                <Radio className= 'Radio' value={4}>Conference</Radio>
                <Radio className= 'Radio' value={5}>Year</Radio>


            </RadioGroup>
        );
    }
}
