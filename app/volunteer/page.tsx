'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Ticket } from '@/types';
import { ArrowLeft, UserCheck } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function VolunteerPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [ticketCode, setTicketCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [checkedInGuest, setCheckedInGuest] = useState<Ticket | null>(null);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '123456') {
      setIsAuthenticated(true);
      setMessage('');
    } else {
      setMessage('Incorrect password');
    }
  };

  const handleCheckin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketCode.trim()) {
      setMessage('Please enter a ticket code');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/checkin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ticketCode: ticketCode.trim() }),
      });

      const data = await response.json();

      if (data.success) {
        setCheckedInGuest(data.ticket);
        setMessage(`✅ ${data.ticket.name} checked in successfully!`);
        setTicketCode('');
      } else {
        setMessage(`❌ ${data.error}`);
        setCheckedInGuest(null);
      }
    } catch (err) {
      setMessage('❌ Network error. Please try again.');
      setCheckedInGuest(null);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
        <div className="container mx-auto py-8">
          <div className="mb-6">
            <Link href="/">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Registration
              </Button>
            </Link>
          </div>

          <Card className="w-full max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="h-6 w-6" />
                Volunteer Access
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                  />
                </div>

                {message && (
                  <div className="text-red-500 text-sm">{message}</div>
                )}

                <Button type="submit" className="w-full">
                  Access Panel
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
      <div className="container mx-auto py-8">
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Registration
            </Button>
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Volunteer Check-in Panel
          </h1>
          <p className="text-gray-600">
            Enter the 4-digit ticket code to check in guests
          </p>
        </div>

        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Guest Check-in</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCheckin} className="space-y-4">
              <div>
                <Label htmlFor="ticketCode">4-Digit Ticket Code</Label>
                <Input
                  id="ticketCode"
                  type="text"
                  required
                  maxLength={4}
                  value={ticketCode}
                  onChange={(e) => setTicketCode(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter 4-digit code"
                  className="text-center text-2xl font-mono"
                />
              </div>

              <Button type="submit" disabled={loading} className="w-full">
                {loading ? 'Checking in...' : 'Check In Guest'}
              </Button>
            </form>

            {message && (
              <div className="mt-4 p-3 rounded-md bg-gray-50 text-center">
                <div className="text-sm font-medium">{message}</div>
              </div>
            )}

            {checkedInGuest && (
              <div className="mt-4 p-4 border rounded-lg bg-green-50">
                <h3 className="font-semibold text-green-800">Guest Details:</h3>
                <div className="text-sm text-green-700 mt-2">
                  <p><strong>Name:</strong> {checkedInGuest.name}</p>
                  <p><strong>Type:</strong> {checkedInGuest.type}</p>
                  <p><strong>Email:</strong> {checkedInGuest.email}</p>
                  <p><strong>Phone:</strong> {checkedInGuest.phone}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}