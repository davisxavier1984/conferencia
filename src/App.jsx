import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './layout';
import Register from './pages/Register';
import Admin from './pages/Admin';
import { Toaster } from './components/ui/toaster';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={
          <Layout currentPageName="Register">
            <Register />
          </Layout>
        } />
        <Route path="/register" element={
          <Layout currentPageName="Register">
            <Register />
          </Layout>
        } />
        <Route path="/admin" element={
          <Layout currentPageName="Admin">
            <Admin />
          </Layout>
        } />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
