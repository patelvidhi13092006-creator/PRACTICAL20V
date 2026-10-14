import React from "react";
import EmployeeItem from "./EmployeeItem.jsx";

export default function EmployeeList({
  employees,
  onEdit,
  onDelete,
}) {
  if (employees.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">♙</div>
        <h3>No employees found</h3>
        <p>Try another search or add an employee to get started.</p>
      </div>
    );
  }

  return (
    <div className="table-wrapper">
      <table className="employee-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>EMPLOYEE</th>
            <th>EMAIL ADDRESS</th>
            <th>DEPARTMENT</th>
            <th>MONTHLY SALARY</th>
            <th>ACTIONS</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((employee) => (
            <EmployeeItem
              key={employee.id}
              employee={employee}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>

      <div className="table-footer">
        <span>Showing {employees.length} employee records</span>
        <span>Data stored in your browser</span>
      </div>
    </div>
  );
}