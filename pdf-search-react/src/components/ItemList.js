import React from 'react';
import { Item } from './Item';
import { Pagination } from 'antd';


export class ItemList extends React.Component {
    state = {
        current: 1,
    }

    componentWillReceiveProps(){
        this.setState({current : 1});
    }

    onChange = (page) => {
        this.setState({
            current: page,
        });

    }
    render() {
        // const items = [];
        console.log(this.props.ids);
        const itemNumber = this.props.ids.length;
        const items = this.props.ids.map(
            (id)=>{
                return(<Item key={id} id={id} />)
            });
        const itemNumber = this.props.ids.length;

        return (
            <div className="item-list">

                <div className="return-results">
                    Return {itemNumber} result!
                </div>
                <Pagination current={this.state.current} onChange={this.onChange} pageSize={100} total={itemNumber} />
                <div >
                    {items.slice(this.state.current * 100 -100 ,this.state.current * 100)}
                </div>




            </div>
        )

    }
}



