import React, { useState } from 'react';
// Link is not directly used on this page content for navigation, GlobalHeader handles it.
// import { Link } from 'react-router-dom'; 

// Custom Layout Components
import GlobalHeader from '@/components/layout/GlobalHeader';
import GlobalSidebar from '@/components/layout/GlobalSidebar';
import GlobalFooter from '@/components/layout/GlobalFooter';

// Shadcn UI Components
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Icons
import { UserPlus, Users, Mail, Edit3, Trash2 } from 'lucide-react';

interface CrewMember {
  id: string;
  name: string;
  avatarUrl?: string;
  role: string;
  status: 'Active' | 'Pending' | 'Inactive';
  email: string;
  joinedDate: string;
}

const sampleCrew: CrewMember[] = [
  { id: 'cm1', name: 'Captain Eva Rostova', avatarUrl: 'https://avatar.iran.liara.run/public/girl?username=EvaRostova', role: 'Mission Commander', status: 'Active', email: 'eva.r@spaceclone.com', joinedDate: '2023-01-15' },
  { id: 'cm2', name: 'Dr. Aris Thorne', avatarUrl: 'https://avatar.iran.liara.run/public/boy?username=ArisThorne', role: 'Chief Science Officer', status: 'Active', email: 'aris.t@spaceclone.com', joinedDate: '2023-02-20' },
  { id: 'cm3', name: 'Jax "Sparky" Volkov', role: 'Lead Engineer', status: 'Active', email: 'jax.v@spaceclone.com', joinedDate: '2023-03-10' },
  { id: 'cm4', name: 'Lyra Nova', avatarUrl: 'https://avatar.iran.liara.run/public/girl?username=LyraNova', role: 'Comms Specialist', status: 'Pending', email: 'lyra.n@newcrew.com', joinedDate: 'N/A (Invited)' },
  { id: 'cm5', name: 'Rook "Cipher" Valerius', role: 'Security Chief', status: 'Inactive', email: 'rook.v@spaceclone.com', joinedDate: '2022-11-05' },
];


const CrewManagementPage = () => {
  console.log('CrewManagementPage loaded');
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [crewMembers, setCrewMembers] = useState<CrewMember[]>(sampleCrew);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('');


  const getInitials = (name: string): string => {
    if (!name) return '??';
    return name
      .split(' ')
      .map(n => n[0])
      .filter(Boolean)
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  const handleInviteSubmit = () => {
    if (!inviteEmail) {
      // In a real app, use Sonner for toasts or form validation messages
      alert("Please enter an email address.");
      return;
    }
    console.log(`Inviting new member: Email - ${inviteEmail}, Role - ${inviteRole || 'Not specified'}`);
    
    const newMember: CrewMember = {
      id: `cm-${Date.now()}`,
      name: 'Invited Member', // Placeholder name, could be derived from email or ask for name
      email: inviteEmail,
      role: inviteRole || 'Awaiting Role',
      status: 'Pending',
      joinedDate: 'N/A (Invited)',
    };
    setCrewMembers(prev => [...prev, newMember]);
    
    setInviteEmail(''); 
    setInviteRole('');
    setIsInviteDialogOpen(false); 
    // Example: toast.success(`Invitation sent to ${inviteEmail}`); (using Sonner)
  };

  const getStatusBadgeVariant = (status: CrewMember['status']): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case 'Active':
        return 'default'; 
      case 'Pending':
        return 'secondary'; 
      case 'Inactive':
        return 'outline'; 
      default:
        return 'secondary';
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-900 text-neutral-100">
      <GlobalHeader />
      <div className="flex flex-1"> {/* Container for sidebar and main content */}
        <GlobalSidebar /> {/* Sidebar is fixed positioned by its own styles */}
        
        {/* Main content area: Adjust pl for sidebar width. pt for header, pb for footer. */}
        {/* pl-16 for collapsed sidebar (w-16), md:pl-64 for expanded sidebar (w-64) */}
        <main className="flex-1 pt-16 pb-10 pl-16 md:pl-64 transition-all duration-300 ease-in-out overflow-y-auto">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
                <h1 className="text-3xl font-bold text-cyan-400 flex items-center mb-4 sm:mb-0">
                  <Users className="mr-3 h-8 w-8 flex-shrink-0" /> Crew Management
                </h1>
                <DialogTrigger asChild>
                  <Button className="bg-cyan-500 hover:bg-cyan-600 text-slate-900 shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5">
                    <UserPlus className="mr-2 h-5 w-5" /> Invite New Member
                  </Button>
                </DialogTrigger>
              </div>

              <div className="bg-slate-800 shadow-xl rounded-lg border border-slate-700 overflow-x-auto">
                <Table>
                  <TableCaption className="text-neutral-400 py-4">
                    A list of your current project crew members.
                    {crewMembers.length === 0 && " No crew members yet. Invite some!"}
                  </TableCaption>
                  <TableHeader>
                    <TableRow className="border-b-slate-700 hover:bg-slate-700/30">
                      <TableHead className="py-3 px-4 text-left text-xs font-medium text-sky-400 uppercase tracking-wider whitespace-nowrap">Member</TableHead>
                      <TableHead className="py-3 px-4 text-left text-xs font-medium text-sky-400 uppercase tracking-wider whitespace-nowrap">Role</TableHead>
                      <TableHead className="py-3 px-4 text-left text-xs font-medium text-sky-400 uppercase tracking-wider whitespace-nowrap">Status</TableHead>
                      <TableHead className="py-3 px-4 text-left text-xs font-medium text-sky-400 uppercase tracking-wider whitespace-nowrap hidden md:table-cell">Email</TableHead>
                      <TableHead className="py-3 px-4 text-left text-xs font-medium text-sky-400 uppercase tracking-wider whitespace-nowrap hidden lg:table-cell">Joined</TableHead>
                      <TableHead className="py-3 px-4 text-right text-xs font-medium text-sky-400 uppercase tracking-wider whitespace-nowrap">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="divide-y divide-slate-700">
                    {crewMembers.map((member) => (
                      <TableRow key={member.id} className="hover:bg-slate-750/50 transition-colors">
                        <TableCell className="py-4 px-4 whitespace-nowrap">
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-10 w-10 border-2 border-slate-600 flex-shrink-0">
                              <AvatarImage src={member.avatarUrl} alt={member.name} />
                              <AvatarFallback className="bg-slate-700 text-sky-300 font-semibold">
                                {getInitials(member.name)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium text-neutral-100">{member.name}</span>
                          </div>
                        </TableCell>
                        <TableCell className="py-4 px-4 text-neutral-300 whitespace-nowrap">{member.role}</TableCell>
                        <TableCell className="py-4 px-4 whitespace-nowrap">
                          <Badge variant={getStatusBadgeVariant(member.status)} className="capitalize text-xs px-2 py-0.5">
                            {member.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="py-4 px-4 text-neutral-400 whitespace-nowrap hidden md:table-cell">{member.email}</TableCell>
                        <TableCell className="py-4 px-4 text-neutral-400 whitespace-nowrap hidden lg:table-cell">{member.joinedDate}</TableCell>
                        <TableCell className="py-4 px-4 text-right whitespace-nowrap">
                          <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-cyan-400 mr-1" aria-label={`Edit ${member.name}`}>
                            <Edit3 className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-red-500" aria-label={`Remove ${member.name}`}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <DialogContent className="sm:max-w-md bg-slate-800 border-slate-700 text-neutral-100 shadow-2xl">
                <DialogHeader>
                  <DialogTitle className="text-cyan-400 flex items-center">
                    <Mail className="mr-2 h-5 w-5 flex-shrink-0"/> Invite New Crew Member
                  </DialogTitle>
                  <DialogDescription className="text-neutral-400 pt-1">
                    Enter their email address and optionally assign a role. They will receive an invitation to join.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="invite-email" className="text-neutral-300 font-medium">
                      Email Address
                    </Label>
                    <Input 
                      id="invite-email" 
                      type="email" 
                      placeholder="e.g., new.pilot@spaceclone.com" 
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      className="bg-slate-700 border-slate-600 text-neutral-100 placeholder-neutral-500 focus:ring-cyan-500 focus:border-cyan-500" 
                    />
                  </div>
                  <div className="space-y-2">
                     <Label htmlFor="invite-role" className="text-neutral-300 font-medium">
                      Assign Role (Optional)
                    </Label>
                    <Input 
                      id="invite-role" 
                      placeholder="e.g., Navigator, Engineer" 
                      value={inviteRole}
                      onChange={(e) => setInviteRole(e.target.value)}
                      className="bg-slate-700 border-slate-600 text-neutral-100 placeholder-neutral-500 focus:ring-cyan-500 focus:border-cyan-500" 
                    />
                  </div>
                </div>
                <DialogFooter className="flex flex-col sm:flex-row sm:justify-between gap-2 pt-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsInviteDialogOpen(false)}
                    className="w-full sm:w-auto text-neutral-300 border-neutral-600 hover:bg-neutral-700 hover:border-neutral-500"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="button" 
                    onClick={handleInviteSubmit} 
                    className="w-full sm:w-auto bg-cyan-500 hover:bg-cyan-600 text-slate-900"
                  >
                    <UserPlus className="mr-2 h-4 w-4" /> Send Invitation
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </main>
      </div>
      <GlobalFooter />
    </div>
  );
};

export default CrewManagementPage;