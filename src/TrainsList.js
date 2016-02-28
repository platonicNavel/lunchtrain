class TrainsList extends React.Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="trainsList" id="trainsList">
        {this.props.trains ?
          this.props.trains.map( train =>
            <div className="trainAndDropdown" onClick={this.props.handleAccordionMap.bind(this, train.id, train.destination.lat, train.destination.lon)}>
              <TrainsListEntry key={train.id} train={train} joinTrain={this.props.joinTrain}/>
              <TrainsListEntryDropdown train={train} ref={'dropdown'+train.id} renderMap={this.props.renderMap} key={train.id+'d'} getCurrentLocation={this.props.getCurrentLocation} />
            </div>
            ) :
          "Looks like there are no trains here!"
        }
      </div>
    )
  }

}