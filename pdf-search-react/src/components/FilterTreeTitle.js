import React from 'react';
import { Tree  } from 'antd';

const TreeNode = Tree.TreeNode;






const Data = [{
    title: 'frequent terminology',
    key: 'keywords',
    children: [{
        title: 'recognition',
        key: 'recognition',
    },
        {
            title: 'classification',
            key: 'classification',
        },
        {
            title: 'segmentation',
            key: 'segmentation',
        },
        {
            title: 'signal',
            key: 'signal',
        },
        {
            title: 'image',
            key: 'image',
        },

        {
            title: 'networks',
            key: 'networks',
        },
        {
            title: 'processing',
            key: 'processing',
        },
        {
            title: 'estimation',
            key: 'estimation',
        },
        {
            title: 'sensor',
            key: 'sensor',
        },
        {
            title: 'imaging',
            key: 'imaging',
        },
        {
            title: 'optimization',
            key: 'optimization',
        },
        {
            title: 'deep',
            key: 'deep',
        },



    ],
},
];




export class FilterTreeTitle extends React.Component {
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

                {this.renderTreeNodes(Data) }



            </Tree>


        );
    }
}