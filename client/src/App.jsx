// // src/App.jsx
// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import HomePage from './pages/HomePage';
// import SearchPage from './pages/SearchPage';
// import AddMoviePage from './pages/AddMoviePage';
// import EditMoviePage from './pages/EditMoviePage';
// import LoginPage from './pages/LoginPage';
// import RegisterPage from './pages/RegisterPage';
// import Navbar from './components/Navbar';
// import PrivateRoute from './components/PrivateRoute';

// function App() {
//   return (
//     <>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/search" element={<SearchPage />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/register" element={<RegisterPage />} />
//         <Route 
//           path="/admin/add" 
//           element={<PrivateRoute><AddMoviePage /></PrivateRoute>} 
//         />
//         <Route 
//           path="/admin/edit/:id" 
//           element={<PrivateRoute><EditMoviePage /></PrivateRoute>} 
//         />
//       </Routes>
//     </>
//   );
// }

// export default App;


import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import AddMoviePage from './pages/AddMoviePage';
import EditMoviePage from './pages/EditMoviePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* Protected route for any logged-in user */}
        <Route path="/profile" element={
            <PrivateRoute>
              <div>User Profile</div>
            </PrivateRoute>
          } 
        />
        {/* Admin-only routes */}
        <Route path="/admin/add" element={
            <AdminRoute>
              <AddMoviePage />
            </AdminRoute>
            } 
          />
        <Route path="/admin/edit/:id" element={
            <AdminRoute>
              <EditMoviePage />
            </AdminRoute>
          } 
        />
      </Routes>
    </>
  );
}

export default App;
