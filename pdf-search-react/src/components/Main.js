import React from 'react';
import { Searchbar } from  './Searchbar';
import { ItemList } from  './ItemList';
import { Filter } from  './Filter';
import {API_ROOT, index_params, title_params, author_params, conference_params, year_params} from '../constants';


export class Main extends React.Component {

    state={
        userInput : [],
        indexAll:{},
        indexTitle:{},
        indexAuthor:{},
        indexConference:{},
        indexYear:{},
        FilterOption: 1,
        // ids:[],

    }


    componentWillMount() {
        this.loadIndexAll();
        this.loadIndexTitle();
        this.loadIndexAuthor();
        this.loadIndexConference();
        this.loadIndexYear();
    }

    loadIndexAll = () => {
        return fetch(`${API_ROOT}/${index_params}.json`, {
            method: 'GET',
        }).then((response) => {
            if (response.ok) {
                return response.json();
            }
        }).then((data) => {
            console.log(data);
            this.setState({indexAll: data});

        }).catch((e) => {
            console.log(e.message);
            this.setState({error: e.message});
        });
    }
    loadIndexTitle = () => {
        return fetch(`${API_ROOT}/${title_params}.json`, {
            method: 'GET',
        }).then((response) => {
            if (response.ok) {
                return response.json();
            }
        }).then((data) => {
            console.log(data);
            this.setState({indexTitle: data});

        }).catch((e) => {
            console.log(e.message);
            this.setState({error: e.message});
        });
    }
    loadIndexAuthor = () => {
        return fetch(`${API_ROOT}/${author_params}.json`, {
            method: 'GET',
        }).then((response) => {
            if (response.ok) {
                return response.json();
            }
        }).then((data) => {
            console.log(data);
            this.setState({indexAuthor: data});

        }).catch((e) => {
            console.log(e.message);
            this.setState({error: e.message});
        });
    }
    loadIndexConference = () => {
        return fetch(`${API_ROOT}/${conference_params}.json`, {
            method: 'GET',
        }).then((response) => {
            if (response.ok) {
                return response.json();
            }
        }).then((data) => {
            console.log(data);
            this.setState({indexConference: data});

        }).catch((e) => {
            console.log(e.message);
            this.setState({error: e.message});
        });
    }
    loadIndexYear = () => {
        return fetch(`${API_ROOT}/${year_params}.json`, {
            method: 'GET',
        }).then((response) => {
            if (response.ok) {
                return response.json();
            }
        }).then((data) => {
            console.log(data);
            this.setState({indexYear: data});

        }).catch((e) => {
            console.log(e.message);
            this.setState({error: e.message});
        });
    }



    searchByIndex= (pdfIndex) =>{
        console.log(this.state.userInput);
        const inputArray = this.state.userInput;
        const inputWordLength = this.state.userInput.length;
        const ids = [];
        // console.log(pdfIndex);
        const cnt =  new Map();


        for(let word of inputArray.values()){
            console.log(word);
            for(let k in pdfIndex){
                if (k.startsWith(word)){
                    for(let id of pdfIndex[k].values()){
                       //console.log(id);
                       if(cnt.has(id)){
                           cnt.set(id,cnt.get(id)+1);
                       }
                       else{
                           cnt.set(id,1);
                       }
                    }
                }
            }
        }
        //console.log(cnt);

        for( let i = inputWordLength; i>0;i--){
            for(let [key, value] of cnt){
                if(value == i){
                    ids.push(key);
                }
            }
        }

        return <ItemList ids ={ids}/>
    }

    ListItem = () => {
        console.log(this.state.FilterOption);
        switch (this.state.FilterOption) {
            case 1:
                return this.searchByIndex(this.state.indexAll);
                break;
            case 2:
                return this.searchByIndex(this.state.indexTitle);
                break;
            case 3:
                return this.searchByIndex(this.state.indexAuthor);
                break;
            case 4:
                return this.searchByIndex(this.state.indexConference);
                break;
            case 5:
                return this.searchByIndex(this.state.indexYear);
                break;

        }
    }




    handleSearch = (value) => {
        this.setState((prevState) => {
            return{
                userInput : value
            };
        });
    }

    filterChange = (value) => {

        this.setState((prevState) => {
            return{
                FilterOption : value
            };
        });

    }



    render() {
        return (
            <div className="main">

                <Searchbar handleSearch={this.handleSearch} dataSource = {this.state.indexTitle}/>
                <div className="item-section">
                    <nav className = "radio-group">
                        <Filter  filterChange={this.filterChange}/>
                    </nav>
                    {(this.state.userInput.length == 0 )
                        ? null :
                        <div className="item-list">{this.ListItem()}</div>
                    }
                </div>
            </div>
        );
    }



}
