'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

export default function ProfilePage() {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [bio, setBio] = useState('Frontend developer with a passion for UI/UX and clean code.');
  const [location, setLocation] = useState('Lagos, Nigeria');
  const [phone, setPhone] = useState('+234 801 234 5678');

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>My Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input value={name} onChange={(e) => setName(e.target.value)} />
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
            <Input value={location} onChange={(e) => setLocation(e.target.value)} />
          </div>
          <Textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Write a short bio about yourself..."
          />
          <div className="text-right">
            <Button>Update Profile</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}