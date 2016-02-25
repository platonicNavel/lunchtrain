class TrainsListEntry extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
      accordionClass: 'details'
    };
  }

  handleAccordionMap(e) {
    console.log(this.state)
    if(this.state.open) {
      this.setState({
        open: false,
        accordionClass: "details"
      });
    }
    else{
      this.setState({
        open: true,
        accordionClass: "details open"
      });
    }
  }

  render() {
    let train = this.props.train;
    let joinTrain = function(train) {
      $(this.refs.train).on('click', (e) => {
        e.stopPropagation()
        this.props.joinTrain(this);
      });
    }
    return (
      <div className="trainEntry" onClick={this.handleAccordionMap.bind(this)}>
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
            <div className="joinWrapper" onClick={joinTrain.bind(this)} ref="train">
              <div className="joinArrow">»</div>
            </div>
          </div>
        </div>
        <TrainsListEntryDropdown train={train} open={this.state.open} accordionClass={this.state.accordionClass}></TrainsListEntryDropdown>
      </div>
    )
  }
}