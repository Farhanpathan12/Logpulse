
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

const prisma = new PrismaClient();

async function main() {
    // 1. Get the first user (likely the dev)
    const user = await prisma.user.findFirst();
    if (!user) {
        console.error("No user found in DB to upgrade!");
        return;
    }
    console.log(`Simulating upgrade for User: ${user.email} (${user.id})`);

    // 2. Prepare Payload
    const payload = {
        meta: {
            event_name: "subscription_created",
            custom_data: {
                user_id: user.id
            }
        },
        data: {
            attributes: {
                customer_id: 123456, // Mock Customer ID
                variant_id: 123,
            }
        }
    };
    const body = JSON.stringify(payload);

    // 3. Sign it
    const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;
    if (!secret) throw new Error("Missing LEMONSQUEEZY_WEBHOOK_SECRET in .env");

    const hmac = crypto.createHmac("sha256", secret);
    const signature = hmac.update(body).digest("hex");

    // 4. Send to Localhost API
    console.log("Sending Webhook to http://localhost:3000/api/webhooks/lemon-squeezy...");
    const res = await fetch("http://localhost:3000/api/webhooks/lemon-squeezy", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Signature": signature
        },
        body
    });

    if (res.ok) {
        console.log("✅ Webhook Success! User should be upgraded.");
    } else {
        console.error("❌ Webhook Failed:", await res.text());
    }
}

main();
