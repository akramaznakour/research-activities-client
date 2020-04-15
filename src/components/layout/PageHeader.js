import React from "react";

const PageHeader = (props) => {
  return (
    <div class="page-header">
      <div class="row align-items-center">
        <div class="col-auto">
          <h2 class="page-title">{props.title}</h2>
        </div>
        <div class="col-auto ml-auto d-print-none"></div>
        <div class="col-auto">
          <div class="text-muted text-h5 mt-2">{props.subTitle ?? ""}</div>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;