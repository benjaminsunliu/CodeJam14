import { Paper, Title } from "@mantine/core";
import classes from "./auth.module.css";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          Welcome to the mood tracker!
        </Title>

        {children}
      </Paper>
    </div>
  );
}
