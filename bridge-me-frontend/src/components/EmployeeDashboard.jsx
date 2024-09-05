import { useAuth } from '../context/AuthContext';

const EmployeeDashboard = () => {
  const { logout } = useAuth();
  return (
    <div>
      <h1>Employee Dashboard</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default EmployeeDashboard;
