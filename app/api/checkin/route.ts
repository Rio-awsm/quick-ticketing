import { getDatabase } from '@/lib/mongodb';
import { Ticket } from '@/types';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { ticketCode } = body;

    if (!ticketCode) {
      return NextResponse.json(
        { error: 'Ticket code is required' },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    const ticketsCollection = db.collection<Ticket>('tickets');

    const ticket = await ticketsCollection.findOne({ ticketCode: ticketCode.trim() });

    if (!ticket) {
      return NextResponse.json(
        { error: 'Invalid ticket code' },
        { status: 404 }
      );
    }

    const updateResult = await ticketsCollection.updateOne(
      { ticketCode: ticketCode.trim() },
      { 
        $set: { 
          isPresent: true,
          presentAt: new Date()
        }
      }
    );

    if (updateResult.modifiedCount === 0) {
      return NextResponse.json(
        { error: 'Failed to check in' },
        { status: 500 }
      );
    }

    const updatedTicket = await ticketsCollection.findOne({ ticketCode: ticketCode.trim() });

    return NextResponse.json({
      success: true,
      ticket: updatedTicket,
      message: 'Guest checked in successfully'
    });

  } catch (error) {
    console.error('Error checking in:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}