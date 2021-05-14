import React from 'react';

import './CheckboxTree.scss';

export const CheckboxTree = ({}) => {
  return (
    <div className="checkbox-tree">
      <input
        className="checkbox-tree__field checkbox-tree__field_hidden"
        type="checkbox"
        name=""
        id="three"
        tabIndex="-1"
      />
      <label className="checkbox-tree__lab" htmlFor="three">
        <span></span>
        Root
      </label>
    </div>
  );
};
