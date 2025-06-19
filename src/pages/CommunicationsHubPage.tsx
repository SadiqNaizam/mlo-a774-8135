import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Custom Layout Components
import GlobalHeader from '@/components/layout/GlobalHeader';
import GlobalSidebar from '@/components/layout/GlobalSidebar';
import GlobalFooter from '@/components/layout/GlobalFooter';

// Shadcn/ui Components
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Icons
import { MessageSquare, Send } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: string;
  avatarUrl?: string;
  avatarFallback: string;
  text: string;
  timestamp: string;
  isOwnMessage: boolean;
}

const initialMessages: ChatMessage[] = [
  {
    id: '1',
    sender: 'Cmdr. Eva Rostova',
    avatarUrl: 'https://placekitten.com/g/40/40?image=1',
    avatarFallback: 'ER',
    text: "Mission Control, can you confirm the telemetry link for Sector Gamma is stable? We're seeing some fluctuations.",
    timestamp: '10:30 AM',
    isOwnMessage: false,
  },
  {
    id: '2',
    sender: 'Mission Control (You)',
    avatarUrl: 'https://placekitten.com/g/41/41?image=2',
    avatarFallback: 'MC',
    text: 'Copy that, Commander. Running diagnostics on Gamma telemetry now. Stand by for update.',
    timestamp: '10:31 AM',
    isOwnMessage: true,
  },
  {
    id: '3',
    sender: 'Cmdr. Eva Rostova',
    avatarUrl: 'https://placekitten.com/g/40/40?image=1',
    avatarFallback: 'ER',
    text: 'Acknowledged. Also, the new asteroid scanning module is online. Preliminary data looks promising.',
    timestamp: '10:35 AM',
    isOwnMessage: false,
  },
  {
    id: '4',
    sender: 'Lt. Jax "Sparky" Volkov',
    avatarUrl: 'https://placekitten.com/g/42/42?image=3',
    avatarFallback: 'JV',
    text: 'Just finished recalibrating the long-range comms array. Signal strength should be optimal now.',
    timestamp: '10:40 AM',
    isOwnMessage: false,
  },
];

const CommunicationsHubPage: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    console.log('CommunicationsHubPage loaded');
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      sender: 'Mission Control (You)',
      avatarUrl: 'https://placekitten.com/g/41/41?image=2',
      avatarFallback: 'MC',
      text: newMessage.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOwnMessage: true,
    };
    setMessages([...messages, message]);
    setNewMessage('');
    // TODO: Scroll to bottom of messages
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-200">
      <GlobalHeader />
      <div className="flex flex-1 pt-16 pb-10"> {/* Account for fixed header (h-16) and footer (h-10) */}
        <GlobalSidebar initialCollapsed={false} /> {/* Sidebar width is w-64 by default */}
        
        <main className="flex-1 ml-64 p-4 md:p-6 overflow-y-hidden"> {/* Adjust ml if sidebar width changes */}
          <ScrollArea className="h-full pr-2"> {/* Main content scroll area */}
            <div className="max-w-4xl mx-auto h-full flex flex-col">
              <Card className="bg-gray-800 border-gray-700 shadow-xl flex flex-col flex-grow">
                <CardHeader className="border-b border-gray-700 p-4">
                  <CardTitle className="text-sky-400 flex items-center text-xl">
                    <MessageSquare className="mr-3 h-6 w-6" />
                    Team Communications Stream
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="p-0 flex flex-col flex-grow overflow-hidden">
                  {/* Message List Area */}
                  <ScrollArea className="flex-grow p-4">
                    <div className="space-y-4">
                      {messages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex items-end space-x-3 ${msg.isOwnMessage ? 'justify-end' : ''}`}
                        >
                          {!msg.isOwnMessage && (
                            <Avatar className="h-8 w-8 flex-shrink-0">
                              <AvatarImage src={msg.avatarUrl} alt={msg.sender} />
                              <AvatarFallback className="text-xs">{msg.avatarFallback}</AvatarFallback>
                            </Avatar>
                          )}
                          <div
                            className={`max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-lg shadow ${
                              msg.isOwnMessage
                                ? 'bg-sky-700 text-gray-100 rounded-br-none'
                                : 'bg-gray-700 text-gray-200 rounded-bl-none'
                            }`}
                          >
                            {!msg.isOwnMessage && (
                              <p className="text-xs font-semibold text-sky-300 mb-0.5">{msg.sender}</p>
                            )}
                            <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                            <p className={`text-xs mt-1 ${msg.isOwnMessage ? 'text-sky-300 text-left' : 'text-gray-500 text-right'}`}>
                              {msg.timestamp}
                            </p>
                          </div>
                          {msg.isOwnMessage && (
                            <Avatar className="h-8 w-8 flex-shrink-0">
                              <AvatarImage src={msg.avatarUrl} alt={msg.sender} />
                              <AvatarFallback className="text-xs">{msg.avatarFallback}</AvatarFallback>
                            </Avatar>
                          )}
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  
                  {/* Input Area */}
                  <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-700 bg-gray-800">
                    <div className="flex items-center space-x-2">
                      <Input 
                        type="text" 
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Transmit message to crew..." 
                        className="flex-grow bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400 focus:ring-sky-500 focus:border-sky-500 rounded-md" 
                        aria-label="Message input"
                      />
                      <Button type="submit" variant="default" className="bg-sky-600 hover:bg-sky-500 text-white px-4 py-2 rounded-md">
                        <Send className="h-4 w-4 sm:mr-2" />
                        <span className="hidden sm:inline">Send</span>
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </ScrollArea>
        </main>
      </div>
      <GlobalFooter />
    </div>
  );
};

export default CommunicationsHubPage;