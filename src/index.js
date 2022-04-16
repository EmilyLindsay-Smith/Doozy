import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function ControlledInput(props) {
    return(
      <div>
        <input placeholder = 'Your Name' value = {props.input} onChange={props.onChange}/>
      </div>
    );
}

class ControlledForm extends React.Component{
  constructor(props){
    super(props);	
    this.state={
     value: '',
     submit: ['A']
     };
    this.handleItemChange = this.handleItemChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleItemChange(event){
    this.setState({value : event.target.value})
  }

  handleSubmit(event){
    event.preventDefault()
    this.setState({
      submit: this.state.submit.concat([this.state.value])
    });
  }
  
    
  render() {
    const items = this.state.submit;
    const listItems = items.map((item) => <li>{item}</li>);
   
    return(
      <div>
      <form onSubmit={this.handleSubmit}>
      <input 
        value = {this.state.value} 
        onChange = {this.handleItemChange}
        />
      <button type='submit'>Submit!</button>
      </form>

      <p>TestResult:</p>
      <ul>{listItems}</ul>
      </div>
    );
    
    };
}

class ToDoItem extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name : 'TestName',
      input: '',
      submit: ['Item'],
    };
   this.handleNameChange = this.handleNameChange.bind(this)
  }
  
  handleNameChange (event) {
    this.setState({name : event.target.value})
  }


  render() {
    return(
    <div>
      <p>Hello {this.state.name}! Welcome to Doozy</p>
      <ControlledInput name={this.name} onChange={this.handleNameChange} />
      <ControlledForm />
    </div>
  );
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
