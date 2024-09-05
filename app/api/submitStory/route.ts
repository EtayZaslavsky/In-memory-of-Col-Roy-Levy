// app/api/submitStory/route.ts

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        // Parse the incoming request body
        const formData = await request.json();

        // Here you can handle the formData, e.g., save it to a database or perform other actions
        console.log('Received formData:', formData);

        // Send a successful response
        return NextResponse.json({ message: 'Story submitted successfully!' }, { status: 200 });
    } catch (error) {
        console.error('Error processing request:', error);

        // Send an error response
        return NextResponse.json({ message: 'Failed to submit story.' }, { status: 500 });
    }
}
