import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class GoogleList extends Component {
  constructor(props) {
    super(props)
    console.log('prop', props)
    this.state = {
      open: false,
      accordionClass: 'details'
    }
  }

  render() {
    const listItems = this.props.list.map ( item => {
      console.log('itemssssss', item)
      return (
        <div>
          <div className="button"> 
            {item.name} 
          </div>
          <div className="popup">
            <div>
              <p>{item.name}</p>
              <p>{item.rating}</p>
              <p>{item.vicinity}</p>
            </div>
            
          </div>
        </div>
      )
    })
    return (
      <div> 
        {listItems} 
      </div>
    )
  }
}


export default GoogleList;
