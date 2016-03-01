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
      departing: null,
      returning: null,
    };
  }

  submitTrain(e, d, d2, place_id, name, lat, lng, visits) {
    console.log(d, d2);
    e.preventDefault();
    e.stopPropagation();
    createTrain(d, d2, place_id, name, lat, lng, visits);
  }

  render() {
    console.log(this.props.item)
    return (
      <div className={this.state.accordionClass} ref="dropdown">
        <div className="scheduleButtonWrapper">
          <div>
            <br />
            <p>Price: {this.props.item.price_level}</p>
            <p>Rating: {this.props.item.rating}</p>
            <p>Opening Now: {this.props.item.opening_hours.open_now}</p>
            <p>{this.props.item.vicinity}</p>
          </div>
          <hr />
            Schedule Train to {this.props.item.name}
          <form onSubmit={
            (e) => {
              e.preventDefault();
              this.submitTrain(e, this.state.departing, this.state.returning, this.props.item.place_id, this.props.item.name, this.props.item.geometry.location.lat(), this.props.item.geometry.location.lng(), 0);
            }
          }>
            <b>Departing</b>
            <br />
            <input type="datetime-local" value={this.state.departing} onClick={(e) => {e.preventDefault(); e.stopPropagation();}}/>
            <br />
            <b>Returning</b>
            <br />
            <input type="datetime-local" value={this.state.returning} onClick={(e) => {e.preventDefault(); e.stopPropagation();}}/>
            <br />
            <input type="submit" value="Submit" className="scheduleButton" />
          </form>
        </div>
      </div>
    )
  }
}

export default GoogleListDropdown;