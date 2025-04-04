import React from 'react';
import EmployeeList from './components/EmployeeList';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Administrador de Empleados</h1>
      </header>
      <main>
        <EmployeeList />
      </main>
      <footer>
        <p>CRUD de Empleados © 2025</p>
      </footer>
    </div>
  );
}

export default App;