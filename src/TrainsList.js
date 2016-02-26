class TrainsList extends React.Component {
  
  constructor(props) {
    super(props);
  }

  handleAccordionMap(id) {
    console.log(this.refs['dropdown'+id])
    let clickedTrain = this.refs['dropdown'+id];
    if(clickedTrain.state.open) {
      clickedTrain.setState({
        open: false,
        accordionClass: "details"
      });
    }
    else{
      clickedTrain.setState({
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
            <div class="trainAndDropdown" onClick={this.handleAccordionMap.bind(this, train.id)}>
              <TrainsListEntry key={train.id} train={train} joinTrain={this.props.joinTrain}/>
              <TrainsListEntryDropdown train={train} ref={'dropdown'+train.id}/>
            </div>
            ) :
          "Looks like there are no trains here!"
        }
      </div>
    )
  }

}