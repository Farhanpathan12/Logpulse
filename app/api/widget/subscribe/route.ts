import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
};

export async function POST(req: Request) {
    try {
        if (req.method === 'OPTIONS') {
            return NextResponse.json({}, { headers: corsHeaders });
        }

        const { email, projectId } = await req.json();

        if (!email || !projectId) {
            return NextResponse.json(
                { error: "Email and Project ID are required" },
                { status: 400, headers: corsHeaders }
            );
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: "Invalid email address" },
                { status: 400, headers: corsHeaders }
            );
        }

        // Check if subscription already exists
        const existingparam = await prisma.subscriber.findUnique({
            where: {
                email_projectId: {
                    email,
                    projectId
                }
            }
        });

        if (existingparam) {
            return NextResponse.json(
                { message: "Already subscribed" },
                { status: 200, headers: corsHeaders }
            );
        }

        // Create new subscriber
        await prisma.subscriber.create({
            data: {
                email,
                projectId
            }
        });

        return NextResponse.json(
            { message: "Subscribed successfully" },
            { status: 201, headers: corsHeaders }
        );

    } catch (error) {
        console.error("Subscription error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500, headers: corsHeaders }
        );
    }
}

export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders });
}
