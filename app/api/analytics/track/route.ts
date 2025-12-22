import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { projectId, event } = body;

        // Validation
        if (!projectId || !['view', 'click'].includes(event)) {
            return NextResponse.json({ error: "Invalid Request" }, { status: 400 });
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Upsert Daily Stat
        // Note: Using upsert is efficient.
        await prisma.dailyStat.upsert({
            where: {
                projectId_date: {
                    projectId,
                    date: today
                }
            },
            update: {
                views: event === 'view' ? { increment: 1 } : undefined,
                clicks: event === 'click' ? { increment: 1 } : undefined,
            },
            create: {
                projectId,
                date: today,
                views: event === 'view' ? 1 : 0,
                clicks: event === 'click' ? 1 : 0,
            }
        });

        // Also increment total Project/Post views?
        // Let's stick to DailyStats for now as it's the main analytics source.
        // If event is 'view', we might want to increment Project.views if we had that.
        // But we have Post.views. This is Project/Widget level analytics.

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Analytics Error:", error);
        return NextResponse.json({ error: "Tracking Failed" }, { status: 500 });
    }
}

export async function OPTIONS(req: Request) {
    return new NextResponse(null, {
        status: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
        },
    });
}
