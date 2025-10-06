import React from 'react';
import App from '@/components/Navbar';
import ExecutivePage from '@/components/ExecutivePage';

export default function TeamPage() {
  return (
    <div>
      <App />
      <div className="pt-16">
        <ExecutivePage />
      </div>
    </div>
  );
}