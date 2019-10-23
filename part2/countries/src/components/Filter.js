import React from "react";

const Filter = ({filterString,setFilterString}) => (
  <div>
    find countries {' '}
    <input
      value={filterString}
      onChange={e => setFilterString(e.target.value)}
    />
  </div>
);

export default Filter;
