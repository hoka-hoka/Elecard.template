import React from 'react';

import './CheckboxTree.scss';

export const CheckboxTree = ({ text, idFor, render }) => {
  return (
    <div className="checkbox-tree">
      <input
        className="checkbox-tree__field checkbox-tree__field_hidden"
        type="checkbox"
        name=""
        id={idFor}
        tabIndex="-1"
      />
      <label className="checkbox-tree__lab" htmlFor={idFor}>
        <span></span>
        {text}
      </label>
      {render()}
    </div>
  );
};
