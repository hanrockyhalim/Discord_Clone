import { redirect } from "next/navigation";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NavigationAction } from "./navigation-action";

export const NavigationSidebar = async () => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }
  // Get all the server's members data using prisma client
  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });
  return (
    <div className="h-full w-full space-y-4 text-primary flex flex-col items-center py-3 dark:bg-[#1E1F22]">
      <NavigationAction />
    </div>
  );
};
