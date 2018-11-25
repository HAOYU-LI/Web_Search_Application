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
        const itemNumber = this.props.ids.length;

        return (
            <div className="item-list">
            <div className="return-results">
                Return {itemNumber} result!
            </div>
            <div >
                {items.slice(0,100)}
                </div>
            </div>
            )

    }
}



