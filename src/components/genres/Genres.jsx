import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import "./style.scss";

const Genres = ({ data }) => {
  const { generes } = useSelector((state) => state.home);
  console.log(data, generes, "Hello");
  return (
    <div className="genres">
      {data?.map((g) => {
        if (!generes[g]?.name) return;
        return (
          <div key={g} className="genre">
            {generes[g]?.name}
          </div>
        );
      })}
    </div>
  );
};

export default Genres;
