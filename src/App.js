class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="col-xs-4 leftThird"></div>
        <div className="col-xs-8 rightThird"></div>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);