import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class LocalList extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const listItems = this.props.list.map ( item => {
      console.log('itemssssss', item)
      return (
        <div>
        <button className="button" onClick={
          (e) => {
            this.createTrain(e, d, d2, item.place_id, item.name, item.geometry.location.lat(), item.geometry.location.lng(), 0);
            this.setState({
              joined: true,
            });
          }
        }>schedule train {item.name}</button>
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


export default LocalList;
