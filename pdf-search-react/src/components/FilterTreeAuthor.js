import React from 'react';
import { Tree  } from 'antd';

const TreeNode = Tree.TreeNode;






const AuthorData = [{
    title: 'author',
    key: 'author',
    children: [{
        title: 'michael',
        key: 'michael',
    },
        {
            title: 'feifei Li',
            key: 'feifei Li',
        },
        {
            title: 'shmuel ',
            key: 'shmuel',
        },
        {
            title: 'Kaiming',
            key: 'Kaiming',
        },
        {
            title: 'Andrew Ng',
            key: 'Andrew Ng',
        },
        {
            title: 'Bengio',
            key: 'Bengio',
        },
        {
            title: 'deva',
            key: 'deva',
        },
        {
            title: 'aude',
            key: 'aude',
        },
        {
            title: 'walter',
            key: 'walter',
        },
        {
            title: 'ramin',
            key: 'ramin',
        },
        {
            title: 'eric',
            key: 'eric',
        },
        {
            title: 'william',
            key: 'william',
        },
        {
            title: 'ryan',
            key: 'ryan',
        },
        {
            title:'peter',
            key: 'peter',
        },


    ],
},
];




export class FilterTreeAuthor extends React.Component {
    state = {
        expandedKeys: [],
        autoExpandParent: true,
        checkedKeys: [],
        selectedKeys: [],
    }



    onExpand = (expandedKeys) => {
        console.log('onExpand', expandedKeys);
        // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.
        this.setState((prevState)=>{
            return {
                expandedKeys:expandedKeys,
                autoExpandParent: false,
            };
        });
    }



    onCheck = (checkedKeys) => {
        //console.log('onCheck', checkedKeys);
        this.setState((prevState)=>{
            return {
                checkedKeys: checkedKeys,
            }
        });
        this.props.getFilter(checkedKeys);
    }


    onSelect = (selectedKeys, info) => {
        console.log('onSelect', info);
        this.setState({ selectedKeys });
    }

    renderTreeNodes = (data) => {
        return data.map((item) => {
            if (item.children) {
                return (
                    <TreeNode title={item.title} key={item.title} dataRef={item}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode {...item} />;
        });
    }







    render() {




        return (
            <Tree
                checkable
                onExpand={this.onExpand}
                expandedKeys={this.state.expandedKeys}
                autoExpandParent={this.state.autoExpandParent}
                onCheck={this.onCheck}
                checkedKeys={this.state.checkedKeys}
                onSelect={this.onSelect}
                selectedKeys={this.state.selectedKeys}
            >

                {this.renderTreeNodes(AuthorData) }



            </Tree>


        );
    }
}