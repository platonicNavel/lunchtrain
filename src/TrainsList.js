class TrainsList extends React.Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="trainsList">
        {this.props.trainsList ?
          this.trainsList.map( train =>
            <TrainsListEntry key={train.trainId} train={train} handleTrainBoardingClick={this.props.handleTrainBoardingClick} />) :
            "Looks like there are no trains here!"
        }
      </div>
    )
  }

}