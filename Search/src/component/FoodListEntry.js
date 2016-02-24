import React from 'react';

const FoodListEntry = ({item}) => {
  const name = item.name;
  const placeId = item.place_id;
  const API_KEY = AIzaSyAxXjy2uKnQcnU1SxfaSil-fY5ek_nmkE4;
  const popup (name, placeId, API_KEY) => {
    <div className="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 className="modal-title" id="myModalLabel">{name}</h4>
        </div>
        <div className="modal-body">
          <div className="infoShop">
            <h4>name</h4>
          </div>
          <div className="miniMap">
            <iframe width="200" height="200" frameborder="0" style="border:0"
            src="https://www.google.com/maps/embed/v1/place?q=place_id:"+placeId+"&key="+API_KEY allowfullscreen></iframe>
          </div>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
          <button type="button" className="btn btn-default" data-dismiss="modal">Add</button>
        </div>
      </div>
    </div>
  </div>
  }



  return (
    <li>
      <button type="button" className="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">
        {name};
      </button>
    </li>
  )
}

export default FoodListEntry
// <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">
//   {destinationName};
// </button>
