import React, { useState, useContext, useEffect } from "react";
import GeneratedUser from "../_components/GeneratedUser";
import PageHeader from "../../_common/_components/PageHeader";

import { AppContext } from "../../../AppContext";

const Researchers = (props) => {
  const [Researchers, setLaboratoryHeads] = useState([]);
  const [newEmail, setNewEmail] = useState("");

  const { ApiServices } = useContext(AppContext);
  const { userService } = ApiServices;

  useEffect(() => {
    userService
      .getLabHeads()
      .then((response) => {
        setLaboratoryHeads(response.data.labHeads);
      })
      .catch((error) => {});
  }, []);

  const handleEmailChange = (event) => {
    event.persist();
    setNewEmail(event.target.value);
  };

  const handleSubmit = (e) => {
    const password = Math.random().toString(36).slice(-8);

    userService
      .createUser({
        email: newEmail,
        password,
        role: "RESEARCHER",
      })
      .then((response) => {
        setLaboratoryHeads([...Researchers, response.data]);
      })
      .catch((error) => {});
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Creation des comptes chercheurs</h3>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6 col-xl-12">
                  <div className="mb-3">
                    <label className="form-label">Email de chercheurs</label>
                    <div className="input-group mb-2">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="example@domaine.com"
                        onChange={handleEmailChange}
                        value={newEmail.email}
                        name="email"
                      />
                      <span className="input-group-append">
                        <button
                          onClick={handleSubmit}
                          className="btn btn-secondary"
                          type="button"
                        >
                          Créer
                        </button>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-6">
          <PageHeader title="Utilisateurs confirmés" />
          <div className="row">
            {Researchers.filter((user) => user.has_confirmed).map(
              (laboratoryHead) => (
                <GeneratedUser user={laboratoryHead} />
              )
            )}
          </div>
        </div>{" "}
        <div className="col-6">
          <PageHeader title="Utilisateurs non confirmés" />
          <div className="row">
            {Researchers.filter((user) => !user.has_confirmed).map(
              (laboratoryHead) => (
                <GeneratedUser user={laboratoryHead} />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Researchers;