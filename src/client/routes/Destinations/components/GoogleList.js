import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class GoogleList extends Component {
  constructor(props) {
      super(props)
    }


    render() {
      const listItems = this.props.list.map ( item => {
        let placeId = item.place_id
        let smallMaps = "https://www.google.com/maps/embed/v1/place?q=place_id:"+ placeId +"&key=AIzaSyAxXjy2uKnQcnU1SxfaSil-fY5ek_nmkE4"
        

        if(item.opening_hours.open_now) {
            item.opening_hours.open_now = 'open'
          } else {
            item.opening_hours.open_now = 'closed'
          }


        if(item.price_level === 1) {
          item.price_level = '$'
        } else if(item.price_level === 2) {
          item.price_level = '$$'
        } else if(item.price_level === 3) {
          item.price_level = '$$$'
        } else if(item.price_level === 4) {
          item.price_level = '$$$$'
        } else {
          item.price_level = ''
        }

        
        return (
          <div>
            <button>Get on the train</button>
            <div className="button"> 
              {item.name} 
            </div>
            <div className="popup">
              <div>
                <p>Name: {item.name}</p>
                <p>Price: {item.price_level}</p>
                <p>Rating: {item.rating}</p>
                <p>Opening Now: {item.opening_hours.open_now}</p>
                <p>{item.vicinity}</p>
                <p className="smallMap">
                  <iframe width="300" height="250" frameBorder="0" style={{border:0}} src={smallMaps} allowFullScreen></iframe>
                </p>
              </div>
            </div>
          </div>
        )
      })
      return (
        <div>
          {listItems} 
        </div>
      )
    }
  }



export default GoogleList;
