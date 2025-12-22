import { createUploadthing, type FileRouter } from "uploadthing/next";
import { auth } from "@clerk/nextjs/server";

const f = createUploadthing();

const handleAuth = async () => {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");
    return { userId };
};

export const ourFileRouter = {
    imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
        .middleware(async () => {
            console.log("UploadThing Middleware: auth check start");
            try {
                const user = await handleAuth();
                console.log("UploadThing Middleware: authorized", user);
                return user;
            } catch (error) {
                console.error("UploadThing Middleware: auth failed", error);
                throw error;
            }
        })
        .onUploadComplete(async ({ metadata, file }) => {
            console.log("Upload complete for userId:", metadata.userId);
            console.log("file url", file.url);
            return { uploadedBy: metadata.userId };
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
