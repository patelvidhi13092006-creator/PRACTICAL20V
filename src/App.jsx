import React, { useEffect, useMemo, useState } from "react";
import EmployeeForm from "./components/EmployeeForm.jsx";
import EmployeeList from "./components/EmployeeList.jsx";
import "./App.css";

const initialEmployees = [
  { id: 1001, name: "Aarav Sharma", email: "aarav@example.com", department: "IT", salary: 65000 },
  { id: 1002, name: "Priya Patel", email: "priya@example.com", department: "HR", salary: 48000 },
  { id: 1003, name: "Rahul Verma", email: "rahul@example.com", department: "Finance", salary: 55000 },
  { id: 1004, name: "Ananya Shah", email: "ananya@example.com", department: "Marketing", salary: 52000 },
  { id: 1005, name: "Vikram Singh", email: "vikram@example.com", department: "Sales", salary: 45000 },
];

const STORAGE_KEY = "employix-employees";

function loadEmployees() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : initialEmployees;
  } catch {
    return initialEmployees;
  }
}

const formatMoney = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

export default function App() {
  const [employees, setEmployees] = useState(loadEmployees);
  const [page, setPage] = useState("dashboard");
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
  }, [employees]);

  const departments = useMemo(
    () => [...new Set(employees.map((employee) => employee.department))],
    [employees]
  );

  const payroll = employees.reduce(
    (total, employee) => total + Number(employee.salary || 0),
    0
  );

  const average = employees.length ? Math.round(payroll / employees.length) : 0;

  const filteredEmployees = employees.filter((employee) => {
    const query = search.toLowerCase();

    const matchesSearch =
      employee.name.toLowerCase().includes(query) ||
      employee.email.toLowerCase().includes(query) ||
      String(employee.id).includes(query);

    const matchesDepartment =
      department === "All" || employee.department === department;

    return matchesSearch && matchesDepartment;
  });

  function saveEmployee(data) {
    if (editing) {
      setEmployees((current) =>
        current.map((employee) =>
          employee.id === editing.id
            ? { ...data, id: editing.id }
            : employee
        )
      );
      setEditing(null);
    } else {
      const nextId =
        Math.max(1000, ...employees.map((employee) => employee.id)) + 1;

      setEmployees((current) => [...current, { ...data, id: nextId }]);
    }

    setPage("employees");
  }

  function editEmployee(employee) {
    setEditing(employee);
    setPage("add");
  }

  function deleteEmployee(id) {
    if (window.confirm("Delete this employee record?")) {
      setEmployees((current) =>
        current.filter((employee) => employee.id !== id)
      );
    }
  }

  function openAddForm() {
    setEditing(null);
    setPage("add");
  }

  function navigate(nextPage) {
    setEditing(null);
    setPage(nextPage);
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-logo">E</div>
          <div>
            <h2>Employix</h2>
            <p>Management System</p>
          </div>
        </div>

        <p className="nav-heading">WORKSPACE</p>

        <button
          className={`nav-link ${page === "dashboard" ? "active" : ""}`}
          onClick={() => navigate("dashboard")}
        >
          <span>▦</span> Dashboard
        </button>

        <button
          className={`nav-link ${page === "employees" ? "active" : ""}`}
          onClick={() => navigate("employees")}
        >
          <span>♙</span> Employees
          <span className="nav-count">{employees.length}</span>
        </button>

        <button
          className={`nav-link ${page === "add" ? "active" : ""}`}
          onClick={openAddForm}
        >
          <span>＋</span> Add Employee
        </button>

        <div className="sidebar-bottom">
          <div className="admin-profile">
            <div className="avatar admin-avatar">A</div>
            <div>
              <strong>Administrator</strong>
              <p>System Admin</p>
            </div>
          </div>
          <p className="sidebar-copyright">Employix © 2026</p>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="breadcrumb">
            Workspace <span>/</span>{" "}
            <strong>
              {page === "dashboard"
                ? "Dashboard"
                : page === "employees"
                ? "Employees"
                : editing
                ? "Edit Employee"
                : "Add Employee"}
            </strong>
          </div>
          <div className="online-status">
            <span className="status-dot" />
            System Online
          </div>
        </header>

        {page === "dashboard" && (
          <>
            <section className="welcome-section">
              <div>
                <p className="eyebrow">EMPLOYEE ADMINISTRATION</p>
                <h1>Good day, Administrator 👋</h1>
                <p className="welcome-text">
                  Manage your team, track employee records, and keep
                  everything organized in one place.
                </p>
              </div>
              <button className="primary-button" onClick={openAddForm}>
                + Add Employee
              </button>
            </section>

            <section className="stats-grid">
              <div className="stat-card">
                <div className="stat-heading">
                  <span>Total Employees</span>
                  <span className="stat-icon purple">♙</span>
                </div>
                <h2>{employees.length}</h2>
                <p>Employee records in system</p>
              </div>

              <div className="stat-card">
                <div className="stat-heading">
                  <span>Departments</span>
                  <span className="stat-icon blue">▦</span>
                </div>
                <h2>{departments.length}</h2>
                <p>Departments represented</p>
              </div>

              <div className="stat-card">
                <div className="stat-heading">
                  <span>Monthly Payroll</span>
                  <span className="stat-icon green">₹</span>
                </div>
                <h2>{formatMoney(payroll)}</h2>
                <p>Total monthly salary</p>
              </div>

              <div className="stat-card">
                <div className="stat-heading">
                  <span>Average Salary</span>
                  <span className="stat-icon orange">↗</span>
                </div>
                <h2>{formatMoney(average)}</h2>
                <p>Average per employee</p>
              </div>
            </section>

            <section className="content-card">
              <div className="section-heading">
                <div>
                  <h2>Recent Employees</h2>
                  <p>Latest employee records in your organization.</p>
                </div>
                <button
                  className="text-button"
                  onClick={() => navigate("employees")}
                >
                  View all →
                </button>
              </div>

              <EmployeeList
                employees={employees.slice(0, 5)}
                onEdit={editEmployee}
                onDelete={deleteEmployee}
              />
            </section>
          </>
        )}

        {page === "employees" && (
          <section className="page-section">
            <div className="page-title-row">
              <div>
                <p className="eyebrow">WORKSPACE</p>
                <h1>Employee Directory</h1>
                <p className="welcome-text">
                  View, search, edit, and manage your employee records.
                </p>
              </div>
              <button className="primary-button" onClick={openAddForm}>
                + Add Employee
              </button>
            </div>

            <section className="content-card">
              <div className="section-heading">
                <div>
                  <h2>All Employees</h2>
                  <p>{filteredEmployees.length} records found</p>
                </div>
              </div>

              <div className="filter-bar">
                <input
                  type="search"
                  placeholder="Search by name, email, or ID..."
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />

                <select
                  value={department}
                  onChange={(event) => setDepartment(event.target.value)}
                >
                  <option value="All">All Departments</option>
                  {departments.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <EmployeeList
                employees={filteredEmployees}
                onEdit={editEmployee}
                onDelete={deleteEmployee}
              />
            </section>
          </section>
        )}

        {page === "add" && (
          <section className="page-section">
            <div className="page-title-row">
              <div>
                <p className="eyebrow">EMPLOYEE ADMINISTRATION</p>
                <h1>{editing ? "Edit Employee" : "Add Employee"}</h1>
                <p className="welcome-text">
                  {editing
                    ? "Update the employee information below."
                    : "Enter the details to add a new team member."}
                </p>
              </div>
            </div>

            <section className="content-card form-card">
              <EmployeeForm
                key={editing ? editing.id : "new"}
                initialData={editing}
                onSave={saveEmployee}
                onCancel={() => navigate("employees")}
              />
            </section>
          </section>
        )}

        <footer className="main-footer">
          <span>© 2026 Employix Management System</span>
          <span>Data stored in your browser</span>
        </footer>
      </main>
    </div>
  );
}