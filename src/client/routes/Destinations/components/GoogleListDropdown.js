import React from 'react';
import createTrain from '../../../utils/createTrain.js';
import GoogleMap from './GoogleMap.js'
import GoogleList from './GoogleList.js'
import GoogleListEntry from './GoogleListEntry.js';

class GoogleListDropdown extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      open: false,
      accordionClass: 'details',
    };
  }

  render() {
    console.log(this.props.item)
    return (
      <div className={this.state.accordionClass} ref="dropdown">
        <div className="scheduleButtonWrapper">
          <div>
            <br />
            <br />
            <p>Price: {this.props.item.price_level}</p>
            <p>Rating: {this.props.item.rating}</p>
            <p>Opening Now: {this.props.item.opening_hours.open_now}</p>
            <p>{this.props.item.vicinity}</p>
          </div>
          <button className="scheduleButton" onClick={
            (e) => {
              this.props.createTrain(e, d, d2, this.props.item.place_id, this.props.item.name, this.props.item.geometry.location.lat(), this.props.item.geometry.location.lng(), 0);
            }
          }>
            schedule train {this.props.item.name}
          </button>
        </div>
      </div>
    )
  }
}

export default GoogleListDropdown;