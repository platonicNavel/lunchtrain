import React from 'react';


const Map = (props) => {
  const mapMarkers = () => {
    props.onMapShow()
  }
  return (
    <div id="map">
      {mapMarkers()}
    </div>
  )

}

export default Map
