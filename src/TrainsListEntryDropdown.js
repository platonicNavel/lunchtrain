class TrainsListEntryDropdown extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      open: false,
      accordionClass: 'details',
    };
  }

  componentDidMount() {
    let train = this.props.train;
    let map = this.props.renderMap(train.destination.lat, train.destination.long, train.id)
  }

  render() {
    return (
      <div className={this.state.accordionClass} ref="dropdown">
        <div className="trainEntryDropdownWrapper">
          <div id={'map'+this.props.train.id} className="gmap">{this.map}</div>
        </div>
      </div>
    )
  }
}