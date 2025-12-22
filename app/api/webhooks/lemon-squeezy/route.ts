
import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        // 1. Verify Signature
        const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;
        if (!secret) {
            console.error("Missing LEMONSQUEEZY_WEBHOOK_SECRET");
            return NextResponse.json({ error: "Configuration Error" }, { status: 500 });
        }

        const signature = req.headers.get("X-Signature");
        if (!signature) {
            return NextResponse.json({ error: "Missing Signature" }, { status: 401 });
        }

        const rawBody = await req.text();
        const hmac = crypto.createHmac("sha256", secret);
        const digest = hmac.update(rawBody).digest("hex");

        if (!crypto.timingSafeEqual(Buffer.from(signature, "hex"), Buffer.from(digest, "hex"))) {
            return NextResponse.json({ error: "Invalid Signature" }, { status: 401 });
        }

        // 2. Parse Event
        const body = JSON.parse(rawBody);
        const eventName = body.meta.event_name;
        const data = body.data;

        console.log(`[Lemon Squeezy] Event: ${eventName}`);

        // 3. Handle Subscription Created / Updated
        if (eventName === "order_created" || eventName === "subscription_created") {
            const userId = body.meta.custom_data?.user_id || body.meta.custom_data?.userId;
            const customerId = data.attributes.customer_id.toString();
            // We use the first variant ID to determine plan if we have multiple
            // But for now we only have Pro. 
            // const variantId = data.attributes.variant_id; // Check this against env vars if needed

            if (userId) {
                console.log(`Upgrading User ${userId} to PRO`);

                await prisma.user.update({
                    where: { id: userId },
                    data: {
                        plan: "PRO",
                        lemonSqueezyCustomerId: customerId,
                        subscriptionStatus: "active"
                    }
                });
            }
        }

        return NextResponse.json({ received: true });

    } catch (error) {
        console.error("Webhook Error:", error);
        return NextResponse.json({ error: "Webhook Error" }, { status: 500 });
    }
}
