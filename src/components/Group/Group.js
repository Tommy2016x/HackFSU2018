import React,{Component} from "react";
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import './Group.css';

class Group extends Component{
  constructor(props){
    super(props);
    this.state = {
      auth:false,
      group_id: '',
      createTitle:'',
      joinTitle: '',
    }
    // this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleNewChange = this.handleNewChange.bind(this);
    this.handleJoinSubmit = this.handleJoinSubmit.bind(this);
  }
  handleInputChange = (e) => {
      const target = e.target;
      const value = target.value;
      const name = target.name;
      this.setState({ [name]: value });
  }
  // handleChange(event) {
  //   if(event.target.value.length>0)
  //   {
  //     this.setState({title: event.target.value});
  //   }
  // }
  // handleNewChange(event){
  //   if(event.target.value.length>0)
  //   {
  //     this.setState({joinTitle: event.target.value});
  //   }  
  // }
  handleSubmit(event) {
    event.preventDefault();
    if(this.state.createTitle.length>0)
    {
      axios.post(`http://localhost:3000/groups/createGroup/${this.state.createTitle}`)
      .then((response)=>{
        this.setState({
          group_id: response.data[0]._id,
          auth:true
        })
      })
      .catch((err)=>{
        console.log(err);
      });
    } else {
      alert('Please enter a group name.')
    }
  }
  handleJoinSubmit(event){
    event.preventDefault();
    if(this.state.joinTitle.length>0)
    {
      axios.get(`http://localhost:3000/groups/getGroup/${this.state.joinTitle}`)
      .then((response) => {
        this.setState({
          group_id:response.data._id,
          auth:true,
        })
      })
      .catch((err) => {
        console.log(err);
      })
    }
  }

  render(){
    if(this.state.auth){
      return <Redirect to={{
        pathname:'/room',
        state: {stateName: this.state}
      }}/>
    }
    return (
      <div className="Entire">
      <img className="img" alt="no" src= {"https://personal-money-management.utah.edu/_images/money_icon.png"}/>
        <h1 className="header">Cash Check</h1>
        <p className= "description" >A tool to keep those near you in check</p>
        <form onSubmit={this.handleSubmit} className="formOne">
          <input className="btn1" type="text" onChange={this.handleInputChange} ref="title" value={this.state.createTitle} placeholder="create group"  name="createTitle"/>
          <button className="btn2" >Create Group</button>
        </form>
        <form onSubmit={this.handleJoinSubmit}>
          <input className="btn1" type="text" onChange={this.handleInputChange} value={this.state.joinTitle} ref="title" placeholder="join a group"  name="joinTitle"/>
          <button className="OtherButton">Join Group</button>
        </form>
      </div>
    );
  }
}

export default Group;
