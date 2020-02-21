import React from "react";
import Publication from "./Publication";

const Publications = props => {
  return (
    <div className="card">
      <div className="table-responsive">
        <table className="table table-hover  card-table">
          <thead>
            <tr>
              <th>Titre</th>
              <th className="text-center"> Citée </th>
              <th className="text-center">Année</th>
              <th className="text-center">SJR</th>
              <th className="text-center">IF</th>
            </tr>
          </thead>
          <tbody>
            {props.publications.map(( publication,index) => (
              <Publication
                index={index}
                key={publication.bib.title}
                publication={publication}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Publications;
