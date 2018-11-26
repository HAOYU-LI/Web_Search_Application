import React from 'react';
import {QElement} from './PriorityQueue';
import { Icon, Input, AutoComplete } from 'antd';
import PriorityQueue from 'js-priority-queue';

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
        wordFrequency : []
    };



    searchResult = (value) => {
        /*
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
        */

        // PriorityQueue implementation with spark word count
        const result = [];
        const wordFrequency = this.props.wordFrequency;
        const pq = new PriorityQueue({ comparator: function(a, b) { return b.priority - a.priority; }, strategy: PriorityQueue.BHeapStrategy});
        for (let i = 0; i < wordFrequency.length; i ++) {
            let pair = wordFrequency[i].split(':');
            let element = pair[0];
            let priority = parseInt(pair[1]);
            if (startWith(element.toLocaleLowerCase(), value)) {
                //console.log(element);
                pq.queue(new QElement(element.toLocaleLowerCase(), priority));
            }
        }

        let count = 1;
        while(pq.length > 0 && count <= 10) {
            let PQele = pq.dequeue();
            result.push(PQele.element + " : prio=" + count );
            count ++;
        }

        return result;

    }


    onInputChange = (value) =>{
        console.log(value);
        this.setState({userInput : value});
        this.setState({
            dataSource: !value ? [] : this.searchResult(value)
        });
        console.log(this.searchResult(value))
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
