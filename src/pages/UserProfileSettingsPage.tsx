import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

// Custom Layout Components
import GlobalHeader from '@/components/layout/GlobalHeader';
import GlobalSidebar from '@/components/layout/GlobalSidebar';
import GlobalFooter from '@/components/layout/GlobalFooter';

// Shadcn/ui Components
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label'; // Label can be used outside FormField too
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea'; // For Bio

// Lucide Icons
import { UserCircle, AtSign, FileText, Palette, BellRing, KeyRound, Trash2, Save, Camera, ShieldCheck, LogOutIcon } from 'lucide-react';

// Placeholder data types (not using Zod for simplicity in this generation)
type ProfileFormValues = {
  fullName: string;
  username: string;
  email: string;
  bio: string;
  avatarUrl: string;
};

type PreferencesFormValues = {
  darkMode: boolean;
  emailNotifications: boolean;
  inAppNotifications: boolean;
};

type AccountFormValues = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const UserProfileSettingsPage = () => {
  console.log('UserProfileSettingsPage loaded');

  const profileForm = useForm<ProfileFormValues>({
    defaultValues: {
      fullName: 'Commander Astro',
      username: 'CmdrAstro',
      email: 'cmdr.astro@spaceclone.io',
      bio: 'Exploring the digital cosmos, one project at a time. Passionate about teamwork and pushing the frontiers of collaborative technology.',
      avatarUrl: 'https://avatar.iran.liara.run/username?username=CmdrAstro',
    },
  });

  const preferencesForm = useForm<PreferencesFormValues>({
    defaultValues: {
      darkMode: true,
      emailNotifications: true,
      inAppNotifications: false,
    },
  });

  const accountForm = useForm<AccountFormValues>({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onProfileSubmit = (data: ProfileFormValues) => {
    console.log('Profile settings saved:', data);
    // API call to save profile settings
  };

  const onPreferencesSubmit = (data: PreferencesFormValues) => {
    console.log('Preferences saved:', data);
    // API call to save preferences
  };

  const onAccountSubmit = (data: AccountFormValues) => {
    console.log('Password change attempt:', data);
    // API call to change password
  };
  
  const handleDeleteAccount = () => {
    console.log('Delete account initiated');
    // Show confirmation dialog, then API call
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-200">
      <GlobalHeader />
      <GlobalSidebar /> {/* Sidebar is fixed */}
      
      <div className="flex-1 pt-16 pb-10 overflow-y-auto"> {/* Main content wrapper */}
        <main className="p-6 ml-0 md:ml-64 transition-all duration-300"> {/* Adjust ml if sidebar is collapsible and state is managed here */}
          <div className="container mx-auto max-w-4xl">
            <h1 className="text-3xl font-bold text-cyan-400 mb-8">User Profile & Settings</h1>

            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 gap-2 mb-6 bg-gray-800 p-1 rounded-lg">
                <TabsTrigger value="profile" className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white hover:bg-gray-700/50">
                  <UserCircle className="w-4 h-4 mr-2" /> Profile
                </TabsTrigger>
                <TabsTrigger value="preferences" className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white hover:bg-gray-700/50">
                  <Palette className="w-4 h-4 mr-2" /> Preferences
                </TabsTrigger>
                <TabsTrigger value="account" className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white hover:bg-gray-700/50">
                  <ShieldCheck className="w-4 h-4 mr-2" /> Account
                </TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile">
                <Card className="bg-gray-850 border-gray-700 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-sky-400">Personal Information</CardTitle>
                    <CardDescription className="text-gray-400">Update your personal details and avatar.</CardDescription>
                  </CardHeader>
                  <Form {...profileForm}>
                    <form onSubmit={profileForm.handleSubmit(onProfileSubmit)}>
                      <CardContent className="space-y-6">
                        <FormField
                          control={profileForm.control}
                          name="avatarUrl"
                          render={({ field }) => (
                            <FormItem className="flex flex-col items-center space-y-3">
                              <FormLabel>Avatar</FormLabel>
                              <Avatar className="w-32 h-32 border-2 border-cyan-500">
                                <AvatarImage src={field.value} alt={profileForm.getValues("username")} />
                                <AvatarFallback className="text-4xl bg-gray-700 text-cyan-300">
                                  {profileForm.getValues("username")?.substring(0,2).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <Button type="button" variant="outline" size="sm" className="text-cyan-400 border-cyan-500 hover:bg-cyan-500/10">
                                <Camera className="w-4 h-4 mr-2" /> Change Photo
                              </Button>
                               <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={profileForm.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-300">Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Your full name" {...field} className="bg-gray-800 border-gray-600 focus:border-cyan-500" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={profileForm.control}
                          name="username"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-300">Username</FormLabel>
                              <FormControl>
                                <Input placeholder="Your public username" {...field} className="bg-gray-800 border-gray-600 focus:border-cyan-500" />
                              </FormControl>
                              <FormDescription className="text-gray-500">This is your public display name.</FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={profileForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-300">Email Address</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="your.email@example.com" {...field} readOnly className="bg-gray-700 border-gray-600 cursor-not-allowed" />
                              </FormControl>
                              <FormDescription className="text-gray-500">Email cannot be changed here.</FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                         <FormField
                          control={profileForm.control}
                          name="bio"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-300">Bio</FormLabel>
                              <FormControl>
                                <Textarea placeholder="Tell us a little bit about yourself" {...field} className="bg-gray-800 border-gray-600 focus:border-cyan-500 min-h-[100px]" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </CardContent>
                      <CardFooter className="border-t border-gray-700 pt-6">
                        <Button type="submit" className="bg-cyan-600 hover:bg-cyan-700 text-white">
                          <Save className="w-4 h-4 mr-2" /> Save Profile
                        </Button>
                      </CardFooter>
                    </form>
                  </Form>
                </Card>
              </TabsContent>

              {/* Preferences Tab */}
              <TabsContent value="preferences">
                <Card className="bg-gray-850 border-gray-700 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-sky-400">Application Preferences</CardTitle>
                    <CardDescription className="text-gray-400">Customize your application experience.</CardDescription>
                  </CardHeader>
                  <Form {...preferencesForm}>
                    <form onSubmit={preferencesForm.handleSubmit(onPreferencesSubmit)}>
                      <CardContent className="space-y-8">
                        <FormField
                          control={preferencesForm.control}
                          name="darkMode"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border border-gray-700 p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base text-gray-300">Dark Mode</FormLabel>
                                <FormDescription className="text-gray-400">
                                  Enable the dark cosmic theme.
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  className="data-[state=checked]:bg-cyan-500"
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <div className="space-y-4">
                            <h3 className="text-gray-300 font-medium mb-2">Notification Settings</h3>
                            <FormField
                            control={preferencesForm.control}
                            name="emailNotifications"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border border-gray-700 p-4">
                                <div className="space-y-0.5">
                                    <FormLabel className="text-gray-300">Email Notifications</FormLabel>
                                    <FormDescription className="text-gray-400">
                                    Receive updates and alerts via email.
                                    </FormDescription>
                                </div>
                                <FormControl>
                                    <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    className="data-[state=checked]:bg-cyan-500"
                                    />
                                </FormControl>
                                </FormItem>
                            )}
                            />
                            <FormField
                            control={preferencesForm.control}
                            name="inAppNotifications"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border border-gray-700 p-4">
                                <div className="space-y-0.5">
                                    <FormLabel className="text-gray-300">In-App Notifications</FormLabel>
                                    <FormDescription className="text-gray-400">
                                    Show notifications directly within the application.
                                    </FormDescription>
                                </div>
                                <FormControl>
                                    <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    className="data-[state=checked]:bg-cyan-500"
                                    />
                                </FormControl>
                                </FormItem>
                            )}
                            />
                        </div>
                      </CardContent>
                      <CardFooter className="border-t border-gray-700 pt-6">
                        <Button type="submit" className="bg-cyan-600 hover:bg-cyan-700 text-white">
                          <Save className="w-4 h-4 mr-2" /> Save Preferences
                        </Button>
                      </CardFooter>
                    </form>
                  </Form>
                </Card>
              </TabsContent>

              {/* Account Tab */}
              <TabsContent value="account">
                <div className="space-y-8">
                    <Card className="bg-gray-850 border-gray-700 shadow-xl">
                        <CardHeader>
                        <CardTitle className="text-sky-400">Change Password</CardTitle>
                        <CardDescription className="text-gray-400">Update your account password. Choose a strong one!</CardDescription>
                        </CardHeader>
                        <Form {...accountForm}>
                        <form onSubmit={accountForm.handleSubmit(onAccountSubmit)}>
                            <CardContent className="space-y-6">
                            <FormField
                                control={accountForm.control}
                                name="currentPassword"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-300">Current Password</FormLabel>
                                    <FormControl>
                                    <Input type="password" placeholder="••••••••" {...field} className="bg-gray-800 border-gray-600 focus:border-cyan-500" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <FormField
                                control={accountForm.control}
                                name="newPassword"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-300">New Password</FormLabel>
                                    <FormControl>
                                    <Input type="password" placeholder="••••••••" {...field} className="bg-gray-800 border-gray-600 focus:border-cyan-500" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <FormField
                                control={accountForm.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-300">Confirm New Password</FormLabel>
                                    <FormControl>
                                    <Input type="password" placeholder="••••••••" {...field} className="bg-gray-800 border-gray-600 focus:border-cyan-500" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            </CardContent>
                            <CardFooter className="border-t border-gray-700 pt-6">
                            <Button type="submit" className="bg-cyan-600 hover:bg-cyan-700 text-white">
                                <KeyRound className="w-4 h-4 mr-2" /> Update Password
                            </Button>
                            </CardFooter>
                        </form>
                        </Form>
                    </Card>
                    
                    <Card className="bg-gray-850 border-gray-700 shadow-xl">
                        <CardHeader>
                        <CardTitle className="text-orange-400">Account Actions</CardTitle>
                        <CardDescription className="text-gray-400">Manage critical account settings.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Button variant="outline" className="w-full sm:w-auto text-yellow-400 border-yellow-500 hover:bg-yellow-500/10">
                                    <LogOutIcon className="w-4 h-4 mr-2" /> Sign Out of All Devices
                                </Button>
                                <p className="text-sm text-gray-500 mt-1">This will sign you out from all active sessions on other devices.</p>
                            </div>
                        </CardContent>
                         <CardFooter className="border-t border-gray-700 pt-6">
                            <Button variant="destructive" onClick={handleDeleteAccount} className="bg-red-600 hover:bg-red-700 text-white">
                                <Trash2 className="w-4 h-4 mr-2" /> Delete Account
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
      <GlobalFooter />
    </div>
  );
};

export default UserProfileSettingsPage;