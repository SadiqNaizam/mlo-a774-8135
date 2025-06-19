import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, PanelLeftClose, PanelRightClose, Zap, Compass } from 'lucide-react';
import SidebarProjectNavigator from '@/components/SidebarProjectNavigator'; // Assuming this path
import QuickToolsLauncher from '@/components/QuickToolsLauncher'; // Assuming this path

interface GlobalSidebarProps {
  initialCollapsed?: boolean;
}

const GlobalSidebar: React.FC<GlobalSidebarProps> = ({ initialCollapsed = false }) => {
  console.log('GlobalSidebar loaded');
  const [isCollapsed, setIsCollapsed] = useState(initialCollapsed);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    <aside
      className={`fixed top-16 left-0 h-[calc(100vh-4rem-2.5rem)] SScrolly-auto Sbg-gray-850 Stext-gray-300 Sborder-r Sborder-gray-700 Stransition-all Sduration-300 Sease-in-out flex flex-col
      bg-gray-800 text-gray-300 border-r border-gray-700 shadow-lg
      ${isCollapsed ? 'w-16' : 'w-64'}`}
    >
      <div className="flex-grow p-3 space-y-6 overflow-y-auto">
        <div>
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} mb-4`}>
            {!isCollapsed && <h3 className="text-sm font-semibold uppercase text-cyan-500 tracking-wider">Projects</h3>}
          </div>
          {/* Pass isCollapsed prop if SidebarProjectNavigator needs to adapt */}
          <SidebarProjectNavigator isCollapsed={isCollapsed} />
        </div>

        <hr className="border-gray-700" />

        <div>
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} mb-4`}>
            {!isCollapsed && <h3 className="text-sm font-semibold uppercase text-cyan-500 tracking-wider">Quick Tools</h3>}
             {isCollapsed && <Zap className="h-5 w-5 text-cyan-400 mx-auto" />}
          </div>
          {/* Pass isCollapsed prop if QuickToolsLauncher needs to adapt */}
          <QuickToolsLauncher isCollapsed={isCollapsed} />
        </div>
      </div>

      <div className="p-2 border-t border-gray-700">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleSidebar}
          className="w-full flex items-center justify-center text-gray-400 hover:bg-gray-700 hover:text-cyan-400"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <PanelRightClose className="h-5 w-5" /> : <PanelLeftClose className="h-5 w-5" />}
          {!isCollapsed && <span className="ml-2 text-xs">Collapse</span>}
        </Button>
      </div>
    </aside>
  );
};

export default GlobalSidebar;