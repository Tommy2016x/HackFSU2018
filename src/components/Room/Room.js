import React,{Component} from "react";
import './Room.css'

class Room extends Component{
  render(){
    return(
        <div className="main">
        <h2 className="groupName" >Group name goes here</h2>
        <div>
        <button className="user"> User 1 </button>
        </div>
        <button className="newUser" >Create New User</button>
        </div>
    );
  }
}

export default Room;
