import React from 'react';

const LocalMap = (props) => {
 const mapMarkers = () => {
    props.onMapShow()
  }
  return (
    <div id="map">
      {mapMarkers()}
    </div>
  )
}


export default LocalMap;
