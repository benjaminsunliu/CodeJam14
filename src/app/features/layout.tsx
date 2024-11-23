import { DashboardHeader } from "@/components/Dashboard";
import db from "@/lib/dbServer";
import { Text } from "@mantine/core";
import { cookies } from "next/headers";

export default async function FeaturePage({
  children,
}: {
  children: JSX.Element;
}) {
  const cookieStore = await cookies();
  const user = await db.getUser(cookieStore);

  if (!user) return <Text>User is not logged in</Text>;

  if (user) user.token = undefined;

  return (
    <>
      <DashboardHeader />
      {user.email}
    </>
  );
}
