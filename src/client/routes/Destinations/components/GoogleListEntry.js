import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import GoogleMap from './GoogleMap.js';
import GoogleList from './GoogleList.js';
import GoogleListDropdown from './GoogleListDropdown.js';

class GoogleListEntry extends Component {
  constructor(props) {
      super(props)
    }

    render() {
      let item = this.props.item;
      let placeId = item.place_id;
      let smallMaps = "https://www.google.com/maps/embed/v1/place?q=place_id:"+ placeId +"&key=AIzaSyAxXjy2uKnQcnU1SxfaSil-fY5ek_nmkE4"

      if(item.opening_hours.open_now) {
          item.opening_hours.open_now = 'open'
        } else {
          item.opening_hours.open_now = 'closed'
        }


      if(item.price_level === 1) {
        item.price_level = '$'
      } else if(item.price_level === 2) {
        item.price_level = '$$'
      } else if(item.price_level === 3) {
        item.price_level = '$$$'
      } else if(item.price_level === 4) {
        item.price_level = '$$$$'
      } else {
        item.price_level = '$$$$$'
      }

      return (
        <div>
          <div className="itemWrapper">
            <div>{item.name}</div> 
          </div>
        </div>
      )
    }
  }



export default GoogleListEntry;
