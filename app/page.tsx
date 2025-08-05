'use client';

import TicketDisplay from '@/components/TicketDisplay';
import TicketForm from '@/components/TicketForm';
import { Button } from '@/components/ui/button';
import { Ticket } from '@/types';
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [currentTicket, setCurrentTicket] = useState<Ticket | null>(null);
  const [isExisting, setIsExisting] = useState(false);

  const handleTicketCreated = (ticket: Ticket, existing: boolean) => {
    setCurrentTicket(ticket);
    setIsExisting(existing);
  };

  const handleClose = () => {
    setCurrentTicket(null);
    setIsExisting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="container mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Digital Ticket Management
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Register for the event and get your digital ticket
          </p>
          
          <div className="flex gap-4 justify-center mb-8">
            <Link href="/volunteer">
              <Button variant="outline">Volunteer Panel</Button>
            </Link>
            <Link href="/admin">
              <Button variant="outline">Admin Panel</Button>
            </Link>
          </div>
        </div>

        <div className="flex justify-center">
          {currentTicket ? (
            <TicketDisplay 
              ticket={currentTicket} 
              isExisting={isExisting}
              onClose={handleClose}
            />
          ) : (
            <TicketForm onTicketCreated={handleTicketCreated} />
          )}
        </div>
      </div>
    </div>
  );
}