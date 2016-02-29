import React from 'react';

const GoogleMap = (props) => {
 const mapMarkers = () => {
    props.onMapShow()
  }
  return (
    <div id="map">
      {mapMarkers()}
    </div>
  )
}


export default GoogleMap

