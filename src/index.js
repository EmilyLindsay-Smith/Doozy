import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


function ControlledInput(props) {
    return(
      <div>
	<input placeholder = 'Your Name' value = {props.input} onKeyDown={props.onChange}/>
      </div>
    );
}


class ControlledForm extends React.Component{
  constructor(props){
    super(props);
   }
   

  render() {
    const items = this.props.submit;
    const listCategories = [...new Set(items.map((item,index) => item[0]))];
    const listLength = listCategories.length
    const htmlOutput =  []
    for (let i = 0; i < listCategories.length; i++) {
	const lists = items.filter((item,index) => item[0] == listCategories[i])
        const listItems = lists.map(
          (item, index) => 
          <li key={index} className='listItemClass'>
          {item[1]}
          <button className='delete' value={item} onClick={this.props.onClick}> x </button>
          </li>
          );
                    
    	const htmlItems = (
		<div>
    		<h2> Doozy List: {listCategories[i]} </h2>
    		<ul> {listItems} </ul>
		</div>
    		)
    	 htmlOutput.push(htmlItems);
     };

   const tasks = document.querySelectorAll('.listItemClass');
   tasks.forEach(task => {
     task.addEventListener('click', function (event) {
	task.classList.add('checked')
	//task.setAttribute('style', 'text-decoration: line-through; color:silver; background-color: gray');
	//task.className={task.className == "listItemClass" ? "listItemClass checked" : "listItemClass"};
	//console.log("toggle")
	//task.toggleClass('checked')
	/*
        if (task.classList.length == 1){
          console.log('not present')
	  task.classList.add('checked')
        }else{
          console.log('prepsent')
          */
  	 // task.classList.remove('checked')
  	
       });
       });

    return(
     <div>
      <form onSubmit={this.props.onSubmit}>
        <input 
          class= 'inputtask'
      	  placeholder = 'Category: To Do List Item'
          value = {this.props.value} 
          onChange = {this.props.onChange}
         />
        <button class='submit' type='submit'>
          Submit!
        </button>
      </form>
	{htmlOutput}
      </div>
	
      );
    
          
    };

}

class ToDoItem extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name : 'TestName',
      value: '',
      submit: [],
          };

    this.handleItemChange = this.handleItemChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
   }
  
  handleNameChange (event) {
    if (event.key === 'Enter'){
	    this.setState({name : event.target.value})
	}
  }

  handleItemChange(event){
    this.setState({value : event.target.value})
  }

  handleSubmit(event){
    event.preventDefault()
    const submissions = this.state.submit.slice()
    const input = this.state.value
    const myValue = input.split(':')
    if (myValue.length == 1){
	myValue.unshift('')
    }
    this.setState({
      submit: submissions.concat([[myValue[0],myValue[1]]]),
      value: ''

    });
  }

   handleClick(event){
	event.preventDefault()
	const submissions = this.state.submit.slice()
	const myValue = submissions.filter((item) => item != event.target.value)
	this.setState({
	  submit: myValue
	})
   }
 
  render() {
	const start = (this.state.name == 'TestName')
	const appOutput = []
	if (start){
		appOutput.push(
         		<div>
         		<h1>Welcome to Doozy</h1>
         		<p> Let us know your name to get started </p>
         		 <ControlledInput 
        		name={this.state.name} 
        		onChange={this.handleNameChange} 
       			/>
       			</div>		
		)
	}else{
		appOutput.push(
		     <div>
		     <header>Doozy</header>
		     <p> {this.state.name}, here is your Doozy List </p>
		      <ControlledForm 
        		value={this.state.value} 
        		submit={this.state.submit} 
        		onChange={this.handleItemChange}
        		onSubmit={this.handleSubmit}
        		onClick={this.handleClick}
			/>
			
         	       	<p>You have {this.state.submit.length} Doozy tasks left to do! </p>
			<p> You have {document.getElementsByClassName("listItemClass").length} to do </p>
			</div>
   		)
    	}
    return(
      
      	<div>
      		{appOutput}
       	</div>
	)
	}
	}

class Tester extends React.Component{
  render(){
	return(<p> Testing the Tester </p>)
  }
}

//===================================================
ReactDOM.render(<ToDoItem />, document.getElementById('root'));
//ReactDOM.render(<p>TestCheck </p>, document.getElementById('root'));
