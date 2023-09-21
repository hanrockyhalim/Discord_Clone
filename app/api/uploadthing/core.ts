import { auth } from "@clerk/nextjs";
import { error } from "console";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

// Create handle auth for the middleware
const handleAuth = () => {
  // Auth from clerk
  const { userId } = auth();
  if (!userId) throw new Error("Unauthorized");
  // Return an object
  return { userId: userId };
};

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Configure server image, call the f function
  serverImage: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  messageFile: f(["image", "pdf", "video", "audio"])
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
