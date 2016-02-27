class TrainsListEntryDropdown extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      open: false,
      accordionClass: 'details',
      map: null,
    };
  }

  render() {
    let train = this.props.train;
    this.props.renderMap(train.destination.lat, train.destination.long, train.id, (map) => {
      this.setState({map: map});
    });
    console.log(this.state.map)
    return (
      <div className={this.state.accordionClass} ref="dropdown">
        <div className="trainEntryDropdownWrapper">
          <div id={'map'+this.props.train.id} className="gmap">{this.state.map}</div>
        </div>
      </div>
    )
  }
}