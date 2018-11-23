import React from 'react';
import { Item } from './Item';

export class ItemList extends React.Component {

    render() {
        // const items = [];
        console.log(this.props.ids);
        // this.props.ids.map(
        //     (id)=>{
        //    <item id={id}/>
        // });
        // this.props.ids.forEach(function(id){
        //     items.push(
        //         <Item key={id} id={id} />
        //     );
        // });
        const items = this.props.ids.map(
            (id)=>{
                return(<Item key={id} id={id}/>)
            });


        return (
            <div className="item-list">
                {items.slice(0,100)}
                </div>
            )

    }
}



