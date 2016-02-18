class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <h1>React is so hot right now</h1>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);