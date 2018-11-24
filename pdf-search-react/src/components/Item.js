import React from 'react';
import { API_ROOT,pdf_params } from '../constants'


export class Item extends React.Component {
    state={
        item : {},
    }

    componentDidMount() {
        this.SearchById(this.props.id);
    }

    SearchById = (id) =>{
            return fetch(`${API_ROOT}/${pdf_params}/${id}.json`, {
                method: 'GET',
            }).then((response) => {
                if (response.ok) {
                    return response.json();
                }
            }).then((data) => {
                // console.log(data);
                this.setState({item:data});

            }).catch((e) => {
                console.log(e.message);
                this.setState({error: e.message});
            })

    }
    render() {
        return (
            <li className = 'item'>
                <p>Title : {this.state.item.title}</p>
                <p>Author : {this.state.item.author}</p>
                <p>Pages : {this.state.item.pages}</p>
                <p>Conference : {this.state.item.subject}</p>
                <p>Year : {this.state.item.year}</p>
                <a href = {this.state.item.links} target='_blank' >Link : pdf </a>

            </li>
        );
    }
}