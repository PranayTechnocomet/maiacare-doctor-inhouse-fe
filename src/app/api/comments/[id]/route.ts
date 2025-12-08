import apiServer from '@/utils/apis/axiosBackendHelper';
import { NextResponse } from 'next/server';

export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
    const BASE_URL = "/comments/";
    const {id} = await context.params;

    try {
        const response = await apiServer.delete(BASE_URL + id)

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

export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
    const BASE_URL = "/comments/";
    const body = await req.json();
    const {id} = await context.params;
    try {
        const response = await apiServer.put(BASE_URL + id, body)

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