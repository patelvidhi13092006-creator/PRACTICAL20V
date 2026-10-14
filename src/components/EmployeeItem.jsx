import React from "react";

export default function EmployeeItem({ employee, onEdit, onDelete }) {
  const initials = employee.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");

  const salary = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(employee.salary));

  return (
    <tr>
      <td className="employee-id">#{employee.id}</td>

      <td>
        <div className="employee-cell">
          <div className="avatar">{initials}</div>
          <div className="employee-details">
            <strong>{employee.name}</strong>
            <span>Employee ID: {employee.id}</span>
          </div>
        </div>
      </td>

      <td>{employee.email}</td>

      <td>
        <span className="department-badge">{employee.department}</span>
      </td>

      <td>
        <div className="salary-cell">
          <strong>{salary}</strong>
          <span>per month</span>
        </div>
      </td>

      <td>
        <div className="action-buttons">
          <button
            type="button"
            className="edit-button"
            onClick={() => onEdit(employee)}
          >
            ✎ Edit
          </button>

          <button
            type="button"
            className="delete-button"
            onClick={() => onDelete(employee.id)}
          >
            × Delete
          </button>
        </div>
      </td>
    </tr>
  );
}