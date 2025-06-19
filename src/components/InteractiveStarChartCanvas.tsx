import React, { useState, useRef } from 'react';
import { motion, PanInfo } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Globe, Cloud, Sparkles, MilkyWay, Zap, ZoomIn, ZoomOut, LocateFixed, RotateCcw } from 'lucide-react';

interface ProjectCelestialObject {
  id: string;
  name: string;
  type: 'star' | 'planet' | 'nebula' | 'galaxy' | 'anomaly';
  status: 'on-track' | 'at-risk' | 'completed' | 'upcoming' | 'critical';
  x: number; // percentage: 0-100
  y: number; // percentage: 0-100
  size: number; // relative size factor, e.g., 1 to 5
  description?: string;
  crewCount?: number;
  progress?: number; // 0-100
  lastUpdate?: string;
}

interface InteractiveStarChartCanvasProps {
  projects: ProjectCelestialObject[];
  onObjectClick?: (project: ProjectCelestialObject) => void;
  initialZoom?: number;
  minZoom?: number;
  maxZoom?: number;
  className?: string;
}

const celestialIcons = {
  star: Star,
  planet: Globe,
  nebula: Cloud,
  galaxy: MilkyWay,
  anomaly: Zap,
};

const statusColors: Record<ProjectCelestialObject['status'], string> = {
  'on-track': 'border-green-500 ring-green-500/30',
  'at-risk': 'border-yellow-500 ring-yellow-500/30',
  'critical': 'border-red-600 ring-red-600/30 animate-pulse',
  'completed': 'border-blue-500 ring-blue-500/30',
  'upcoming': 'border-gray-500 ring-gray-500/30',
};

const statusBackgrounds: Record<ProjectCelestialObject['status'], string> = {
  'on-track': 'bg-green-500/20 hover:bg-green-500/30',
  'at-risk': 'bg-yellow-500/20 hover:bg-yellow-500/30',
  'critical': 'bg-red-600/20 hover:bg-red-600/30',
  'completed': 'bg-blue-500/20 hover:bg-blue-500/30',
  'upcoming': 'bg-gray-500/20 hover:bg-gray-500/30',
};


const InteractiveStarChartCanvas: React.FC<InteractiveStarChartCanvasProps> = ({
  projects,
  onObjectClick,
  initialZoom = 0.8,
  minZoom = 0.2,
  maxZoom = 3,
  className = '',
}) => {
  console.log('InteractiveStarChartCanvas loaded');
  const [scale, setScale] = useState(initialZoom);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleZoom = (zoomDirection: 'in' | 'out') => {
    setScale(prevScale => {
      const newScale = zoomDirection === 'in' ? prevScale * 1.2 : prevScale / 1.2;
      return Math.max(minZoom, Math.min(maxZoom, newScale));
    });
  };

  const handlePan = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setOffset(prevOffset => ({
      x: prevOffset.x + info.delta.x,
      y: prevOffset.y + info.delta.y,
    }));
  };

  const handleResetView = () => {
    setScale(initialZoom);
    setOffset({ x: 0, y: 0 });
  };

  const getObjectSize = (sizeFactor: number) => {
    const baseSize = 20; // px
    return baseSize + sizeFactor * 5; // e.g. size 1 = 25px, size 5 = 45px
  };

  return (
    <Card className={`w-full h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden relative select-none shadow-2xl bg-gray-900/50 ${className}`}>
      <div ref={canvasRef} className="w-full h-full cursor-grab active:cursor-grabbing relative">
        <motion.div
          className="absolute top-0 left-0 w-[200%] h-[200%]" // Larger draggable area to simulate vastness
          style={{
            x: offset.x,
            y: offset.y,
            scale,
            transformOrigin: 'center center', // Zoom from center of the view
          }}
          drag // Enable dragging
          dragConstraints={canvasRef} // Constrain dragging within the canvasRef bounds (approximately)
          onDrag={handlePan}
          dragElastic={0.1} // Some resistance at the edges
          dragTransition={{ power: 0.1, timeConstant: 200 }}
        >
          {/* Background elements like stars/grid could go here */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Example: Static starfield background. For performance, a real implementation might use a canvas texture or CSS pseudo-elements. */}
            {Array.from({ length: 200 }).map((_, i) => (
              <div
                key={`bg-star-${i}`}
                className="absolute rounded-full bg-slate-400/50"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 1.5 + 0.5}px`,
                  height: `${Math.random() * 1.5 + 0.5}px`,
                  opacity: Math.random() * 0.5 + 0.2,
                }}
              />
            ))}
          </div>


          {projects.map((project) => {
            const IconComponent = celestialIcons[project.type] || Star;
            const size = getObjectSize(project.size);
            const objectColorClass = statusColors[project.status] || statusColors['upcoming'];
            const objectBgClass = statusBackgrounds[project.status] || statusBackgrounds['upcoming'];

            return (
              <Tooltip key={project.id} delayDuration={100}>
                <TooltipTrigger asChild>
                  <motion.div
                    className={`absolute flex items-center justify-center rounded-full p-1 cursor-pointer
                                transform -translate-x-1/2 -translate-y-1/2
                                border-2 ${objectColorClass} ${objectBgClass}
                                transition-all duration-300 hover:ring-4 focus:outline-none focus:ring-4`}
                    style={{
                      left: `${project.x}%`,
                      top: `${project.y}%`,
                      width: `${size}px`,
                      height: `${size}px`,
                    }}
                    onClick={() => onObjectClick?.(project)}
                    whileHover={{ scale: 1.2 / scale }} // Counter-scale hover effect relative to current zoom
                    whileTap={{ scale: 1.1 / scale }}
                    aria-label={`Project: ${project.name}`}
                  >
                    <IconComponent className="w-3/5 h-3/5 text-white" strokeWidth={1.5} />
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent side="top" className="bg-gray-800 text-white border-slate-700 shadow-xl">
                  <div className="p-2 text-sm">
                    <h4 className="font-bold text-base mb-1">{project.name} ({project.type})</h4>
                    <p>Status: <span className={`font-semibold ${
                      project.status === 'critical' ? 'text-red-400' :
                      project.status === 'at-risk' ? 'text-yellow-400' :
                      project.status === 'on-track' ? 'text-green-400' :
                      project.status === 'completed' ? 'text-blue-400' : 'text-gray-400'
                    }`}>{project.status.replace('-', ' ')}</span></p>
                    {project.description && <p className="mt-1 text-xs text-gray-300">{project.description}</p>}
                    {project.crewCount !== undefined && <p>Crew: {project.crewCount}</p>}
                    {project.progress !== undefined && (
                      <div className="mt-1">
                        <p>Progress: {project.progress}%</p>
                        <div className="w-full bg-gray-600 rounded-full h-1.5 mt-0.5">
                          <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${project.progress}%` }}></div>
                        </div>
                      </div>
                    )}
                    {project.lastUpdate && <p className="text-xs text-gray-400 mt-1">Last Update: {project.lastUpdate}</p>}
                  </div>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </motion.div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-4 right-4 flex flex-col space-y-2 z-10">
        <Button variant="outline" size="icon" onClick={() => handleZoom('in')} aria-label="Zoom In" className="bg-gray-800/70 hover:bg-gray-700/90 border-slate-600 text-white">
          <ZoomIn className="h-5 w-5" />
        </Button>
        <Button variant="outline" size="icon" onClick={() => handleZoom('out')} aria-label="Zoom Out" className="bg-gray-800/70 hover:bg-gray-700/90 border-slate-600 text-white">
          <ZoomOut className="h-5 w-5" />
        </Button>
        <Button variant="outline" size="icon" onClick={handleResetView} aria-label="Reset View" className="bg-gray-800/70 hover:bg-gray-700/90 border-slate-600 text-white">
          <LocateFixed className="h-5 w-5" />
        </Button>
      </div>
    </Card>
  );
};

export default InteractiveStarChartCanvas;