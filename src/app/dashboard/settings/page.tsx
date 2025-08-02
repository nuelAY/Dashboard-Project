'use client';

import { useTheme } from 'next-themes';
import { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [autoUpdates, setAutoUpdates] = useState(false);
  const [privacy, setPrivacy] = useState(true);

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>App Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Dark Mode</Label>
            <Switch
              checked={theme === 'dark'}
              onCheckedChange={(val) => setTheme(val ? 'dark' : 'light')}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label>Notifications</Label>
            <Switch
              checked={notifications}
              onCheckedChange={setNotifications}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label>Auto Updates</Label>
            <Switch
              checked={autoUpdates}
              onCheckedChange={setAutoUpdates}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label>Privacy Mode</Label>
            <Switch
              checked={privacy}
              onCheckedChange={setPrivacy}
            />
          </div>
          <div className="text-right">
            <Button>Save Settings</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
