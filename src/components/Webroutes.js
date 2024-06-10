import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Insert from './Insert';
import Search from './Search';
import Delete from './Delete';
import Update from './Update';

const WebRoutes = () => (
  <Routes>
    <Route exact path="/" element={<Home />} />
    <Route path="/insert" element={<Insert />} />
    <Route path="/search" element={<Search />} />
    <Route path="/delete" element={<Delete />} />
    <Route path="/update" element={<Update />} />
  </Routes>
);

export default WebRoutes;
