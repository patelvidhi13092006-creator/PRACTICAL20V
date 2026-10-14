import React, { useState } from "react";

const emptyForm = {
  name: "",
  email: "",
  department: "IT",
  salary: "",
};

export default function EmployeeForm({
  initialData,
  onSave,
  onCancel,
}) {
  const [form, setForm] = useState(() =>
    initialData
      ? {
          name: initialData.name,
          email: initialData.email,
          department: initialData.department,
          salary: String(initialData.salary),
        }
      : emptyForm
  );

  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setError("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!form.name.trim()) {
      setError("Please enter the employee name.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!form.department) {
      setError("Please select a department.");
      return;
    }

    if (form.salary === "" || Number(form.salary) <= 0) {
      setError("Salary must be greater than zero.");
      return;
    }

    onSave({
      name: form.name.trim(),
      email: form.email.trim(),
      department: form.department,
      salary: Number(form.salary),
    });
  }

  return (
    <form className="employee-form" onSubmit={handleSubmit}>
      <div className="form-heading">
        <h2>Employee Information</h2>
        <p>Fill in the details below. All fields are required.</p>
      </div>

      {error && <div className="form-error">{error}</div>}

      <div className="form-grid">
        <label className="form-field">
          Employee Full Name
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. Aarav Sharma"
            autoComplete="name"
            required
          />
        </label>

        <label className="form-field">
          Email Address
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="name@example.com"
            autoComplete="email"
            required
          />
        </label>

        <label className="form-field">
          Department
          <select
            name="department"
            value={form.department}
            onChange={handleChange}
            required
          >
            <option value="IT">IT</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
            <option value="Marketing">Marketing</option>
            <option value="Sales">Sales</option>
            <option value="Operations">Operations</option>
            <option value="Design">Design</option>
          </select>
        </label>

        <label className="form-field">
          Monthly Salary (₹)
          <input
            name="salary"
            type="number"
            min="1"
            value={form.salary}
            onChange={handleChange}
            placeholder="e.g. 50000"
            required
          />
        </label>
      </div>

      <div className="form-actions">
        <button type="button" className="secondary-button" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="primary-button">
          {initialData ? "Save Changes" : "Add Employee"}
        </button>
      </div>
    </form>
  );
}