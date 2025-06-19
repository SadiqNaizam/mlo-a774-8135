import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Rocket, UserCircle, Settings, LogOut, Menu, Briefcase, Map, MessageSquare } from 'lucide-react';

const GlobalHeader: React.FC = () => {
  console.log('GlobalHeader loaded');

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
      isActive
        ? 'bg-gray-700 text-cyan-400'
        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
    }`;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-gray-900 text-gray-200 border-b border-gray-700 shadow-lg">
      <div className="container mx-auto px-4 flex h-full items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Rocket className="h-8 w-8 text-cyan-400" />
          <span className="text-xl font-bold tracking-wider">Space Clone</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-1">
          <NavLink to="/" className={navLinkClasses}>
            <Briefcase className="h-4 w-4" />
            Missions
          </NavLink>
          <NavLink to="/crew-management" className={navLinkClasses}>
            <UserCircle className="h-4 w-4" />
            Crew
          </NavLink>
          <NavLink to="/star-map-overview" className={navLinkClasses}>
            <Map className="h-4 w-4" />
            Star Map
          </NavLink>
          <NavLink to="/communications-hub" className={navLinkClasses}>
            <MessageSquare className="h-4 w-4" />
            Comms
          </NavLink>
        </nav>

        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-700">
                <UserCircle className="h-7 w-7 text-cyan-400" />
                <span className="sr-only">Open user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700 text-gray-200 w-48">
              <DropdownMenuLabel className="text-gray-400">My Account</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-700"/>
              <DropdownMenuItem asChild className="cursor-pointer hover:!bg-gray-700 hover:!text-cyan-400">
                <Link to="/user-profile-settings" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer hover:!bg-gray-700 hover:!text-red-400 flex items-center gap-2">
                <LogOut className="h-4 w-4" />
                <span>Log Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Mobile Menu Button - can be implemented later to toggle a mobile drawer */}
          <Button variant="ghost" size="icon" className="md:hidden hover:bg-gray-700">
            <Menu className="h-6 w-6 text-cyan-400" />
            <span className="sr-only">Open main menu</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default GlobalHeader;