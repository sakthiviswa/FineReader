// app/api/summary/route.js
import { NextResponse } from 'next/server';

interface SummarizeRequestBody {
  text: string; // Adjust the type based on the expected structure of the request body
}

interface SummarizeResponseBody {
  summary: string; // Adjust the type based on the expected structure of the response body
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body: SummarizeRequestBody = await request.json();
    
    // Forward the request to your actual backend API
    const response: Response = await fetch('http://127.0.0.1:8000/summarize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      // If the backend returns an error, pass it through
      const errorData: string = await response.text();
      return new NextResponse(
        JSON.stringify({ error: `Backend error: ${errorData}` }),
        {
          status: response.status,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // Get the response data
    const data: SummarizeResponseBody = await response.json();
    
    // Return the successful response
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in API route:', error);
    
    // Return a proper error response
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}