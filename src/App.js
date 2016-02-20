class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      trains: []
    };
  }

  handleAccordionMap(train) {
    console.log(train, 'CHOO CHOOOOO!')
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