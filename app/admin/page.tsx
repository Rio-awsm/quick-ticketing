'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Ticket } from '@/types';
import { ArrowLeft, Search, Settings, Trash2, UserCheck, Users, UserX } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'createdAt' | 'type'>('createdAt');
  const [filterBy, setFilterBy] = useState<'all' | 'present' | 'absent'>('all');
  const [message, setMessage] = useState('');
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    ticket: Ticket | null;
  }>({ open: false, ticket: null });
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '123456') {
      setIsAuthenticated(true);
      setMessage('');
      fetchTickets();
    }
  };

  const deleteTicket = async (ticketId: string) => {
    setDeleteLoading(true);
    try {
      const response = await fetch(`/api/admin?id=${ticketId}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      
      if (data.success) {
        setTickets(prev => prev.filter(ticket => ticket._id !== ticketId));
        setMessage(`Ticket deleted successfully`);
        setDeleteDialog({ open: false, ticket: null });
      } else {
        setMessage('Failed to delete ticket');
      }
    } catch (err) {
      setMessage('Network error');
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleDeleteClick = (ticket: Ticket) => {
    setDeleteDialog({ open: true, ticket });
  };

  const confirmDelete = () => {
    if (deleteDialog.ticket?._id) {
      deleteTicket(deleteDialog.ticket._id);
    } else {
      setMessage('Incorrect password');
    }
  };

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/tickets');
      const data = await response.json();
      
      if (data.success) {
        setTickets(data.tickets);
      } else {
        setMessage('Failed to fetch tickets');
      }
    } catch (err) {
      setMessage('Network error');
    } finally {
      setLoading(false);
    }
  };

  const updateAttendance = async (ticketId: string, isPresent: boolean) => {
    try {
      const response = await fetch('/api/admin', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ticketId, isPresent }),
      });

      const data = await response.json();
      
      if (data.success) {
        setTickets(prev => prev.map(ticket => 
          ticket._id === ticketId 
            ? { ...ticket, isPresent, presentAt: isPresent ? new Date() : undefined }
            : ticket
        ));
        setMessage(`Attendance updated successfully`);
      } else {
        setMessage('Failed to update attendance');
      }
    } catch (err) {
      setMessage('Network error');
    }
  };

  const filteredAndSortedTickets = tickets
    .filter(ticket => {
      const matchesSearch = 
        ticket.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.phone.includes(searchTerm) ||
        ticket.ticketCode.includes(searchTerm);
      
      const matchesFilter = 
        filterBy === 'all' ||
        (filterBy === 'present' && ticket.isPresent) ||
        (filterBy === 'absent' && !ticket.isPresent);
      
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'type':
          return a.type.localeCompare(b.type);
        case 'createdAt':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

  const stats = {
    total: tickets.length,
    present: tickets.filter(t => t.isPresent).length,
    absent: tickets.filter(t => !t.isPresent).length,
    student: tickets.filter(t => t.type === 'student').length,
    alumni: tickets.filter(t => t.type === 'alumni').length,
    relative: tickets.filter(t => t.type === 'relative').length,
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-4">
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
                <Settings className="h-6 w-6" />
                Admin Access
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
                  Access Admin Panel
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-4">
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
            Admin Dashboard
          </h1>
          <p className="text-gray-600">
            Manage all tickets and attendance
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="h-6 w-6 mx-auto mb-2 text-blue-600" />
              <div className="text-2xl font-bold">{stats.total}</div>
              <div className="text-sm text-gray-600">Total</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <UserCheck className="h-6 w-6 mx-auto mb-2 text-green-600" />
              <div className="text-2xl font-bold">{stats.present}</div>
              <div className="text-sm text-gray-600">Present</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <UserX className="h-6 w-6 mx-auto mb-2 text-red-600" />
              <div className="text-2xl font-bold">{stats.absent}</div>
              <div className="text-sm text-gray-600">Absent</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">{stats.student}</div>
              <div className="text-sm text-gray-600">Students</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">{stats.alumni}</div>
              <div className="text-sm text-gray-600">Alumni</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">{stats.relative}</div>
              <div className="text-sm text-gray-600">Relatives</div>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by name, email, phone, or ticket code..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-3 py-2 border rounded-md"
                >
                  <option value="createdAt">Sort by Date</option>
                  <option value="name">Sort by Name</option>
                  <option value="type">Sort by Type</option>
                </select>
                <select
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value as any)}
                  className="px-3 py-2 border rounded-md"
                >
                  <option value="all">All Guests</option>
                  <option value="present">Present Only</option>
                  <option value="absent">Absent Only</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {message && (
          <div className="mb-4 p-3 rounded-md bg-blue-50 text-blue-700 text-center">
            {message}
          </div>
        )}

        {/* Tickets Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Tickets ({filteredAndSortedTickets.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">Loading...</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Code</th>
                      <th className="text-left p-2">Name</th>
                      <th className="text-left p-2">Type</th>
                      <th className="text-left p-2">Email</th>
                      <th className="text-left p-2">Phone</th>
                      <th className="text-left p-2">Status</th>
                      <th className="text-left p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAndSortedTickets.map((ticket) => (
                      <tr key={ticket._id} className="border-b hover:bg-gray-50">
                        <td className="p-2 font-mono font-bold">{ticket.ticketCode}</td>
                        <td className="p-2">{ticket.name}</td>
                        <td className="p-2 capitalize">{ticket.type}</td>
                        <td className="p-2 text-sm">{ticket.email}</td>
                        <td className="p-2">{ticket.phone}</td>
                        <td className="p-2">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            ticket.isPresent 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {ticket.isPresent ? 'Present' : 'Absent'}
                          </span>
                        </td>
                        <td className="p-2">
                          <div className="flex gap-1">
                            {!ticket.isPresent ? (
                              <Button
                                size="sm"
                                onClick={() => updateAttendance(ticket._id!, true)}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                Mark Present
                              </Button>
                            ) : (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateAttendance(ticket._id!, false)}
                              >
                                Mark Absent
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeleteClick(ticket)}
                              className="ml-1"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {filteredAndSortedTickets.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No tickets found matching your criteria
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Delete Confirmation Dialog */}
        <AlertDialog 
          open={deleteDialog.open} 
          onOpenChange={(open) => setDeleteDialog({ open, ticket: null })}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Ticket</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete the ticket for{' '}
                <strong>{deleteDialog.ticket?.name}</strong>? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel 
                onClick={() => setDeleteDialog({ open: false, ticket: null })}
                disabled={deleteLoading}
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={confirmDelete}
                disabled={deleteLoading}
                className="bg-red-600 hover:bg-red-700"
              >
                {deleteLoading ? 'Deleting...' : 'Delete'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}