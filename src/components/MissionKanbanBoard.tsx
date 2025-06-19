import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TaskCard from '@/components/TaskCard'; // Assuming TaskCard exists
import { Rocket, Orbit, CheckCircle2, PlusCircle } from 'lucide-react';

// Define the structure of a task
interface Task {
  id: string;
  title: string;
  assigneeAvatar?: string;
  dueDate?: string;
  priority?: 'low' | 'medium' | 'high';
  description?: string; // Added for potential TaskCard details
}

// Define the structure of a column
interface Column {
  id: string;
  title: string;
  icon: React.ElementType;
  tasks: Task[];
}

// Define the state for all columns
type ColumnsState = Record<string, Column>;

// Initial placeholder data for tasks and columns
const initialColumnsData: ColumnsState = {
  'launch-prep': {
    id: 'launch-prep',
    title: 'Launch Prep',
    icon: Rocket,
    tasks: [
      { id: 'task-1', title: 'Finalize Pre-Flight Checklist', priority: 'high', dueDate: '2024-08-15', description: 'Ensure all systems are go for launch.' },
      { id: 'task-2', title: 'Coordinate with Ground Control', priority: 'medium', dueDate: '2024-08-10', description: 'Establish communication link and protocols.' },
    ],
  },
  'in-orbit': {
    id: 'in-orbit',
    title: 'In Orbit',
    icon: Orbit,
    tasks: [
      { id: 'task-3', title: 'Deploy Solar Arrays', priority: 'high', dueDate: '2024-08-20', description: 'Unfurl and activate solar panels for power.' },
      { id: 'task-5', title: 'Calibrate Navigation Systems', priority: 'medium', dueDate: '2024-08-22', description: 'Fine-tune navigation for orbital path.' },
    ],
  },
  'mission-complete': {
    id: 'mission-complete',
    title: 'Mission Complete',
    icon: CheckCircle2,
    tasks: [
      { id: 'task-4', title: 'Transmit Final Report', priority: 'low', dueDate: '2024-09-01', description: 'Compile and send all mission data.' },
    ],
  },
};

// Props for TaskCard, assuming its structure based on <already-generated-components>
// This interface should ideally match the actual TaskCard props.
interface AssumedTaskCardProps {
  id: string;
  title: string;
  assigneeAvatar?: string;
  dueDate?: string;
  priority?: 'low' | 'medium' | 'high';
  description?: string;
  // onClick?: () => void; // If TaskCard handles its own click for details
}


const MissionKanbanBoard: React.FC = () => {
  console.log('MissionKanbanBoard loaded');
  const [columns, setColumns] = useState<ColumnsState>(initialColumnsData);
  const [draggedTask, setDraggedTask] = useState<{ task: Task; sourceColumnId: string } | null>(null);

  const handleDragStart = (task: Task, sourceColumnId: string) => {
    setDraggedTask({ task, sourceColumnId });
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault(); // Necessary to allow dropping
    // Optional: add visual feedback for drop target
    event.currentTarget.classList.add('bg-slate-700/50');
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.currentTarget.classList.remove('bg-slate-700/50');
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>, targetColumnId: string) => {
    event.preventDefault();
    event.currentTarget.classList.remove('bg-slate-700/50');

    if (!draggedTask || draggedTask.sourceColumnId === targetColumnId) {
      return;
    }

    const { task: taskToMove, sourceColumnId } = draggedTask;

    setColumns((prevColumns) => {
      const newColumns = { ...prevColumns };

      // Remove task from source column
      newColumns[sourceColumnId] = {
        ...newColumns[sourceColumnId],
        tasks: newColumns[sourceColumnId].tasks.filter((task) => task.id !== taskToMove.id),
      };

      // Add task to target column
      newColumns[targetColumnId] = {
        ...newColumns[targetColumnId],
        tasks: [...newColumns[targetColumnId].tasks, taskToMove],
      };

      return newColumns;
    });

    setDraggedTask(null);
    console.log(`Moved task "${taskToMove.title}" from ${sourceColumnId} to ${targetColumnId}`);
  };

  const handleAddNewTask = (columnId: string) => {
    // In a real app, this would open a dialog/modal for task creation
    console.log(`Add new task to column: ${columnId}`);
    // For demonstration, let's add a placeholder task
    const newTask: Task = {
      id: `task-${Date.now()}`,
      title: `New Task in ${columns[columnId].title}`,
      priority: 'medium',
      description: 'Newly created task, please fill details.',
    };
    setColumns(prev => ({
      ...prev,
      [columnId]: {
        ...prev[columnId],
        tasks: [...prev[columnId].tasks, newTask]
      }
    }));
  };
  
  // Function to handle clicking on a task card (e.g., to open a details modal)
  const handleTaskClick = (task: Task) => {
    console.log('Task clicked:', task);
    // Here you would typically open a Dialog or Sheet with task details/edit form
    // For example, using shadcn/ui Dialog:
    // setEditingTask(task); setIsDetailModalOpen(true);
  };


  return (
    <div className="p-4 md:p-6 bg-slate-900 text-gray-100 min-h-screen">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-cyan-400">Mission Kanban Board</h1>
        {/* A global "Add Task" button could go here, or per column */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.values(columns).map((column) => (
          <Card 
            key={column.id} 
            className="bg-slate-800 border-slate-700 shadow-xl flex flex-col"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, column.id)}
          >
            <CardHeader className="border-b border-slate-700 p-4">
              <CardTitle className="flex items-center text-xl text-sky-400">
                <column.icon className="mr-3 h-6 w-6 text-sky-500" />
                {column.title}
                <span className="ml-auto text-sm font-normal bg-slate-700 text-sky-300 px-2 py-1 rounded-full">
                  {column.tasks.length}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4 flex-grow min-h-[200px] transition-colors duration-200">
              {column.tasks.map((task) => (
                <div
                  key={task.id}
                  draggable // This div wrapper makes the TaskCard draggable
                  onDragStart={() => handleDragStart(task, column.id)}
                  onClick={() => handleTaskClick(task)} // Handle click on the wrapper
                  className="cursor-grab"
                >
                  <TaskCard
                    id={task.id}
                    title={task.title}
                    priority={task.priority}
                    dueDate={task.dueDate}
                    assigneeAvatar={task.assigneeAvatar}
                    description={task.description}
                    // Pass other props as needed by the actual TaskCard component
                  />
                </div>
              ))}
              {column.tasks.length === 0 && (
                <p className="text-slate-500 text-center py-4">No tasks in this stage.</p>
              )}
            </CardContent>
            <div className="p-4 border-t border-slate-700">
              <Button 
                variant="outline" 
                className="w-full text-sky-400 border-sky-500 hover:bg-sky-500 hover:text-slate-900"
                onClick={() => handleAddNewTask(column.id)}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New Task
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MissionKanbanBoard;