import React, { useState, useEffect } from 'react';
import { getEmployees, deleteEmployee } from '../services/api.js';
import EmployeeItem from './EmployeeItem';
import EmployeeForm from './EmployeeForm';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const data = await getEmployees();
      setEmployees(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar los Empleados');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este empleado?')) {
      try {
        await deleteEmployee(id);
        setEmployees(employees.filter(employees => employees.id !== id));
      } catch (err) {
        setError('Error al eliminar el empleado');
      }
    }
  };

  const handleEdit = (id) => {
    setEditingId(id);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const handleFormSubmit = () => {
    fetchEmployees();
    setEditingId(null);
  };

  if (loading) return <div>Cargando empleados...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="employee-list">
      <h2>Lista de Empleados</h2>
      
      {!editingId && (
        <div className="new-employee">
          <h3>Agregar Nuevo Empleado</h3>
          <EmployeeForm onSubmitSuccess={handleFormSubmit} />
        </div>
      )}

      <div className="employees">
        {employees.length === 0 ? (
          <p>No hay Empleados registrados.</p>
        ) : (
          employees.map(employee => (
            <div key={employee.id}>
              {editingId === employee.id ? (
                <div className="edit-form">
                  <h3>Editar Empleado</h3>
                  <EmployeeForm 
                    employee={employee} 
                    onSubmitSuccess={handleFormSubmit} 
                    onCancel={handleCancelEdit} 
                  />
                </div>
              ) : (
                <EmployeeItem 
                  employee={employee} 
                  onDelete={() => handleDelete(employee.id)} 
                  onEdit={() => handleEdit(employee.id)} 
                />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EmployeeList;