import React,{Component} from "react";
import {Button,Grid,Row,Col} from 'react-bootstrap';
import './Group.css';
import {fadeIn} from 'react-animations'
import { bounce } from 'react-animations';
import Radium, {StyleRoot} from 'radium';

class Group extends Component{
  render(){
    let categoryOptions
    return (
      <div className="Entire">
      <img class="img" src= {"https://personal-money-management.utah.edu/_images/money_icon.png"}/>
        <h1 className="header">Cash Check</h1>
        <p class= "description" >A tool to keep those near you in check</p>
        <div>
            <input className="btn1" type="text" ref="title" placeholder="Enter group name" />
          <button className="btn2" >Create Group</button>
          </div >
          <div>
        <button className="OtherButton">Join existing Group</button>
        </div>
      </div>
    );
  }
}

export default Group;
