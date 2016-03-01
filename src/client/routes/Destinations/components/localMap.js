import React from 'react';

const LocalMap = (props) => {
 const mapMarkers = () => {
    props.onMapShows()
  };
  return (
    <div>
      {mapMarkers()}
    </div>
  );
};


export default LocalMap;
