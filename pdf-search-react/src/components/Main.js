import React from 'react';
import { Searchbar } from  './Searchbar';
import { ItemList } from  './ItemList';
import { FilterTreeTitle} from  './FilterTreeTitle';
import { FilterTreeYear } from  './FilterTreeYear';
import { FilterTreeAuthor } from  './FilterTreeAuthor';
import {API_ROOT, index_params, title_params, author_params, conference_params, year_params, word_priority} from '../constants';


export class Main extends React.Component {

    state={
        userInput : [],
        indexAll:{},
        indexTitle:{},
        indexAuthor:{},
        indexConference:{},
        indexYear:{},
        wordPriority:{},
        FilterOption: 1,
        FilterAuthor: [],
        FilterTitle: [],
        FilterConference: [],
        FilterYear: []
        // ids:[],
    }


    componentWillMount() {
        this.loadIndexAll();
        this.loadIndexTitle();
        this.loadIndexAuthor();
        this.loadIndexConference();
        this.loadIndexYear();
        this.loadWordPriority();
    }

    loadIndexAll = () => {
        return fetch(`${API_ROOT}/${index_params}.json`, {
            method: 'GET',
        }).then((response) => {
            if (response.ok) {
                return response.json();
            }
        }).then((data) => {
            //console.log(data);
            this.setState({indexAll: data});

        }).catch((e) => {
            console.log(e.message);
            this.setState({error: e.message});
        });
    }

    loadWordPriority = () => {
        return fetch(`${API_ROOT}/${word_priority}.json`, {
            method: 'GET',
        }).then((response) => {
            if (response.ok) {
                return response.json();
            }
        }).then((data) => {
            //console.log(data);
            this.setState({wordPriority: data});

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
            //console.log(data);
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
            //console.log(data);
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
            //console.log(data);
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
            //console.log(data);
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
        for( let i = inputWordLength+2; i>0;i--){
            for(let [key, value] of cnt){
                if(value >= i){
                    ids.push(key);
                    cnt.delete(key);
                }
            }
        }


        const yearID = this.ReturnYearId(this.state.FilterYear);
        const AuthorID = this.ReturnAuthorId(this.state.FilterAuthor);
        const KeyID = this.ReturnKeywordsId(this.state.FilterTitle);

        if (yearID.length == 0 && AuthorID.length == 0 && KeyID.length == 0){ return <ItemList ids ={ids} pageNum = {1}/> }


        let yearSet   = new Set(yearID);
        let authorSet = new Set(AuthorID);
        let keySet = new Set(KeyID);



        let intersection =  (AuthorID.length != 0 && yearID.length != 0) ? [...new Set([...yearID].filter(x => authorSet.has(x)))] : [...new Set([...yearSet,...authorSet])];
        console.log(intersection);
        console.log(keySet);
        let intersecSet = new Set(intersection);
        intersection =  (KeyID.length != 0 && intersection.length != 0 ) ? [...new Set([...intersection].filter(x => keySet.has(x)))] : [...new Set([...intersecSet,...keySet])];
        console.log(intersection);


        let searchSet = new Set(ids);

         intersection =  (intersection.length == 0) ? [] : [...new Set([...intersection].filter(x => searchSet.has(x)))];

        console.log(intersection);



        //console.log(ids);
        return <ItemList ids ={intersection} pageNum = {1}/>
    }

    ListItem = () => {
        //console.log(this.state.FilterOption);
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

    // filterChange = (value) => {
    //
    //     this.setState((prevState) => {
    //         return{
    //             FilterOption : value
    //         };
    //     });
    //
    // }
    getTitleFilter = (value) =>{
        console.log(value);
        this.setState({FilterTitle:value});

    }

    getAuthorFilter = (value) =>{
        console.log(value);
        this.setState({FilterAuthor:value});

    }
    getConferenceFilter = (value) =>{
        console.log(value);
        this.setState({FilterConference:value});

    }
    getYearFilter = (value) =>{
        console.log(value);
        this.setState({FilterYear:value});

    }



    ReturnYearId = (value) =>{
        //console.log(value);
        const ids = [];
        // console.log(pdfIndex);

        const pdfIndex = this.state.indexYear;

        for(let word of value.values()){
            //console.log(word);
            for(let k in pdfIndex){
                if (k == word) {
                    for(let id of pdfIndex[k].values()){
                        //console.log(id);
                       ids.push(id);
                    }
                }
            }
        }
        //console.log(ids);
        return ids;
    }


    ReturnAuthorId = (value) =>{
        //console.log(value);
        const ids = [];
        // console.log(pdfIndex);

        const pdfIndex = this.state.indexAuthor;

        for(let words of value.values()){
            //console.log(word);
            for (let word of words.split(' ').values()){
                for(let k in pdfIndex){
                    if (k == word.toLocaleLowerCase()) {
                        for(let id of pdfIndex[k].values()){
                            // console.log(id);
                            ids.push(id);
                        }
                        break;
                    }
                }
            }
        }
       // console.log(ids);
        return ids;
    }

    ReturnKeywordsId = (value) =>{
        //console.log(value);
        const ids = [];
        // console.log(pdfIndex);

        const pdfIndex = this.state.indexTitle;

        for(let word of value.values()){
            console.log(word);
            for(let k in pdfIndex){
                if (k == word) {
                    for(let id of pdfIndex[k].values()){
                         console.log(id);
                        ids.push(id);
                    }
                }
            }
        }
        // console.log(ids);
        return ids;
    }
    //
    // getIntersectionIndex = (category_Index) => {
    //     // category_Index = {"author" : [...], "title" : [...]}
    //     const count = category_Index.size;
    //     const result = new Map();
    //     const lst = [];
    //     let index = 0;
    //     for (let category in category_Index) {
    //         let cur_list = category_Index.get(category);
    //         for ( let i = 0; i < cur_list.length; i ++) {
    //             if (index == 0) {
    //                 result.set(cur_list[i], 1);
    //             } else {
    //                 if (result.has(cur_list[i])) {
    //                     result.set(cur_list[i], result.get(cur_list[i]) + 1);
    //                 }
    //             }
    //         }
    //         index += 1;
    //     }
    //
    //     for (let key in result) {
    //         if (result.get(key) == count) {
    //             lst.push(key);
    //         }
    //     }
    //
    //     console.log(lst);
    //
    //     return lst;
    // }

    render(){
        return (
            <div className="main">

                <Searchbar handleSearch={this.handleSearch} dataSource = {this.state.indexTitle} wordFrequency = {this.state.wordPriority}/>
                <div className="item-section">
                    <nav className = "radio-group">
                        <FilterTreeTitle
                            // filterChange={this.filterChange}
                            name = 'title'
                            input = {this.state.userInput}
                            Index = {this.state.indexTitle}
                            getFilter = {this.getTitleFilter}
                        />

                        <FilterTreeAuthor
                           // filterChange={this.filterChange}
                            input = {this.state.userInput}
                            Index = {this.state.indexAuthor}
                            getFilter = {this.getAuthorFilter}
                        />
                        {/*<FilterTree*/}
                            {/*name = 'conference'*/}
                            {/*// filterChange={this.filterChange}*/}
                            {/*input = {this.state.userInput}*/}
                            {/*Index = {this.state.indexConference}*/}
                            {/*getFilter = {this.getConferenceFilter}*/}
                        {/*/>*/}
                        <FilterTreeYear
                            // filterChange={this.filterChange}
                            input = {this.state.userInput}
                            Index = {this.state.indexYear}
                            getFilter = {this.getYearFilter}
                        />
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
