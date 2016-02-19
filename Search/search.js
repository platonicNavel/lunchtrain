class Search extends React.Component {
  constructor() {
    super(props);

    this.state= {
      lists: [],
      currentLocation: {
        lat: 37.7837356,
        lng: -122.40918219999999,
      },
    }
  }
  render() {
    return (
      //make drop menu to re-render the map
      <div className="dropMenu">
        <select>
          <option value="cafe">Cafe</option>
          <option value="restaurant">restaurant</option>
          <option value="bar">bar</option>
        </select>
      </div>
      <div className="searchs">
        <div>
          <Map />
        </div>
        <div>
          <Lists {}/>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Search />, document.getElementById('search'));