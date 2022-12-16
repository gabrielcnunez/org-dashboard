import { Route, Routes } from 'react-router-dom';
import './App.css';
import Announcements from './Screens/Admin/Announcements';
import Login from './Screens/Shared/Login';
import CompanyScreen from './Screens/Admin/Company';

function App() {

  return (
    <div style={{ color: "#1ba098", background: "#051622" }}>
      <Routes >
        <Route path="/" element={<Login />} />
        <Route path="/announcements" element={<Announcements />} />
        <Route path="/company" element={<CompanyScreen />} />
      </Routes>
    </div>
  );
}

export default App;
