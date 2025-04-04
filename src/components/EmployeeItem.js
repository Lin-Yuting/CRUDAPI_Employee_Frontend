import React from 'react';

const EmployeesItem = ({ employee, onDelete, onEdit }) => {
  
  return (
    <div className="employee-item">
      <div className="employee-info">
        <h3>{employee.Name}</h3>
        <p><strong>Name:</strong> {employee.Name || 'No especificada'}</p>
        <p><strong>Email:</strong> {employee.Email || 'No especificada'}</p>
        <p><strong>ATC:</strong> {employee.ATC || 'No especificada'}</p>
        <p><strong>Level:</strong> {employee.Level || 'No especificada'}</p>
        <p><strong>Role:</strong> {employee.Role || 'No especificada'}</p>
        <p><strong>Project:</strong> {employee.Project || 'No especificada'}</p>
        <p><strong>Status:</strong> {employee.Status || 'No especificada'}</p>
      </div>
      <div className="employees-actions">
        <button onClick={onEdit} className="edit-btn">Edit</button>
        <button onClick={onDelete} className="delete-btn">Delete</button>
      </div>
    </div>
  );
};

export default EmployeesItem;

