"use client";

import React from 'react';
import DashboardLayout from '../../src/layouts/DashboardLayout';
import BotDashboard from '../../src/Dashboard/BotDashboard';

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <BotDashboard />
    </DashboardLayout>
  );
}
