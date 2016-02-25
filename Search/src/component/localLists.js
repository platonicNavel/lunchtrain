import React from 'react';
import localFoodListEntry from './localFoodListEntry';

const localLists = (props) => {
  const listItmes = props.list.map( (item) => {
    return <localFoodListEntry key={item.googleId} item={item} />
  })
  return (
    <div>
      <ul>
        {listItmes}
      </ul>
    </div>
  )
}

export default localLists;
