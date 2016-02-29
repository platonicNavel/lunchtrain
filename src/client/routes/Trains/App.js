class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      trains: [],
      currLat: null,
      currLon: null,
      maps: [],
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

  joinTrain(e, train, joined) {
    if (joined) {console.warn('You already joined this train, though.'); return;}
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

  handleAccordionMap(id, lat, lon, map) {
    console.log('accordion', this.refs['dropdown'+id], map, this.props.currentLoc)
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
      let fixMap = (map, currentLoc) => {
        map.setZoom(15);
        google.maps.event.trigger(map, "resize");
      };
      _.delay(fixMap, 500, map[id-1], this.props.currentLoc)
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
      map: map,
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
    this.state.maps.push(map);
    console.log(this.state.maps)
  }

  componentDidMount() {
    this.getTeamTrains();
    this.getCurrentLocation();
  }

  render() {
    return (
      <div>
        <div className="trainsView container">
          <TrainsList trains={this.state.trains} handleAccordionMap={this.handleAccordionMap} joinTrain={this.joinTrain.bind(this)} renderMap={this.renderMap.bind(this)} getCurrentLocation={this.getCurrentLocation.bind(this)} maps={this.state.maps} currentLoc={{lat: this.state.currLat, lng: this.state.currLon}}></TrainsList>
        </div>
      </div>
    )
  }
}

export default App;