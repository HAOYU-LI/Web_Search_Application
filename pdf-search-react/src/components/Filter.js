import React from 'react';
import { Tree  } from 'antd';

//const RadioGroup = Radio.Group;

// export class Filter extends React.Component {
//     state = {
//         value: 1,
//     }
//
//     onChange = (e) => {
//         this.setState({
//             value: e.target.value,
//         });
//         this.props.filterChange(e.target.value);
//     }
//
//     render() {
//         // const radioStyle = {
//         //
//         // };
//         return (
//             <RadioGroup onChange={this.onChange} value={this.state.value}>
//                 <Radio className= 'Radio' value={1}>All</Radio>
//                 <Radio className= 'Radio' value={2}>Title</Radio>
//                 <Radio className= 'Radio' value={3}>Author</Radio>
//                 <Radio className= 'Radio' value={4}>Conference</Radio>
//                 <Radio className= 'Radio' value={5}>Year</Radio>
//
//
//             </RadioGroup>
//         );
//     }
// }
const TreeNode = Tree.TreeNode;




// const returnValue = {title:[],author:[]};


export class Filter extends React.Component {
    state = {
        expandedKeysTitle: [],
        expandedKeysAuthor: [],
        autoExpandParentTitle: true,
        autoExpandParentAuthor: true,
        checkedKeysTitle: [],
        checkedKeysAuthor: [],
        selectedKeys: [],
        ReturnTitle: {},
        ReturnAuthor: {},

    }

    titleList = () => {
        const input  = this.props.input;
        //console.log(input);
        const titleIndex = this.props.titleIndex;
        //console.log(titleIndex);
        const result  = [];
        for(let word of input.values()){
            //console.log(word);
            for(let k in titleIndex){
                //console.log(k);
                if (k.startsWith(word)){
                      result.push(k)
                }
            }
        }
        //console.log(result);


        const treeTitle = [{
            title: 'title',
            key: 'title',
            children: result.map((item) => {
                return {title:item ,key :item }
            })
        },
        ];
       // console.log(treeTitle);
        return treeTitle;

    }


    authorList = () => {
        const input  = this.props.input;
        //console.log(input);
        const titleIndex = this.props.authorIndex;
        //console.log(titleIndex);
        const result  = [];
        for(let word of input.values()){
            //console.log(word);
            for(let k in titleIndex){
                //console.log(k);
                if (k.startsWith(word)){
                    result.push(k)
                }
            }
        }
        //console.log(result);


        const treeTitle = [{
            title: 'author',
            key: 'author',
            children: result.map((item) => {
                return {title:item ,key :item }
            })
        },
        ];
         //console.log(treeTitle);
        return treeTitle;

    }





    onExpandTitle = (expandedKeys) => {
        console.log('onExpandTile', expandedKeys);
        // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.
        this.setState((prevState)=>{
            return {
                expandedKeysTile:expandedKeys,
                autoExpandParentTitle: false,
            };
        });
    }

    onExpandAuthor = (expandedKeys) => {
        console.log('onExpandAuthor', expandedKeys);
        // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.
        this.setState((prevState)=>{
            return {
                expandedKeysAuthor:expandedKeys,
                autoExpandParentAuthor: false,
            };
        });
    }

    onCheckTitle = (checkedKeys) => {
        console.log('onCheckTitle', checkedKeys);
        this.setState((prevState)=>{
            return {
                checkedKeysTitle: checkedKeys,
                returnValue: {key:this.state.expandedKeys,value:this.state.checkedKeys},
            }

        });
        this.props.getFilter(this.state.returnTitle);


    }

    onCheckAuthor = (checkedKeys) => {
        console.log('onCheckAuthor', checkedKeys);
        this.setState((prevState)=>{
            return {
                checkedKeysAuthor: checkedKeys,
                returnValue: {key:this.state.expandedKeys,value:this.state.checkedKeys},
            }

        });
        this.props.getFilter(this.state.returnAuthor);


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
            <div>
            <Tree
                checkable
                onExpand={this.onExpandTitle}
                expandedKeys={this.state.expandedKeysTitle}
                autoExpandParent={this.state.autoExpandParentTitle}
                onCheck={this.onCheck}
                checkedKeys={this.state.checkedKeys}
                onSelect={this.onSelect}
                selectedKeys={this.state.selectedKeys}
            >
                {this.renderTreeNodes(this.titleList())}
            </Tree>
                <Tree
                    checkable
                    onExpand={this.onExpandAuthor}
                    expandedKeys={this.state.expandedKeys}
                    autoExpandParent={this.state.autoExpandParentAuthor}
                    onCheck={this.onCheck}
                    checkedKeys={this.state.checkedKeys}
                    onSelect={this.onSelect}
                    selectedKeys={this.state.selectedKeys}
                >
                    {this.renderTreeNodes(this.authorList())}
                </Tree>
                {/*<Tree*/}
                    {/*checkable*/}
                    {/*onExpand={this.onExpand}*/}
                    {/*expandedKeys={this.state.expandedKeys}*/}
                    {/*autoExpandParent={this.state.autoExpandParent}*/}
                    {/*onCheck={this.onCheck}*/}
                    {/*checkedKeys={this.state.checkedKeys}*/}
                    {/*onSelect={this.onSelect}*/}
                    {/*selectedKeys={this.state.selectedKeys}*/}
                {/*>*/}
                    {/*{this.renderTreeNodes(treeData)}*/}
                {/*</Tree>*/}
                {/*<Tree*/}
                    {/*checkable*/}
                    {/*onExpand={this.onExpand}*/}
                    {/*expandedKeys={this.state.expandedKeys}*/}
                    {/*autoExpandParent={this.state.autoExpandParent}*/}
                    {/*onCheck={this.onCheck}*/}
                    {/*checkedKeys={this.state.checkedKeys}*/}
                    {/*onSelect={this.onSelect}*/}
                    {/*selectedKeys={this.state.selectedKeys}*/}
                {/*>*/}
                    {/*{this.renderTreeNodes(treeData)}*/}
                {/*</Tree>*/}
            </div>
        );
    }
}