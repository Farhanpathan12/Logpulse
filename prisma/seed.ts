import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("🌱 Starting database seed...");

    // 1. Create a Test User (Mocking Clerk ID)
    const userId = "user_test_123";
    const userEmail = "test@logpulse.com";

    // 1. Clean up existing test data
    try {
        await prisma.post.deleteMany({ where: { project: { ownerId: userId } } });
        await prisma.project.deleteMany({ where: { ownerId: userId } });
        await prisma.user.deleteMany({ where: { id: userId } });
        console.log("🧹 Cleaned up existing test data.");
    } catch (e) {
        console.log("⚠️ Cleanup failed (might be first run):", e);
    }

    // 2. Create a Test User
    const user = await prisma.user.create({
        data: {
            id: userId,
            email: userEmail,
            subscriptionStatus: "PRO",
        },
    });

    console.log(`✅ User created: ${user.email}`);

    // 2. Create a Test Project
    const projectId = "cm3v89210000008l56789012"; // Fixed ID for testing
    const project = await prisma.project.create({
        data: {
            id: projectId,
            name: "LogPulse Demo",
            domain: "demo.logpulse.com",
            brandColor: "#4f46e5", // Indigo
            ownerId: user.id,
        },
    });

    console.log(`✅ Project created: ${project.name} (ID: ${project.id})`);

    // 3. Create Posts
    await prisma.post.createMany({
        data: [
            {
                title: "v2.0: The Redesign",
                content: "We completely overhauled the UI to be faster and cleaner. Enjoy the new dark mode!",
                category: "NEW",
                published: true,
                projectId: project.id,
            },
            {
                title: "Fixed: Login Bug",
                content: "Users can now login with GitHub without issues.",
                category: "FIXED",
                published: true,
                projectId: project.id,
            },
            {
                title: "Improved: API Performance",
                content: "API response times have been reduced by 50%.",
                category: "IMPROVED",
                published: true,
                projectId: project.id,
            },
        ],
    });

    console.log("✅ Posts created.");
    console.log("🎉 Seeding finished.");
    console.log(`\n👉 USE THIS PROJECT ID FOR TESTING: ${project.id}\n`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
