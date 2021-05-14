import React from 'react';

import './Thumbnail.scss';

export const Thumbnail = ({ url, idFor }) => {
  return (
    <div className="thumbnail">
      <input
        className="thumbnail__field thumbnail__field_hidden"
        id={idFor}
        type="checkbox"
      />
      <label className="thumbnail__lab" htmlFor={idFor}>
        <img className="thumbnail__img" src={url} alt="" />
      </label>
    </div>
  );
};
