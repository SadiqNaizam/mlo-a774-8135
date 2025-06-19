import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Rocket, Search } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming utils.ts exists for cn

// Define the Project type
interface Project {
  id: string;
  name: string;
  // Add other project-specific properties if needed, e.g., icon or status
}

// Define the props for the SidebarProjectNavigator component
interface SidebarProjectNavigatorProps {
  projects: Project[];
  activeProjectId?: string | null;
  onSelectProject: (projectId: string) => void;
  className?: string;
}

const SidebarProjectNavigator: React.FC<SidebarProjectNavigatorProps> = ({
  projects = [], // Default to empty array to prevent errors if undefined
  activeProjectId,
  onSelectProject,
  className,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    console.log('SidebarProjectNavigator loaded');
  }, []);

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={cn("flex flex-col h-full p-4 bg-neutral-900 text-neutral-200 space-y-4", className)}>
      <h2 className="text-lg font-semibold text-sky-400 tracking-wider px-2">MISSIONS</h2>
      
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-500" />
        <Input
          type="search"
          placeholder="Search missions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-3 py-2 w-full bg-neutral-800 border-neutral-700 text-neutral-200 placeholder-neutral-500 focus:ring-sky-500 focus:border-sky-500 rounded-md"
        />
      </div>

      <ScrollArea className="flex-grow">
        <div className="space-y-1 pr-2">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <Button
                key={project.id}
                variant="ghost"
                onClick={() => onSelectProject(project.id)}
                className={cn(
                  "w-full justify-start items-center text-sm font-medium py-2 px-3 rounded-md transition-all duration-150 ease-in-out",
                  "text-neutral-300 hover:bg-neutral-700/50 hover:text-sky-300",
                  activeProjectId === project.id && "bg-sky-700/30 text-sky-300 border-l-2 border-sky-400"
                )}
                title={`Select mission: ${project.name}`}
              >
                <Rocket className="mr-3 h-4 w-4 flex-shrink-0 text-sky-500" />
                <span className="truncate">{project.name}</span>
              </Button>
            ))
          ) : (
            <p className="text-sm text-neutral-500 px-3 py-2">No missions found.</p>
          )}
        </div>
      </ScrollArea>
      
      {/* Example of a placeholder for future actions if needed */}
      {/* <div className="mt-auto border-t border-neutral-700 pt-2">
        <Button variant="outline" className="w-full border-sky-600 text-sky-400 hover:bg-sky-600/20 hover:text-sky-300">
          <PlusCircle className="mr-2 h-4 w-4" /> New Mission
        </Button>
      </div> */}
    </div>
  );
};

export default SidebarProjectNavigator;

// Example usage (would be in a parent component like GlobalSidebar):
/*
const ParentComponent = () => {
  const [currentProjectId, setCurrentProjectId] = useState<string | null>('mission-alpha');
  const sampleProjects: Project[] = [
    { id: 'mission-alpha', name: 'Mission Alpha Centauri' },
    { id: 'project-goliath', name: 'Project Goliath Station' },
    { id: 'voyage-nebula', name: 'Voyage to Nebula X' },
    { id: 'deep-star-one', name: 'Deep Star One Survey' },
    { id: 'ares-colony', name: 'Ares Prime Colony' },
  ];

  const handleProjectSelect = (projectId: string) => {
    console.log('Selected Project ID:', projectId);
    setCurrentProjectId(projectId);
    // Here you would typically update global state or fetch new data for the dashboard
  };

  return (
    <div style={{ width: '300px', height: '600px', backgroundColor: '#111' }}>
      <SidebarProjectNavigator
        projects={sampleProjects}
        activeProjectId={currentProjectId}
        onSelectProject={handleProjectSelect}
      />
    </div>
  );
};
*/