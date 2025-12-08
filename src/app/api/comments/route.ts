import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import apiServer from '@/utils/apis/axiosBackendHelper';

export async function GET(req: NextRequest) {
  const BASE_URL = "/comments";
  const id = await req.nextUrl.searchParams.get("id");
  try {
    const response = await apiServer.get(BASE_URL, {
      params: { id },
    })

    return new NextResponse(JSON.stringify(response.data), {
      headers: {
        'Content-Type': 'application/json'
      },
    });
  } catch (error) {
    console.error('Error fetching sitemap:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function POST(req: Request) {
    const BASE_URL = "/comments";
    const body = await req.json();
    try {
        const response = await apiServer.post(BASE_URL, body)

        return new NextResponse(JSON.stringify(response.data), {
          headers: {
            'Content-Type': 'application/json'
          },
        });
      } catch (error) {
        console.error('Error fetching sitemap:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
      }
}