import React from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, BarChart, GitBranch, Copyright } from 'lucide-react';

const GlobalFooter: React.FC = () => {
  console.log('GlobalFooter loaded');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="fixed bottom-0 left-0 right-0 h-10 bg-gray-900 text-gray-500 border-t border-gray-700 z-40">
      <div className="container mx-auto px-4 flex h-full items-center justify-between text-xs">
        <div className="flex items-center gap-1">
          <Copyright className="h-3 w-3" />
          <span>{currentYear} Space Clone Inc. All rights reserved.</span>
        </div>
        <nav className="flex items-center gap-4">
          <Link to="/#" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
            <HelpCircle className="h-3 w-3" /> Help
          </Link>
          <Link to="/#" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
            <BarChart className="h-3 w-3" /> System Status
          </Link>
          <Link to="/#" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
            <GitBranch className="h-3 w-3" /> Version 0.1.0
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default GlobalFooter;