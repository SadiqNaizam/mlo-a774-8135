import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import CommunicationsHubPage from "./pages/CommunicationsHubPage";
import CrewManagementPage from "./pages/CrewManagementPage";
import MissionsDashboardPage from "./pages/MissionsDashboardPage";
import StarMapOverviewPage from "./pages/StarMapOverviewPage";
import UserProfileSettingsPage from "./pages/UserProfileSettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();


const App = () => (
<QueryClientProvider client={queryClient}>
    <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
        <Routes>


          <Route path="/" element={<MissionsDashboardPage />} />
          <Route path="/communications-hub" element={<CommunicationsHubPage />} />
          <Route path="/crew-management" element={<CrewManagementPage />} />
          <Route path="/star-map-overview" element={<StarMapOverviewPage />} />
          <Route path="/user-profile-settings" element={<UserProfileSettingsPage />} />
          {/* catch-all */}
          <Route path="*" element={<NotFound />} />


        </Routes>
    </BrowserRouter>
    </TooltipProvider>
</QueryClientProvider>
);

export default App;
