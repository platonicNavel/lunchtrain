import React from 'react';
//import ReactDOM from 'react-dom';

// class Map extends Component {
//   constructor(props) {
//     super(props)
//   }

//   mapMarkers() {
//     this.props.onMapShow()
//   }

//   render(){
//     return (
//       <div id="map">
//         { this.mapMarkers() }
//       </div>
//     )
//   }
// }


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
