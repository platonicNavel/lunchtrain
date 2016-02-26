class TrainsListEntryDropdown extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      open: false,
      accordionClass: 'details'
    };
  }

  render() {
    return (
      <div className={this.state.accordionClass} ref="dropdown">
        <div className="trainEntryDropdownWrapper"></div>
      </div>
    )
  }
}