import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const token = request.cookies.get('token');
        
        if (token) {
            return NextResponse.json({
                message: 'Token Found Successfully',
                status: 200,
                success: true,
                token
            });
        } else {
            return NextResponse.json({
                message: 'Token Not Found',
                status: 404, // Adjusted to 404 for token not found
                success: false
            });
        }
    } catch (error) {
        console.error('Error retrieving token:', error);
        return NextResponse.json({
            message: 'Internal Server Error',
            status: 500,
            success: false
        });
    }
}
