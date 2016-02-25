class TrainsListEntry extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let train = this.props.train;
    let joinTrain = this.props.joinTrain;
    return (
      <div className="trainEntry">
        <div className="trainContainer">
          <div className="trainIconTimeWrapper">
            <div className="trainIcon"></div>
            <div className="timeWrapper">
              <div className="time">{train.timeDeparting} --- {train.timeBack}</div>
            </div>
          </div>
          <div className="trainDetailsWrapper">
            <h2 className="trainDest">{train.destination.name}</h2>
            <div className="trainRatingsWrapper">
              <div className="likes col-xs-6"><div>♥3</div></div>
              <div className="price col-xs-6"><div>$$</div></div>
            </div>
          </div>
          <div className="passengersWrapper">
            <div className="conductor passenger">
              <div className="slackPic">{train.conductor.firstName}</div>
            </div>
            {train.users.map( passenger =>
              <div className="passenger">
                <div className="slackPic">{passenger.firstName}</div>
              </div>
            )}
            <div className="joinWrapper" onClick={(e) => joinTrain(e, train)} ref="train">
              <div className="joinArrow">»</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}