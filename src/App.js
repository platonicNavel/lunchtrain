class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      trains: [],
      currLat: null,
      currLon: null,
    };
  }

  getCurrentLocation() {
    navigator.geolocation.getCurrentPosition( (pos) => {
      this.setState({
        currLat: +pos.coords.latitude,
        currLon: +pos.coords.longitude,
      });
      console.log(this.state)
    });
  }

  joinTrain(e, train) {
    e.stopPropagation();
    console.log('join train, id = ', train.id);
    $.ajax({
      url: '/trains',
      type: 'POST',
      data: {'id': train.id},
      success: (data) => {
        console.log('POST successful')
      }
    })
  }

  handleAccordionMap(id) {
    console.log(this.refs['dropdown'+id])
    let clickedTrain = this.refs['dropdown'+id];
    if(clickedTrain.state.open) {
      clickedTrain.setState({
        open: false,
        accordionClass: "details"
      });
    }
    else{
      clickedTrain.setState({
        open: true,
        accordionClass: "details open"
      });
    }
  }

  getTeamTrains() {
    getCurrentTrains((trains) => {
      this.setState({
        trains: trains
      });
    });
  }

  renderMap(lat, lon, id, cb) {
    console.log('dest', lat, lon, id);

    let map = new google.maps.Map(document.getElementById(`map${id}`), {
      center: {lat: +lat, lng: +lon},
      zoom: 15
    });

    let directionsDisp = new google.maps.DirectionsRenderer({
      map: map
    });

    let req = {
      destination: {lat: +lat, lng: +lon},
      origin: {lat: +this.state.currLat, lng: +this.state.currLon},
      travelMode: google.maps.TravelMode.WALKING
    }

    let directionsService = new google.maps.DirectionsService();
    
    directionsService.route(req, (res, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsDisp.setDirections(res);
        cb(map)
      }
    });
  }

  componentDidMount() {
    this.getTeamTrains();
    this.getCurrentLocation();
  }

  render() {
    return (
      <div>
        <div className="trainsView container-fluid">
          <TrainsList trains={this.state.trains} handleAccordionMap={this.handleAccordionMap} joinTrain={this.joinTrain.bind(this)} renderMap={_.debounce(this.renderMap.bind(this), 500)}></TrainsList>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);