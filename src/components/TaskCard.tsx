import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, UserCircle2 } from 'lucide-react';

// console.log('TaskCard.tsx component file loaded');

export type TaskPriority = 'low' | 'medium' | 'high' | 'critical';

export interface TaskCardProps {
  id: string;
  title: string;
  assignee?: {
    name: string;
    avatarUrl?: string | null;
  };
  dueDate?: string | null;
  priority: TaskPriority;
  onClick?: (id: string) => void;
  // className prop removed to avoid cn util dependency based on constraints
}

const priorityVisuals: Record<TaskPriority, { style: string; label: string }> = {
  critical: { style: "bg-red-600/90 border-red-500 text-red-100 hover:bg-red-600", label: "Critical" },
  high: { style: "bg-orange-500/90 border-orange-400 text-orange-100 hover:bg-orange-500", label: "High" },
  medium: { style: "bg-yellow-500/80 border-yellow-400 text-yellow-950 hover:bg-yellow-500", label: "Medium" },
  low: { style: "bg-sky-600/90 border-sky-500 text-sky-100 hover:bg-sky-600", label: "Low" },
};

const TaskCard: React.FC<TaskCardProps> = ({
  id,
  title,
  assignee,
  dueDate,
  priority,
  onClick,
}) => {
  console.log(`TaskCard loaded for task: ${title} (ID: ${id})`);

  const getInitials = (name: string): string => {
    if (!name) return '';
    return name
      .split(' ')
      .map(n => n[0])
      .filter(Boolean) // handle multiple spaces
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  const { style: priorityStyle, label: priorityLabel } = priorityVisuals[priority];

  return (
    <Card
      className={
        "w-full bg-neutral-800 text-neutral-100 border border-neutral-700 cursor-grab " +
        "transition-all duration-200 ease-in-out " +
        "hover:border-cyan-600 hover:shadow-[0_0_18px_2px_rgba(6,182,212,0.5)] " + // Cyan glow
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-800"
      }
      draggable="true"
      onClick={() => onClick?.(id)}
      onDragStart={(e) => {
        e.dataTransfer.setData('taskId', id);
        // Example: e.dataTransfer.effectAllowed = "move";
      }}
      data-task-id={id}
      tabIndex={0} // Make it focusable for keyboard interaction
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault(); // Prevent space from scrolling page
          onClick?.(id);
        }
      }}
    >
      <CardHeader className="pb-2 pt-3 px-3">
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="text-sm font-medium leading-tight line-clamp-3 text-neutral-50">
            {title}
          </CardTitle>
          <Badge
            className={`${priorityStyle} capitalize shrink-0 text-xs px-1.5 py-0.5 font-normal border`}
          >
            {priorityLabel}
          </Badge>
        </div>
      </CardHeader>
      
      {(dueDate || assignee?.name) && ( // Render CardContent only if there's data
        <CardContent className="pt-1 pb-3 px-3 space-y-1.5">
          {dueDate && (
            <div className="flex items-center text-xs text-neutral-400">
              <CalendarDays className="h-3.5 w-3.5 mr-1.5 shrink-0" />
              <span className="truncate">Due: {dueDate}</span>
            </div>
          )}
          {assignee?.name ? (
            <div className="flex items-center min-w-0"> {/* min-w-0 for truncate in flex */}
              <Avatar className="h-5 w-5 mr-1.5 shrink-0">
                {assignee.avatarUrl && <AvatarImage src={assignee.avatarUrl} alt={assignee.name} />}
                <AvatarFallback className="text-xs bg-neutral-700 text-neutral-300 border border-neutral-600">
                  {getInitials(assignee.name)}
                </AvatarFallback>
              </Avatar>
              <span className="text-xs text-neutral-300 truncate" title={assignee.name}>
                {assignee.name}
              </span>
            </div>
          ) : (
            <div className="flex items-center text-xs text-neutral-500">
              <UserCircle2 className="h-3.5 w-3.5 mr-1.5 shrink-0" />
              <span>Unassigned</span>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
};

export default TaskCard;