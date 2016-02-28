class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      trains: [],
      currLat: null,
      currLon: null,
    };
  }

  getCurrentLocation(cb) {
    if (!cb) {
      navigator.geolocation.getCurrentPosition( (pos) => {
        this.setState({
          currLat: +pos.coords.latitude,
          currLon: +pos.coords.longitude,
        });
      console.log(this.state)
      });
    }
    else {
      cb(this.state.currLat, this.state.currLon)
    }
  }

  joinTrain(e, train) {
    e.stopPropagation();
    console.log('join train, id = ', train.id);
    $.ajax({
      url: '/trains',
      type: 'POST',
      data: {'id': train.id},
      success: (data) => {
        console.log('POST successful', data);
        let me = {
          firstName: data.firstName,
          lastName: data.lastName,
          id: data.id,
          slackId: data.slackId
        };
        train.users.push(me);
        this.forceUpdate()
      }
    })
    console.log(train.users)
  }

  handleAccordionMap(id, lat, lon) {
    console.log(this.refs['dropdown'+id])
    let clickedTrain = this.refs['dropdown'+id];
    if(clickedTrain.state.open) {
      clickedTrain.setState({
        open: false,
        accordionClass: "details",
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

  renderMap(lat, lon, id, currLat, currLon) {

    console.log('dest', lat, lon, id, currLat, currLon);

    let map = new google.maps.Map(document.getElementById(`map${id}`), {
      center: {lat: +lat, lng: +lon},
      zoom: 15,
    });

    let directionsDisp = new google.maps.DirectionsRenderer({
      map: map
    });

    let directionsService = new google.maps.DirectionsService();
    
    let renderDirections = (currLat, currLon) => {
      console.log('rendering directions')
      let req = {
        destination: {lat: +lat, lng: +lon},
        origin: {lat: currLat, lng: currLon},
        travelMode: google.maps.TravelMode.WALKING,
        provideRouteAlternatives: true,
      }
      
      directionsService.route(req, (res, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          console.log(status)
          directionsDisp.setDirections(res);
          directionsDisp.setPanel(document.getElementById(`mapPanel${id}`));
        }
      });



    };

    renderDirections(currLat, currLon)

  }

  componentDidMount() {
    this.getTeamTrains();
    this.getCurrentLocation();
  }

  render() {
    return (
      <div>
        <div className="trainsView container-fluid">
          <TrainsList trains={this.state.trains} handleAccordionMap={this.handleAccordionMap} joinTrain={this.joinTrain.bind(this)} renderMap={this.renderMap.bind(this)} getCurrentLocation={this.getCurrentLocation.bind(this)}></TrainsList>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);