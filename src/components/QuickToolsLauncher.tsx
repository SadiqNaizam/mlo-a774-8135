import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Send, Rocket } from 'lucide-react';

interface QuickToolsLauncherProps {
  /**
   * Optional callback function to be invoked when the "Deploy Probe" (new task) action is triggered.
   * This function would typically handle opening a dialog or modal for task creation.
   */
  onDeployProbe?: () => void;
}

const QuickToolsLauncher: React.FC<QuickToolsLauncherProps> = ({ onDeployProbe }) => {
  console.log('QuickToolsLauncher loaded');

  const handleDeployProbeClick = () => {
    console.log("QuickToolsLauncher: 'Deploy Probe' (New Task) action initiated.");
    if (onDeployProbe) {
      onDeployProbe();
    } else {
      // This console warning is helpful for developers integrating this component.
      console.warn("QuickToolsLauncher: 'onDeployProbe' prop was not provided. 'Deploy Probe' action might not be fully functional.");
      // Optionally, provide some fallback UI feedback if desired, e.g., an alert or toast.
      // alert("'Deploy Probe' functionality is not fully configured. Please contact support or check component props.");
    }
  };

  return (
    <div className="p-2 space-y-1 bg-neutral-800/30 rounded-md"> {/* Added a subtle background and rounded corners */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            className="w-full justify-start text-neutral-300 hover:text-neutral-100 hover:bg-neutral-700/60 focus-visible:ring-offset-neutral-800"
            asChild
          >
            <Link to="/communications-hub" className="flex items-center p-2 text-sm w-full">
              <Send className="h-4 w-4 mr-3 flex-shrink-0" />
              <span className="truncate">New Transmission</span>
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right" align="center" sideOffset={5} className="bg-neutral-900 text-neutral-200 border-neutral-700">
          <p>Open Communications Hub</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            className="w-full justify-start text-neutral-300 hover:text-neutral-100 hover:bg-neutral-700/60 p-2 text-sm focus-visible:ring-offset-neutral-800"
            onClick={handleDeployProbeClick}
          >
            <Rocket className="h-4 w-4 mr-3 flex-shrink-0" />
            <span className="truncate">Deploy Probe</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right" align="center" sideOffset={5} className="bg-neutral-900 text-neutral-200 border-neutral-700">
          <p>Create New Task</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default QuickToolsLauncher;