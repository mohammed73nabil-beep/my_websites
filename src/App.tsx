/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import ProjectDetails from './pages/ProjectDetails';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import MySites from './pages/MySites';
import DashboardMessages from './pages/DashboardMessages';
import DashboardSettings from './pages/DashboardSettings';
import EditSite from './pages/EditSite';
import AboutUs from './pages/AboutUs';
import NotFound from './pages/NotFound';
import Contact from './pages/Contact';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public pages — with Header & Footer */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="marketplace" element={<Marketplace />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="project/:id" element={<ProjectDetails />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Dashboard pages — NO Header or Footer */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/sites" element={<MySites />} />
        <Route path="/dashboard/sites/:id" element={<EditSite />} />
        <Route path="/dashboard/messages" element={<DashboardMessages />} />
        <Route path="/dashboard/settings" element={<DashboardSettings />} />
      </Routes>
    </Router>
  );
}
