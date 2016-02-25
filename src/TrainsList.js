class TrainsList extends React.Component {
  
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
    return (
      <div className="trainsList">
        {this.props.trains ?
          this.props.trains.map( train =>
            <div class="trainAndDropdown" onClick={this.handleAccordionMap.bind(this)}>
              <TrainsListEntry key={train.trainId} train={train} handleAccordionMap={this.props.handleAccordionMap} joinTrain={this.props.joinTrain} />
              <TrainsListEntryDropdown train={train} open={this.state.open} accordionClass={this.state.accordionClass} />
            </div>
            ) :
            "Looks like there are no trains here!"
        }
      </div>
    )
  }

}