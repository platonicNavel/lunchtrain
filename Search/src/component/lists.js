import React from 'react';
import FoodListEntry from './FoodListEntry';

const Lists = (props) => {
  return (
    <div className=".col-xs-6">
      <ul>
        <FoodListEntry />
      </ul>
    </div>
  )
}

export default Lists;