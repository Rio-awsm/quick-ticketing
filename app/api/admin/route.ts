import { getDatabase } from '@/lib/mongodb';
import { Ticket } from '@/types';
import { ObjectId } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { ticketId, isPresent } = body;

    if (!ticketId || typeof isPresent !== 'boolean') {
      return NextResponse.json(
        { error: 'Ticket ID and present status are required' },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    const ticketsCollection = db.collection<Ticket>('tickets');

    const updateData: any = { isPresent };
    if (isPresent) {
      updateData.presentAt = new Date();
    } else {
      updateData.presentAt = null;
    }

    const updateResult = await ticketsCollection.updateOne(
      { _id: new ObjectId(ticketId) },
      { $set: updateData }
    );

    if (updateResult.modifiedCount === 0) {
      return NextResponse.json(
        { error: 'Ticket not found or not updated' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Attendance updated successfully'
    });

  } catch (error) {
    console.error('Error updating attendance:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}