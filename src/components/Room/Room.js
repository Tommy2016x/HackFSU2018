import React,{Component} from "react";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';
import Group from '../Group/Group';
import './Room.css';
import { Redirect } from 'react-router-dom';
import ReactPlaid, {SANDBOX_ENV, TRANSACTIONS_PRODUCT} from 'react-plaid';


class Room extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            title: '',
            users: [],
            open: false,
            auth: false,
        }
    }
    handleInputChange = (e) => {
        const target = e.target;
        const value = target.value;
        this.setState({ name: value });
    }

    handleOnSuccess = (token, metadata) => {
        axios.post(`http://localhost:3000/users/createUser`, {
            name: this.state.name, 
            group_id: this.props.location.state.stateName.group_id, 
            token: token,
        })
        .then((response) => {
            this.state.users.push(response.data[0]);
        })
        .catch((err) => {
            console.log(err);
        })
    }
    componentDidMount(){
        if(this.props.location.state.stateName.joinTitle.length !== 0)
        {
            this.setState({
                title: this.props.location.state.stateName.joinTitle,
            });
        }
        else if(this.props.location.state.stateName.createTitle.length !== 0) 
        {
            this.setState({
                title: this.props.location.state.stateName.createTitle
            })
        }
        else{
            this.setState({
                title: 'null'
            })
        }
        console.log(this.state.title);

        axios.get(`http://localhost:3000/users/getUser/${this.props.location.state.stateName.group_id}`)
        .then((response) => {
            console.log(response);
            this.setState({
                users: response.data
            });
        })
        .catch((err) => {
            console.log(err);
        })
    }

    render(){
    	const {title, name, users, open} = this.state;
    	if(this.state.auth)
    	{
	    	return <Redirect to={{
	        	pathname:'/',
	        
	      	}}/>
      	}
        return(
        	<div>
	        	<ul class="unorderlist">
	        	<li class="listelement"><a onClick={()=>{this.setState({auth:true})}} class="active atag" href="#home">Home</a></li>
	        	</ul>
	            <div className="main">
	            <img className="img" alt="no" src= {"https://personal-money-management.utah.edu/_images/money_icon.png"}/>
	                <h2 className="groupName" >{title}</h2>
	                <div>
	                </div>
	                <form onSubmit={(e) => {e.preventDefault()}}>
	                    <input type="text" placeholder="Name" value={name} onChange={this.handleInputChange}/>
	                    <button className="newUser" onClick={()=>{this.setState({open:true})}}> Add new user</button>
	                    <ReactPlaid
	                        apiKey="3b9cec9504c5fac79de585b8014e36"
	                        product= {["transactions"]}
	                        env={SANDBOX_ENV}
	                        clientName="plaidname"
	                        open={open}
	                        onSuccess={this.handleOnSuccess}
	                        onExit={() => {this.setState({open:false})}}
	                    /> 
	                </form>
	                <div>
	                    {users && 
	                    	users.map(user => user.transactions)
	                        .reduce((curr, next) => curr.concat(next), [])
	                        .filter((transaction) => transaction.category != null)
	                        .map((transaction, i) => {
	                        	let username;
	                        	if(users[i]){
	                        		username = users[i].name;
	                        	}                   
	                        	return (
	                        		<div>
	                        			<h1 className="userName"> {username} </h1>
	                        			<p className="category" key={i}>Categories: {transaction.category} <br/> Amount spent: {transaction.amount}</p>                 
	                    			</div>
	                    		)
	                        })
	                    }   
	                </div>
	            </div>
            </div>
        );
    }
}

export default Room;
