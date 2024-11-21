import React from "react";
import RoleList from "../components/roles/RoleList";

const RolesPage: React.FC = () => (
  <div className="container mt-5">
    <div className="card shadow-lg border-0 bg-light">
      {" "}
      <div className="card-header bg-primary text-white text-center">
        {" "}
        <h2 className="mb-0">Roles</h2>
      </div>
      <div className="card-body bg-white">
        {" "}
        <RoleList />
      </div>
    </div>
  </div>
);

export default RolesPage;
