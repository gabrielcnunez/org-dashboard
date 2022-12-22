import { Route, Routes } from 'react-router-dom';
import './App.css';
import Announcements from './Screens/Shared/Announcements';
import Login from './Screens/Shared/Login';
import CompanyScreen from './Screens/Admin/Company';
import Projects from './Screens/Admin/Projects';
import Users from './Screens/Admin/Users';
import Teams from './Screens/Admin/Teams';
import Project from './Screens/Worker/Project';

function App() {

  return (
    <div>
      <Routes >
        <Route path="/" element={<Login />} />
        <Route path="/announcements" element={<Announcements />} />
        <Route path="/company" element={<CompanyScreen />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/users" element={<Users />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/project" element={<Project />} />
      </Routes>
    </div>
  );
}

export default App;
