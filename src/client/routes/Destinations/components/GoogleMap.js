import React from 'react';

const GoogleMap = (props) => {
 const mapMarkers = () => {
    props.onMapShow()
  }
  return (
    <div className="refresh">
      {mapMarkers()}
    </div>
  )
}



export default GoogleMap

