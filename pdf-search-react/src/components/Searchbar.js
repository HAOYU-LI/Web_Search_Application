import React from 'react';
import { Input } from 'antd';

const Search = Input.Search;
export class Searchbar extends React.Component {
    state= {
        userInput : 'Input search text',
    };

    onInputChange = (e) =>{
        this.setState({userInput : e.target.value});
    }

    on_search = () =>  {
        console.log(this.state.userInput);
        const strContent = this.state.userInput.toLocaleLowerCase().trim().split(/\s+/);
        //console.log(strContent);
        this.props.handleSearch(strContent);

    }

    render() {
        return (
            <div className = 'search_button'>
                <Search
                    placeholder= {this.state.userInput}
                    enterButton="Search"
                    size="large"
                    onChange = {this.onInputChange}
                    // onSearch={value => console.log(value)}
                    onSearch ={this.on_search}
                />
            </div>
        );
    }
}