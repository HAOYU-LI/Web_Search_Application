import React from 'react';
import { Tree  } from 'antd';

const TreeNode = Tree.TreeNode;


const YearData = [{
    title: 'year',
    key: 'year',
    children: [{
        title: '2014',
        key: '2014',
    },
        {
            title: '2015',
            key: '2015',
        },
        {
            title: '2016',
            key: '2016',
        },
        {
            title: '2017',
            key: '2017',
        },
        {
            title: '2018',
            key: '2018',
        },
    ],
},
];



const AuthorData = [{
    title: 'author',
    key: 'author',
    children: [{
        title: '2014',
        key: '2014',
    },
        {
            title: '2015',
            key: '2015',
        },
        {
            title: '2016',
            key: '2016',
        },
        {
            title: '2017',
            key: '2017',
        },
        {
            title: '2018',
            key: '2018',
        },
    ],
},
];

// const returnValue = {title:[],author:[]};


export class FilterTreeYear extends React.Component {
    state = {
        expandedKeys: [],
        autoExpandParent: true,
        checkedKeys: [],
        selectedKeys: [],
    }


    // ListTree = () => {
    //     const input  = this.props.input;
    //     //console.log(input);
    //     const titleIndex = this.props.Index;
    //     //console.log(titleIndex);
    //     const result  = [];
    //     for(let word of input.values()){
    //         //console.log(word);
    //         for(let k in titleIndex){
    //             //console.log(k);
    //             if (k.startsWith(word)){
    //                 result.push(k)
    //             }
    //         }
    //     }
    //     //console.log(result);
    //
    //
    //     const treeTitle = [{
    //         title: this.props.name,
    //         key: this.props.name,
    //         children: result.map((item) => {
    //             return {title:item ,key :item }
    //         })
    //     },
    //     ];
    //     //console.log(treeTitle);
    //     return treeTitle;
    //
    // }







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

                    {this.renderTreeNodes(YearData) }

                    

                </Tree>


        );
    }
}