import { getDatabase } from '@/lib/mongodb';
import { generateTicketCode } from '@/lib/utils';
import { Ticket } from '@/types';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, type } = body;

    if (!name || !email || !phone || !type) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    const ticketsCollection = db.collection<Ticket>('tickets');

    // Check if user already exists (by name, email, or phone)
    const existingTicket = await ticketsCollection.findOne({
      $or: [
        { name: name.trim() },
        { email: email.trim().toLowerCase() },
        { phone: phone.trim() }
      ]
    });

    if (existingTicket) {
      return NextResponse.json({
        success: true,
        ticket: existingTicket,
        message: 'Ticket already exists for this user'
      });
    }

    // Create new ticket
    const ticketCode = generateTicketCode();
    const newTicket: Ticket = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      type,
      ticketCode,
      isPresent: false,
      createdAt: new Date()
    };

    const result = await ticketsCollection.insertOne(newTicket);
    const createdTicket = await ticketsCollection.findOne({ _id: result.insertedId });

    return NextResponse.json({
      success: true,
      ticket: createdTicket,
      message: 'Ticket created successfully'
    });

  } catch (error) {
    console.error('Error creating ticket:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const db = await getDatabase();
    const ticketsCollection = db.collection<Ticket>('tickets');
    
    const tickets = await ticketsCollection.find({}).toArray();
    
    return NextResponse.json({
      success: true,
      tickets
    });
  } catch (error) {
    console.error('Error fetching tickets:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}