class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      trains: []
    };
  }

  handleTrainBoardingClick(train) {
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
          <TrainsList trains={this.state.trains}></TrainsList>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);