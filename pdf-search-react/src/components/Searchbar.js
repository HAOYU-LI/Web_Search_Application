import React from 'react';
import { Icon, Input, AutoComplete } from 'antd';

// const Search = Input.Search;
const Option = AutoComplete.Option;


function startWith(k, value) {
    if (k.length >= value.length) {
        return k.startsWith(value);
    }
    return false;
}

export class Searchbar extends React.Component {
    state= {
        userInput : 'Input search text',
        dataSource: [],
    };



    searchResult = (value) => {
        let count = 0;
        const result = [];
        const dataSource = this.props.dataSource;
        console.log(dataSource);
        for (let k in dataSource) {
            if (startWith(k, value)) {
                result.push(k)
                count += 1;
            }

            if (count >= 8) {
                break;
            }
        }

        return result;
    }


    onInputChange = (value) =>{
        console.log(value);
        this.setState({userInput : value});
        this.setState({
            dataSource: !value ? [] : this.searchResult(value)
        });
    }

    onSearch = () =>  {
        console.log(this.state.userInput);
        const strContent = this.state.userInput.toLocaleLowerCase().trim().split(/\s+/);
        //console.log(strContent);
        this.props.handleSearch(strContent);

    }

    onSelect = (value) =>{
        console.log("select");
    }




    render() {
        const dataIndex =  this.props.datasource;


        //
        // const options = dataIndex.map(item => (
        //
        //     <Option className="show-all" key={item.index} value={"word"} >
        //         <p>
        //             {item.key}
        //         </p>
        //     </Option>
        //     )
        // );


        return (

            <div className="search_button">
                <AutoComplete
                    className="certain-category-search"
                    dropdownClassName="certain-category-search-dropdown"
                    dropdownmatchselectwidth={true}
                    size="large"
                    dataSource={this.state.dataSource}
                    placeholder={this.state.userInput}
                    optionLabelProp="value"
                    onSelect={this.onSelect}
                    onChange={this.onInputChange}
                    onSearch={this.handleSearch}
                >
                    <Input  suffix={<Icon onClick={this.onSearch} type="search" className="certain-category-icon" />} />
                </AutoComplete>
            </div>
        );
    }
}



{/*<Search*/}
{/*placeholder= {this.state.userInput}*/}
{/*enterButton="Search"*/}
{/*size="large"*/}
{/*onChange = {this.onInputChange}*/}

{/*onSearch ={this.on_search}*/}
{/*/>*/}
