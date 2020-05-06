import React, { useState, useContext, useEffect } from "react";

import LaboratoryBox from "../_components/LaboratoryBox";
import PageHeader from "../../_common/_components/PageHeader";
import { AppContext } from "../../../context/AppContext";

const LaboratoryHeadsAssociation = (props) => {
  const [laboratoryHeads, setLaboratoryHeads] = useState([]);
  const [laboratories, setLaboratories] = useState([]);

  const { ApiServices } = useContext(AppContext);
  const { laboratoryService, userService } = ApiServices;

  const requestUpdate = () => {
    getLaboratoriesData();
    getLaboratoryHeadsData();
  };

  const getLaboratoriesData = () => {
    laboratoryService.findAllLaboratories().then((response) => {
      setLaboratories([]);
      setLaboratories(response.data);
    });
  };

  const getLaboratoryHeadsData = () => {
    userService.getLaboratoryHeads().then((response) => {
      setLaboratoryHeads([]);
      setLaboratoryHeads(response.data);
    });
  };

  useEffect(() => {
    requestUpdate();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <PageHeader
            title="Laboratoires sans chef désigné"
            subTitle={`${
              laboratories.filter((laboratory) => !laboratory.head_id).length
            } laboratoire(s)`}
          />
          <div className="row">
            {laboratories
              .filter((laboratory) => !laboratory.head_id)
              .map((laboratory) => (
                <LaboratoryBox
                  laboratory={laboratory}
                  laboratoryHeads={laboratoryHeads}
                  requestUpdate={requestUpdate}
                />
              ))}
          </div>
        </div>
        <div className="col-md-6">
          <PageHeader
            title="Laboratoires avec un chef désigné"
            subTitle={`${
              laboratories.filter((laboratory) => laboratory.head_id).length
            } laboratoire(s)`}
          />
          <div className="row">
            {laboratories
              .filter((laboratory) => laboratory.head_id)
              .map((laboratory) => (
                <LaboratoryBox
                  laboratory={laboratory}
                  laboratoryHeads={laboratoryHeads}
                  requestUpdate={requestUpdate}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaboratoryHeadsAssociation;
