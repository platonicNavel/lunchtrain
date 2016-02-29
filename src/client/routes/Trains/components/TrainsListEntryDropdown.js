class TrainsListEntryDropdown extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      open: false,
      accordionClass: 'details',
    };
  }

  componentDidMount() {
    let coords = {
      currLat: null,
      currLon: null,
    };
    let train = this.props.train;

    let getDirections = () => {
      if (!coords.currLat && !coords.currLon) {
        this.props.getCurrentLocation(function(currLat, currLon) {
          coords.currLat = currLat;
          coords.currLon = currLon;
        })
      }
      else {
        this.props.renderMap(train.destination.lat, train.destination.long, train.id, coords.currLat, coords.currLon);
        clearInterval(fetchingLoc);
      }
    }

    let fetchingLoc = setInterval(getDirections.bind(this), 1000);
  }

  render() {
    let train = this.props.train;
    return (
      <div className={this.state.accordionClass} ref="dropdown">
        <div className="trainEntryDropdownWrapper">
          <div id={'map'+train.id} className="gmap col-xs-7"></div>
          <div id={'mapPanel'+train.id} className="gmapDir col-xs-5">
            {/*TODO: Transportation Modes*/}
          </div>
        </div>
      </div>
    )
  }
}

export default TrainsListEntryDropdown;