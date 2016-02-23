class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      trains: []
    };
  }

  handleAccordionMap(train) {
    console.log(train, 'CHOO CHOOOOO!', this);

    if(train.state.open) {
      train.setState({
        open: false,
        accordionClass: "details"
      });
    }
    else{
      train.setState({
        open: true,
        accordionClass: "details open"
      });
    }
  }

  getTeamTrains(teamId) {
    getCurrentTrains(teamId, (trains) => {
      this.setState({
        trains: trains
      });
    });
  }

  componentDidMount() {
    this.getTeamTrains(1)
  }

  render() {
    return (
      <div>
        <div className="trainsView container-fluid">
          <TrainsList trains={this.state.trains} handleAccordionMap={this.handleAccordionMap.bind(this)}></TrainsList>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);