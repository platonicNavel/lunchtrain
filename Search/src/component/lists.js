import React from 'react';
import FoodListEntry from './FoodListEntry';

const Lists = (props) => {
  const listItmes = props.list.map( (item) => {
    return <FoodListEntry key={item.place_id} item={item} />
  })
  return (
    <div>
      <ul>
        {listItmes}
      </ul>
    </div>
  )
}

export default Lists;
