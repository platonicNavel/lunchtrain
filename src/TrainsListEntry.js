class TrainsListEntry extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
      accordionClass: 'details'
    };
  }

  render() {
    let train = this.props.train;
    let handleAccordionMap = function(train) {
      console.log('asdfadfsadfs', this.state)
      this.props.handleAccordionMap(this);
    }
    return (
      <div className="trainEntry" onClick={handleAccordionMap.bind(this, this.props.train)}>
        <div className="trainContainer">
          <div className="trainIconTimeWrapper">
            <div className="trainIcon"></div>
            <div className="timeWrapper">
              <div className="time">{train.timeDeparting}---{train.timeBack}</div>
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
              <div className="slackPic"></div>
            </div>
            {train.users.map( passenger =>
              <div className="passenger">
                <div className="slackPic"></div>
              </div>
            )}
            <div className="joinWrapper">
              <div className="joinArrow">»</div>
            </div>
          </div>
        </div>
        <TrainsListEntryDropdown train={train} open={this.state.open} accordionClass={this.state.accordionClass}></TrainsListEntryDropdown>
      </div>
    )
  }
}