import React, {Component} from 'react';
import { StyleSheet, Text, View,Button,TextInput,ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {add,update,deleteOne, deleteAll,getData} from '../store/action/action'
import axios from 'axios'
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding:10
  },
  
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
    color:"green"
  },
  header:{
    padding:10,
    flexDirection:"row",
    alignItems:"flex-start"
  },
  input:{
    width:200,
    borderColor:"lightgray",
    borderWidth: 1,
  },
  table:{
    marginTop:10,
   
  },
  tableRow:{
    width:"95%",
    flex:1,
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"flex-start",
    padding:5,
  },
});


 class Todo extends Component{
  constructor(){
    super()
    this.state={
      todo:'',
      id:'',
      editing:false
     
    }
  }
   eventhandler=(text)=>{
    this.setState({
      todo:text
    })
  }

  add=()=>{
    if(this.state.todo !== ''){
    const todoObj={
      todo:this.state.todo
    }  
    this.props.add(todoObj);
      this.setState({
        todo:''
      })
    }
  }
  edit=(val,ind)=>{
    this.setState({
      todo:val.todo,
      id:val._id,
      index:ind,
      editing:true
    })
  }

  update=()=>{
    let todoObj={
      todo: this.state.todo,
      _id:this.state.id
    }
    let ind=this.state.index;
    this.props.update({todoObj,ind})
    this.setState({
      todo:'',
      index:'',
      editing:false
    })
  }

  delete=(ind,id)=>{
    this.props.delete(ind,id)
    this.setState({
      editing:false
    })
  }
  deleteAll=()=>{
    this.props.deleteAll();
    this.setState({
      editing:false
    })
  }

  componentDidMount(){
    this.props.getData(); 
  } 
 
  render() {
    return (
      // <Text style={styles.welcome}>Welcome to React Native Todo App!</Text>
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native Todo App!</Text>
         <View style={styles.header}>
          <TextInput name="todo" style={styles.input} value={this.state.todo} onChangeText={(text)=>this.eventhandler(text)} placeholder="Enter todo"/>
          {!this.state.editing ?
           <Button onPress={this.add} title="Add" color="green" />
           :
           <Button onPress={this.update} title="update"  color="orange"/>
          }
        </View>
         {(this.props.todos.length >1) && <Button title="Delete All Todos" color="red" onPress={this.deleteAll}/>}
        <ScrollView style={styles.table}>
          {this.props.todos.map((val, ind)=>
          <View key={ind} style={styles.tableRow}>
            <Text style={{flex:1, fontSize:20}}>{ind+1}.</Text>
            <Text style={{flex:2, fontSize:20}}>{val.todo}</Text>
            <Button style={{flex:1}} title="Edit" onPress={()=>this.edit(val,ind)} color="#0072ff"/>
            <Button style={{flex:1}} title="Delete"onPress={()=>this.delete(ind,val._id)} color="#ff6363"/>
          </View>
          )}
          </ScrollView>  
      </View>
    );
  }
}

 function mapStateToProps(state){
  return ({
      todos:state.root.todos
  })
}
function mapDispatchToProps(dispatch){
  return ({
      getData:()=> dispatch(getData()),
      add: (obj)=> dispatch(add(obj)),
      update:(obj)=> dispatch(update(obj)),
      delete:(ind,id)=> dispatch(deleteOne(ind,id)),
      deleteAll:()=>dispatch(deleteAll())
  })
} 

export default connect(mapStateToProps,mapDispatchToProps)(Todo)