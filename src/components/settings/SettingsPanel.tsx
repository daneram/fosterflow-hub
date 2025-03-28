import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Settings, 
  User,
  Lock,
  Bell,
  Palette,
  Globe,
  Shield,
  HardDrive,
  LayoutGrid,
  Save,
  RefreshCw
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const SettingsPanel: React.FC = () => {
  return (
    <Layout>
      <div className="space-y-4 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground text-sm">System configuration, user permissions, and customization options</p>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Settings className="h-5 w-5 mr-2 text-primary" />
              System Settings
            </CardTitle>
          </CardHeader>
          
          <Tabs defaultValue="account">
            <div className="px-6">
              <TabsList className="grid w-full max-w-2xl grid-cols-5 h-9">
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="appearance">Appearance</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="system">System</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="account" className="p-0">
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row gap-6">
                    <div className="flex-1">
                      <div className="space-y-1 mb-4">
                        <h3 className="text-lg font-medium">Account Information</h3>
                        <p className="text-sm text-muted-foreground">Update your account details and preferences.</p>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <Input id="username" value="socialworker_1" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" value="socialworker@fosteragency.org" />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="first-name">First name</Label>
                            <Input id="first-name" value="Sarah" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="last-name">Last name</Label>
                            <Input id="last-name" value="Williams" />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="role">Role</Label>
                          <Select defaultValue="social-worker">
                            <SelectTrigger>
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="admin">Administrator</SelectItem>
                              <SelectItem value="manager">Team Manager</SelectItem>
                              <SelectItem value="social-worker">Social Worker</SelectItem>
                              <SelectItem value="support">Support Staff</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="timezone">Timezone</Label>
                          <Select defaultValue="gmt">
                            <SelectTrigger>
                              <SelectValue placeholder="Select timezone" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="gmt">GMT (Greenwich Mean Time)</SelectItem>
                              <SelectItem value="est">EST (Eastern Standard Time)</SelectItem>
                              <SelectItem value="cet">CET (Central European Time)</SelectItem>
                              <SelectItem value="pst">PST (Pacific Standard Time)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                    
                    <Separator orientation="vertical" className="hidden sm:block" />
                    
                    <div className="sm:w-72">
                      <div className="space-y-1 mb-4">
                        <h3 className="text-lg font-medium">Profile</h3>
                        <p className="text-sm text-muted-foreground">Update your profile picture and bio.</p>
                      </div>
                      
                      <div className="flex flex-col items-center justify-center space-y-4">
                        <Avatar className="h-24 w-24">
                          <AvatarImage alt="User avatar" />
                          <AvatarFallback className="text-lg">SW</AvatarFallback>
                        </Avatar>
                        
                        <Button size="sm" variant="outline">
                          Change Avatar
                        </Button>
                        
                        <div className="w-full space-y-2">
                          <Label htmlFor="bio">Bio</Label>
                          <textarea 
                            id="bio" 
                            className="resize-none min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Write a short bio..."
                            defaultValue="Senior Social Worker with 7 years of experience in fostering assessment and support."
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Cancel</Button>
                    <Button>
                      <Save className="h-4 w-4 mr-1" />
                      Save Changes
                    </Button>
                  </div>
                </div>
              </CardContent>
            </TabsContent>
            
            <TabsContent value="appearance" className="p-0">
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium">Appearance</h3>
                    <p className="text-sm text-muted-foreground">Customize the look and feel of the application.</p>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="theme">Theme</Label>
                        <p className="text-sm text-muted-foreground">Select your preferred theme.</p>
                      </div>
                      <Select defaultValue="system">
                        <SelectTrigger className="w-40">
                          <SelectValue placeholder="Select theme" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Accent Color</Label>
                        <p className="text-sm text-muted-foreground">Choose the primary accent color.</p>
                      </div>
                      <div className="flex gap-2">
                        <div className="h-5 w-5 rounded-full bg-blue-500 cursor-pointer ring-2 ring-offset-2 ring-offset-background ring-blue-500" />
                        <div className="h-5 w-5 rounded-full bg-indigo-500 cursor-pointer" />
                        <div className="h-5 w-5 rounded-full bg-purple-500 cursor-pointer" />
                        <div className="h-5 w-5 rounded-full bg-pink-500 cursor-pointer" />
                        <div className="h-5 w-5 rounded-full bg-orange-500 cursor-pointer" />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="density">Interface Density</Label>
                        <p className="text-sm text-muted-foreground">Adjust the density of the user interface.</p>
                      </div>
                      <Select defaultValue="comfortable">
                        <SelectTrigger className="w-40">
                          <SelectValue placeholder="Select density" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="compact">Compact</SelectItem>
                          <SelectItem value="comfortable">Comfortable</SelectItem>
                          <SelectItem value="spacious">Spacious</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="animations">Interface Animations</Label>
                        <p className="text-sm text-muted-foreground">Enable or disable interface animations.</p>
                      </div>
                      <Switch id="animations" defaultChecked />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">Dashboard Layout</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="border rounded-md p-2 cursor-pointer flex flex-col items-center">
                        <div className="bg-primary/10 mb-2 w-full rounded-md p-2 flex items-center justify-center">
                          <LayoutGrid className="h-6 w-6 text-primary" />
                        </div>
                        <span className="text-xs">Standard</span>
                      </div>
                      <div className="border rounded-md p-2 cursor-pointer flex flex-col items-center">
                        <div className="bg-muted mb-2 w-full rounded-md p-2 flex items-center justify-center">
                          <LayoutGrid className="h-6 w-6" />
                        </div>
                        <span className="text-xs">Compact</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Reset to Default</Button>
                    <Button>
                      <Save className="h-4 w-4 mr-1" />
                      Save Changes
                    </Button>
                  </div>
                </div>
              </CardContent>
            </TabsContent>
            
            <TabsContent value="notifications" className="p-0">
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium">Notification Preferences</h3>
                    <p className="text-sm text-muted-foreground">Configure how you receive notifications.</p>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">Email Notifications</h4>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="email-tasks" className="flex flex-col space-y-1">
                          <span>Task assignments</span>
                          <span className="font-normal text-xs text-muted-foreground">Receive email when you're assigned a new task</span>
                        </Label>
                        <Switch id="email-tasks" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label htmlFor="email-reminders" className="flex flex-col space-y-1">
                          <span>Reminders</span>
                          <span className="font-normal text-xs text-muted-foreground">Receive email reminders for upcoming deadlines</span>
                        </Label>
                        <Switch id="email-reminders" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label htmlFor="email-updates" className="flex flex-col space-y-1">
                          <span>System updates</span>
                          <span className="font-normal text-xs text-muted-foreground">Receive email about system updates and maintenance</span>
                        </Label>
                        <Switch id="email-updates" />
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">In-App Notifications</h4>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="app-messages" className="flex flex-col space-y-1">
                          <span>Messages</span>
                          <span className="font-normal text-xs text-muted-foreground">Show notifications for new messages</span>
                        </Label>
                        <Switch id="app-messages" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label htmlFor="app-tasks" className="flex flex-col space-y-1">
                          <span>Task updates</span>
                          <span className="font-normal text-xs text-muted-foreground">Show notifications for task updates</span>
                        </Label>
                        <Switch id="app-tasks" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label htmlFor="app-system" className="flex flex-col space-y-1">
                          <span>System notifications</span>
                          <span className="font-normal text-xs text-muted-foreground">Show notifications for system events</span>
                        </Label>
                        <Switch id="app-system" defaultChecked />
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">Notification Schedule</h4>
                    
                    <div className="space-y-2">
                      <Label htmlFor="digests">Notification Digests</Label>
                      <Select defaultValue="daily">
                        <SelectTrigger id="digests">
                          <SelectValue placeholder="Select digest frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="realtime">Real-time</SelectItem>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="never">Never</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground">
                        Choose how often you'd like to receive notification summaries.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Reset to Default</Button>
                    <Button>
                      <Save className="h-4 w-4 mr-1" />
                      Save Changes
                    </Button>
                  </div>
                </div>
              </CardContent>
            </TabsContent>
            
            <TabsContent value="security" className="p-0">
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium">Security Settings</h3>
                    <p className="text-sm text-muted-foreground">Manage your account security and access.</p>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">Password</h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input id="current-password" type="password" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <Button size="sm">Change Password</Button>
                      <p className="text-xs text-muted-foreground pt-1">
                        Password must be at least 8 characters with at least one uppercase letter, 
                        one lowercase letter, one number, and one special character.
                      </p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">Two-Factor Authentication</h4>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="text-sm font-medium">Two-Factor Authentication</div>
                        <p className="text-sm text-muted-foreground">Add an extra layer of security to your account.</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-green-500 border-green-500">Enabled</Badge>
                        <Button variant="outline" size="sm">Configure</Button>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">Session Management</h4>
                    
                    <div className="border rounded-md p-4">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <div className="text-sm font-medium">Current Session</div>
                          <div className="text-xs text-muted-foreground">
                            Started: Today at 10:24 AM • Windows • Chrome
                          </div>
                        </div>
                        <Badge className="bg-green-500">Active</Badge>
                      </div>
                      
                      <Button variant="outline" size="sm">
                        <RefreshCw className="h-3.5 w-3.5 mr-1" />
                        Refresh Session
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="text-sm font-medium">Active Sessions</div>
                        <p className="text-sm text-muted-foreground">You have 2 other active sessions.</p>
                      </div>
                      <Button variant="outline" size="sm" className="text-red-500">Log Out All Other Devices</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </TabsContent>
            
            <TabsContent value="system" className="p-0">
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium">System Settings</h3>
                    <p className="text-sm text-muted-foreground">Configure system-wide settings for the application.</p>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">Data Management</h4>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="auto-save">Auto-Save</Label>
                        <p className="text-sm text-muted-foreground">Automatically save forms while editing.</p>
                      </div>
                      <Switch id="auto-save" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="data-caching">Data Caching</Label>
                        <p className="text-sm text-muted-foreground">Cache data for faster loading and offline access.</p>
                      </div>
                      <Switch id="data-caching" defaultChecked />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="data-retention">Data Retention Period</Label>
                      <Select defaultValue="90">
                        <SelectTrigger id="data-retention">
                          <SelectValue placeholder="Select period" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30">30 days</SelectItem>
                          <SelectItem value="90">90 days</SelectItem>
                          <SelectItem value="180">180 days</SelectItem>
                          <SelectItem value="365">1 year</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground">
                        Set how long to keep temporary data and logs.
                      </p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">Accessibility</h4>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="screen-reader">Screen Reader Support</Label>
                        <p className="text-sm text-muted-foreground">Optimize the interface for screen readers.</p>
                      </div>
                      <Switch id="screen-reader" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="high-contrast">High Contrast Mode</Label>
                        <p className="text-sm text-muted-foreground">Use high contrast colors for better visibility.</p>
                      </div>
                      <Switch id="high-contrast" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="font-size">Font Size</Label>
                      <Select defaultValue="medium">
                        <SelectTrigger id="font-size">
                          <SelectValue placeholder="Select font size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="small">Small</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="large">Large</SelectItem>
                          <SelectItem value="x-large">Extra Large</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">Advanced</h4>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="debug-mode">Debug Mode</Label>
                        <p className="text-sm text-muted-foreground">Show additional debugging information.</p>
                      </div>
                      <Switch id="debug-mode" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="log-level">Log Level</Label>
                      <Select defaultValue="error">
                        <SelectTrigger id="log-level">
                          <SelectValue placeholder="Select log level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="error">Error</SelectItem>
                          <SelectItem value="warning">Warning</SelectItem>
                          <SelectItem value="info">Info</SelectItem>
                          <SelectItem value="debug">Debug</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground">
                        Set the minimum level of messages to log.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Reset to Default</Button>
                    <Button>
                      <Save className="h-4 w-4 mr-1" />
                      Save Changes
                    </Button>
                  </div>
                </div>
              </CardContent>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </Layout>
  );
};

export default SettingsPanel;
