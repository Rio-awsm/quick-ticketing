'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Ticket } from '@/types';
import { Clock, Mail, Phone, Ticket as TicketIcon, User } from 'lucide-react';

interface TicketDisplayProps {
  ticket: Ticket;
  isExisting: boolean;
  onClose: () => void;
}

export default function TicketDisplay({ ticket, isExisting, onClose }: TicketDisplayProps) {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-2">
          <TicketIcon className="h-12 w-12 text-primary" />
        </div>
        <CardTitle className={isExisting ? "text-orange-600" : "text-green-600"}>
          {isExisting ? 'Existing Ticket Found' : 'Ticket Created Successfully'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="text-4xl font-bold text-primary mb-2">
            {ticket.ticketCode}
          </div>
          <p className="text-sm text-muted-foreground">
            Your Ticket Code
          </p>
        </div>

        <div className="border-t pt-4 space-y-3">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">{ticket.name}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{ticket.email}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{ticket.phone}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm capitalize">{ticket.type}</span>
          </div>
        </div>

        <div className="text-center text-xs text-muted-foreground pt-4 border-t">
          {isExisting ? 'Please use your existing ticket code for entry' : 'Please save this ticket code for entry'}
        </div>

        <Button onClick={onClose} className="w-full">
          Close
        </Button>
      </CardContent>
    </Card>
  );
}