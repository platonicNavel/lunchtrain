import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class localLists extends Component {
  constructor(props) {
    super(props)
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


export default localLists;
