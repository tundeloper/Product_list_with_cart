import { NextResponse } from 'next/server';
import data from '../data.json';

// Define the GET handler
export async function GET() {
  return NextResponse.json({ message: 'Hello from Next.js!', data });
}