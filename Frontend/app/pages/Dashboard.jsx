"use client";

import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import BotDashboard from '../Dashboard/BotDashboard';

export default function Dashboard() {
  return (
    <DashboardLayout>
      <BotDashboard />
    </DashboardLayout>
  );
}
