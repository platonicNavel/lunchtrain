class TrainsList extends React.Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="trainsList">
        {this.props.trains ?
          this.props.trains.map( train =>
            <div class="trainAndDropdown" onClick={this.props.handleAccordionMap.bind(this, train.id)}>
              <TrainsListEntry key={train.id} train={train} joinTrain={this.props.joinTrain}/>
              <TrainsListEntryDropdown train={train} ref={'dropdown'+train.id} renderMap={this.props.renderMap}/>
            </div>
            ) :
          "Looks like there are no trains here!"
        }
      </div>
    )
  }

}