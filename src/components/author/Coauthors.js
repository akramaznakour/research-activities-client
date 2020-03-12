import React from "react";

import { withRouter, Link } from "react-router-dom";

const Coauthors = withRouter(({ history, ...props }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Coauteurs</h3>
      </div>
      <div className="card-body o-auto" style={{ height: "auto" }}>
        <ul className="list-unstyled list-separated">
          {props.coauthors.map(coauthor => (
            <li className="list-separated-item" key={coauthor.id}>
              <div className="row align-items-center">
                <div className="col-auto">
                  <span
                    className="avatar avatar-md d-block"
                    style={{
                      backgroundImage:
                        "url(" +
                        "https://scholar.google.com/citations?view_op=medium_photo&user=" +
                        coauthor.id +
                        ")"
                    }}
                  ></span>
                </div>
                <div className="col">
                  <div>
                    <Link
                      to={"/author/" + coauthor.name}
                      className="text-inherit"
                    >
                      {coauthor.name}
                    </Link>
                  </div>
                  <small className="d-block item-except text-sm text-muted h-1x">
                    {coauthor.affiliation}
                  </small>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});

export default Coauthors;
