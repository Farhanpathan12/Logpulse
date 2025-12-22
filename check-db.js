
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const projectId = 'cmi6absq10001tvk4apyixdv7';
  console.log(`Checking project: ${projectId}`);

  const project = await prisma.project.findUnique({
    where: { id: projectId },
    include: { posts: true }
  });

  if (!project) {
    console.log('Project not found!');
    // List all projects
    const projects = await prisma.project.findMany();
    console.log('Available projects:', projects.map(p => ({ id: p.id, name: p.name })));
  } else {
    console.log(`Project found: ${project.name}`);
    console.log(`Post count: ${project.posts.length}`);
    project.posts.forEach(p => {
      console.log(`- ${p.title} (${p.content.length} chars)`);
    });
    
    const longPost = project.posts.find(p => p.content.length > 100);
    
    if (!longPost) {
        console.log("Creating LONG test post for truncation...");
        await prisma.post.create({
            data: {
                title: "Long Post for Truncation Test",
                content: "This is a very long post content that should be truncated by the widget. We need to make sure that it respects word boundaries and does not cut words in half. It should also handle HTML entities correctly if we were using them, but for now we are testing raw text truncation. Let's add some more text to ensure it exceeds the 140 character limit so we can see the 'Read More' button in action. This is extra text to really push the limit.",
                category: "IMPROVED",
                published: true,
                projectId: projectId
            }
        });
        console.log("Created LONG test post.");
    } else {
        console.log("Long post already exists.");
    }
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
