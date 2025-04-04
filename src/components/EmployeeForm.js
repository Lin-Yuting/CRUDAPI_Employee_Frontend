import React, { useState, useEffect } from 'react';
import { createEmployee, updateEmployee } from '../services/api.js';

const EmployeeForm = ({ employee, onSubmitSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    atc: '',
    level: '',
    role: '',
    project: '',
    status: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.Name || '',
        email: employee.Email || '',
        atc: employee.ATC || '',
        level: employee.Level || '',
        role: employee.Role || '',
        project: employee.Project || '',
        status: employee.Status || ''
      });
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }; 
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      setError('El nombre del empleado es obligatorio');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      if (employee) {
        await updateEmployee(employee.id, formData);
      } else {
        await createEmployee(formData);
      }
      
      setFormData({ 
        name: '',
        email: '',
        atc: '',
        level: '',
        role: '',
        project: '',
        status: ''
      });
      if (onSubmitSuccess) onSubmitSuccess();
    } catch (err) {
      console.error('Error al guardar el empleado:', err);
      setError('Error al guardar el empleado');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="employee-form">
      {error && <div className="error">{error}</div>}
      
      <div className="form-group">
        <label htmlFor="name">Name*:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          disabled={submitting}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          disabled={submitting}
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="atc">ATC:</label>
        <input
          type="text"
          id="atc"
          name="atc"
          value={formData.atc}
          onChange={handleChange}
          disabled={submitting}
        />
      </div>

      <div className="form-group">
        <label htmlFor="level">Level:</label>
        <input
          type="number"
          id="level"
          name="level"
          value={formData.level}
          onChange={handleChange}
          disabled={submitting}
        />
      </div>

      <div className="form-group">
        <label htmlFor="role">Role:</label>
        <input
          type="text"
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          disabled={submitting}
        />
      </div>

      <div className="form-group">
        <label htmlFor="project">Project:</label>
        <input
          type="text"
          id="project"
          name="project"
          value={formData.project}
          onChange={handleChange}
          disabled={submitting}
        />
      </div>

      <div className="form-group">
        <label htmlFor="status">Status:</label>
        <input
          type="text"
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          disabled={submitting}
        />
      </div>
      
      <div className="form-actions">
        <button type="submit" disabled={submitting}>
          {submitting ? 'Guardando...' : employee ? 'Update' : 'Create'}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} disabled={submitting}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default EmployeeForm;
