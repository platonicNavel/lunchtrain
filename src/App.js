class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      trains: []
    };
  }

  joinTrain(e, train) {
    e.stopPropagation();
    console.log('join train, id = ', train.id);
    $.ajax({
      url: '/trains',
      type: 'POST',
      data: {'id': train.id},
      success: (data) => {
        console.log('POST successful')
      }
    })
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

  getTeamTrains() {
    getCurrentTrains((trains) => {
      this.setState({
        trains: trains
      });
    });
  }

  componentDidMount() {
    this.getTeamTrains();
  }

  render() {
    return (
      <div>
        <div className="trainsView container-fluid">
          <TrainsList trains={this.state.trains} handleAccordionMap={this.handleAccordionMap} joinTrain={this.joinTrain.bind(this)}></TrainsList>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);