class TrainsList extends React.Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="trainsList">
        {this.props.trains ?
          this.props.trains.map( train =>
            <TrainsListEntry key={train.trainId} train={train} handleAccordionMap={this.props.handleAccordionMap} />) :
            "Looks like there are no trains here!"
        }
      </div>
    )
  }

}