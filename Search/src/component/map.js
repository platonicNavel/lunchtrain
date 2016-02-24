// need to refactor the map. I didn't put anything on return.
// this will be show the 20 markers in google map

import React from 'react';


const Map = (props) => {
  const mapMarkers = () => {
    props.onMapShow()
  }
  return (
    <div id="map">
    please
      {mapMarkers()}
    </div>
  )

}

export default Map

