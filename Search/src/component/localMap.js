import React from 'react';

const localMap = (props) => {
 const mapMarkers = () => {
    props.onMapShow()
  }
  return (
    <div id="map">
      {mapMarkers()}
    </div>
  )
}


export default localMap
