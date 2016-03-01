import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import GoogleMap from './GoogleMap.js';
import GoogleListEntry from './GoogleListEntry.js';
import GoogleListDropdown from './GoogleListDropdown.js';
import LocalMap from './LocalMap.js';
import LocalList from './LocalList.js';

import $ from 'jquery';

class GoogleList extends React.Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="destList" id="destList">
      {this.props.list ?
        this.props.list.map( (item, i) =>
         <div className="placeAndDropdown" onClick={this.props.handleDestAccordion.bind(this, i)}>
          <GoogleListEntry key={i} item={item} />
          <GoogleListDropdown item={item} ref={'dropdown'+i} key={i+'d'} />
         </div>
        ) :
        "Couldn\'t find any places. Sorry about that! Try again!"
      }
      </div>
    )
  }
}

export default GoogleList;