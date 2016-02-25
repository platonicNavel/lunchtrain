import React from 'react';

const FoodListEntry = ({item}) => {
  const name = item.name;
  
  return (
    <li>
      <button type="button" className="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">
        {name}
      </button>
    </li>
  )
}

export default FoodListEntry
// <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">
//   {destinationName};
// </button>
