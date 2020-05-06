import React, { useState, useContext, useEffect } from "react";
import GeneratedUser from "../_components/GeneratedUser";

import { AppContext } from "../../../context/AppContext";
import PageHeader from "../../_common/_components/PageHeader";

const LaboratoryHeads = (props) => {
  const [laboratoryHeads, setLaboratoryHeads] = useState([]);
  const [newEmail, setNewEmail] = useState("");

  const { ApiServices } = useContext(AppContext);
  const { userService } = ApiServices;

  useEffect(() => {
    userService
      .getLaboratoryHeads()
      .then((response) => {
        setLaboratoryHeads(response.data);
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
        role: "LABORATORY_HEAD",
      })
      .then((response) => {
        setLaboratoryHeads([...laboratoryHeads, response.data]);
      })
      .catch((error) => {});
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">
                Creation des comptes chef de laboratoire
              </h3>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6 col-xl-12">
                  <div className="mb-3">
                    <label className="form-label">
                      Email de chef de laboratoire
                    </label>
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
        <div className="col-md-6">
          <PageHeader
            title="Utilisateurs confirmés"
            subTitle={`${
              laboratoryHeads.filter((user) => user.hasConfirmed).length
            } utilisateur(s)`}
          />
          <div className="row">
            {laboratoryHeads
              .filter((user) => user.hasConfirmed)
              .map((laboratoryHead) => (
                <GeneratedUser user={laboratoryHead} />
              ))}
          </div>
        </div>
        <div className="col-md-6">
          <PageHeader
            title="Utilisateurs non confirmés"
            subTitle={`${
              laboratoryHeads.filter((user) => !user.hasConfirmed).length
            } utilisateur(s)`}
          />
          <div className="row">
            {laboratoryHeads
              .filter((user) => !user.hasConfirmed)
              .map((laboratoryHead) => (
                <GeneratedUser user={laboratoryHead} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaboratoryHeads;
