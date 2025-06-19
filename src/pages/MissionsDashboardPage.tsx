import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Used by some custom components, good to have if needed directly

// Custom Layout Components
import GlobalHeader from '@/components/layout/GlobalHeader';
import GlobalSidebar from '@/components/layout/GlobalSidebar';
import GlobalFooter from '@/components/layout/GlobalFooter';

// Custom Page-Specific Components
import MissionKanbanBoard from '@/components/MissionKanbanBoard';
// TaskCard is used internally by MissionKanbanBoard

// Shadcn/ui Components
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Icons
import { PlusCircle } from 'lucide-react';

// Define placeholder task structure for the dialog form
interface DialogTaskFormState {
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  dueDate: string;
  // assigneeName: string; // Simplified for example
}

const initialDialogFormState: DialogTaskFormState = {
  title: '',
  description: '',
  priority: 'medium',
  dueDate: '',
  // assigneeName: '',
};

const MissionsDashboardPage: React.FC = () => {
  console.log('MissionsDashboardPage loaded');
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [taskFormData, setTaskFormData] = useState<DialogTaskFormState>(initialDialogFormState);

  useEffect(() => {
    // Reset form when dialog closes
    if (!isTaskDialogOpen) {
      setTaskFormData(initialDialogFormState);
    }
  }, [isTaskDialogOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setTaskFormData(prev => ({ ...prev, [id]: value }));
  };

  const handlePriorityChange = (value: DialogTaskFormState['priority']) => {
    setTaskFormData(prev => ({ ...prev, priority: value }));
  };

  const handleCreateTask = () => {
    // In a real app, you would send this data to a backend or state management solution
    console.log('New Task Data:', taskFormData);
    // For MissionKanbanBoard to update, it would need a way to receive new tasks or refetch.
    // Since MissionKanbanBoard manages its own state, this dialog won't directly add to it without further integration.
    setIsTaskDialogOpen(false);
  };
  
  // Placeholder for selected project/mission from sidebar - not fully wired due to component constraints
  const [currentMissionId, setCurrentMissionId] = useState<string | null>('mission-alpha');
  const sampleMissions = [
    { id: 'mission-alpha', name: 'Mission Alpha Centauri' },
    { id: 'project-goliath', name: 'Project Goliath Station' },
  ];

  const handleSelectMission = (missionId: string) => {
    console.log('Mission selected in Page:', missionId);
    setCurrentMissionId(missionId);
    // Potentially trigger data reload for MissionKanbanBoard here if it accepted props for mission ID
  };

  const openNewTaskDialog = () => {
    console.log('Opening new task dialog from page');
    setTaskFormData(initialDialogFormState); // Reset form for new task
    setIsTaskDialogOpen(true);
  };


  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-neutral-100">
      <GlobalHeader />
      {/* GlobalSidebar uses its own internal state for projects and quick tools wiring */}
      {/* To make it fully dynamic from page, GlobalSidebar would need to accept props like: */}
      {/* projects={sampleMissions} activeProjectId={currentMissionId} onSelectProject={handleSelectMission} onDeployProbe={openNewTaskDialog} */}
      <GlobalSidebar /> {/* It's fixed and will overlay correctly. Manages its own width. */}
      
      {/* Main content area, offset for expanded sidebar (w-64 -> pl-64) */}
      {/* If sidebar collapses (w-16), this will result in extra left margin. */}
      <div className="pl-64 flex-1 flex flex-col"> {/* Offset for expanded sidebar */}
        <ScrollArea className="flex-1 bg-slate-900 text-gray-100 pt-16 pb-10"> {/* pt for header, pb for footer */}
          <main className="p-6"> {/* Inner padding for content */}
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-cyan-400">Mission Control Dashboard</h1>
              <Button onClick={openNewTaskDialog} className="bg-sky-500 hover:bg-sky-600 text-white">
                <PlusCircle className="mr-2 h-4 w-4" /> Create New Task
              </Button>
            </div>
            
            {/* MissionKanbanBoard uses its own internal data and logic. */}
            {/* To connect the dialog above, MissionKanbanBoard would need to be refactored or use a global state. */}
            <MissionKanbanBoard />
          </main>
        </ScrollArea>
      </div>
      
      <GlobalFooter />

      {/* Dialog for Creating New Task */}
      <Dialog open={isTaskDialogOpen} onOpenChange={setIsTaskDialogOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 text-neutral-100 sm:max-w-[425px] md:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-sky-400">Create New Mission Task</DialogTitle>
            <DialogDescription className="text-neutral-400">
              Fill in the details for the new task. It will appear on the Kanban board.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right text-neutral-300">Title</Label>
              <Input id="title" value={taskFormData.title} onChange={handleInputChange} placeholder="E.g., Deploy satellite" className="col-span-3 bg-slate-700 border-slate-600 text-neutral-100 placeholder-slate-400" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right text-neutral-300">Description</Label>
              <Textarea id="description" value={taskFormData.description} onChange={handleInputChange} placeholder="Detailed description of the task..." className="col-span-3 bg-slate-700 border-slate-600 text-neutral-100 placeholder-slate-400" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="priority" className="text-right text-neutral-300">Priority</Label>
              <Select value={taskFormData.priority} onValueChange={handlePriorityChange}>
                <SelectTrigger id="priority" className="col-span-3 bg-slate-700 border-slate-600 text-neutral-100">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700 text-neutral-100">
                  <SelectItem value="low" className="focus:bg-slate-700">Low</SelectItem>
                  <SelectItem value="medium" className="focus:bg-slate-700">Medium</SelectItem>
                  <SelectItem value="high" className="focus:bg-slate-700">High</SelectItem>
                  <SelectItem value="critical" className="focus:bg-slate-700">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dueDate" className="text-right text-neutral-300">Due Date</Label>
              <Input id="dueDate" type="date" value={taskFormData.dueDate} onChange={handleInputChange} className="col-span-3 bg-slate-700 border-slate-600 text-neutral-100" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsTaskDialogOpen(false)} className="text-neutral-300 border-neutral-600 hover:bg-neutral-700 hover:border-neutral-500">Cancel</Button>
            <Button onClick={handleCreateTask} className="bg-sky-500 hover:bg-sky-600 text-white">Create Task</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MissionsDashboardPage;