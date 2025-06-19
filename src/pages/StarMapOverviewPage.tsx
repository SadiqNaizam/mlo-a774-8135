import React from 'react';
import { Link } from 'react-router-dom'; // Though primary navigation is in GlobalHeader

// Custom layout components
import GlobalHeader from '@/components/layout/GlobalHeader';
import GlobalSidebar from '@/components/layout/GlobalSidebar';
import GlobalFooter from '@/components/layout/GlobalFooter';

// Custom page-specific component
import InteractiveStarChartCanvas from '@/components/InteractiveStarChartCanvas';

// Types for InteractiveStarChartCanvas (mirroring its internal type for sample data)
interface ProjectCelestialObject {
  id: string;
  name: string;
  type: 'star' | 'planet' | 'nebula' | 'galaxy' | 'anomaly';
  status: 'on-track' | 'at-risk' | 'completed' | 'upcoming' | 'critical';
  x: number; // percentage: 0-100
  y: number; // percentage: 0-100
  size: number; // relative size factor
  description?: string;
  crewCount?: number;
  progress?: number; // 0-100
  lastUpdate?: string;
}

// Placeholder data for InteractiveStarChartCanvas
const sampleProjects: ProjectCelestialObject[] = [
  { id: 'proj-alpha', name: 'Mission Alpha Centauri', type: 'star', status: 'on-track', x: 25, y: 30, size: 3, progress: 75, description: "Exploration of Proxima Centauri b.", crewCount: 5, lastUpdate: "2024-07-28" },
  { id: 'proj-orion', name: 'Orion Nebula Survey', type: 'nebula', status: 'at-risk', x: 60, y: 65, size: 5, progress: 40, description: "Mapping star formation regions.", crewCount: 12, lastUpdate: "2024-07-25" },
  { id: 'proj-mars', name: 'Ares Base Establishment', type: 'planet', status: 'completed', x: 80, y: 20, size: 2, progress: 100, description: "Phase 1 habitat online.", crewCount: 50, lastUpdate: "2024-06-15" },
  { id: 'proj-void', name: 'Anomaly XR-17 Investigation', type: 'anomaly', status: 'critical', x: 40, y: 80, size: 1, progress: 10, description: "Investigating unknown energy signature.", crewCount: 3, lastUpdate: "2024-07-29" },
  { id: 'proj-galaxy', name: 'Andromeda Reconnaissance', type: 'galaxy', status: 'upcoming', x: 10, y: 50, size: 4, progress: 0, description: "Long-range probe mission to M31.", crewCount: 2, lastUpdate: "2024-05-10" },
];

const StarMapOverviewPage: React.FC = () => {
  console.log('StarMapOverviewPage loaded');

  const handleProjectClick = (project: ProjectCelestialObject) => {
    console.log('Star Map project clicked:', project);
    // In a real application, this might navigate to a detailed view for the project:
    // navigate(`/missions/${project.id}`);
    // Or update a global state to show project details in a panel.
  };

  // The GlobalSidebar manages its own collapsed state.
  // For this page, we assume the sidebar is initially expanded (width 64 units, e.g. w-64 in Tailwind = 16rem = 256px).
  // The main content area needs a margin-left to accommodate the fixed sidebar.
  const initialSidebarCollapsed = false; // Set to true if you want the sidebar initially collapsed

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-neutral-100 pt-16 pb-10">
      {/* GlobalHeader is fixed, height is 4rem (16 in Tailwind) */}
      <GlobalHeader />

      <div className="flex flex-1 overflow-hidden">
        {/* GlobalSidebar is fixed, width is w-64 (expanded) or w-16 (collapsed) */}
        <GlobalSidebar initialCollapsed={initialSidebarCollapsed} />

        {/* Main content area */}
        {/* The ml-64 or ml-16 depends on the sidebar's width. */}
        {/* Since GlobalSidebar manages its own state, this margin is based on initialCollapsed. */}
        {/* If sidebar state were global or passed up, this margin could be dynamic. */}
        <main 
          className={`flex-1 p-4 md:p-6 overflow-y-auto transition-all duration-300 ease-in-out ${
            initialSidebarCollapsed ? 'ml-16' : 'ml-64'
          }`}
        >
          <section aria-labelledby="starmap-title" className="h-full">
            <h1 id="starmap-title" className="sr-only">StarMap Overview</h1>
            <p className="text-lg text-gray-400 mb-4">
              Welcome to the Star Map. Pan and zoom to explore active missions and projects. Click on a celestial object for more details.
            </p>
            <InteractiveStarChartCanvas 
              projects={sampleProjects} 
              onObjectClick={handleProjectClick}
              className="border border-gray-700 rounded-lg shadow-2xl" // Example additional styling
            />
          </section>
        </main>
      </div>

      {/* GlobalFooter is fixed, height is 2.5rem (10 in Tailwind) */}
      <GlobalFooter />
    </div>
  );
};

export default StarMapOverviewPage;