"use client";

import { Anchor, Button, PasswordInput, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";

interface IFormLogin {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length < 8 ? "Password must have at least 8 characters" : null,
    },
  });

  const onSubmit = async ({ email, password }: IFormLogin) => {
    try {
      const form = { email, password };
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) {
        throw "Failed to authenticate user";
      }
      const data = await response.json();
      if (data?.token) {
        router.push("/features/dashboard");
        router.refresh();
      } else {
        throw "Failed to authenticate user";
      }
    } catch (err) {
      notifications.show({
        color: "red",
        title: "Authentication Error",
        message: "Unable to authenticate user.",
      });
    }
  };

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <TextInput
        label="Email address"
        placeholder="hello@gmail.com"
        size="md"
        {...form.getInputProps("email")}
      />
      <PasswordInput
        label="Password"
        placeholder="Your password"
        mt="md"
        size="md"
        {...form.getInputProps("password")}
      />
      <Button fullWidth mt="xl" size="md" type="submit">
        Login
      </Button>

      <Text ta="center" mt="md">
        Don&apos;t have an account?{" "}
        <Anchor<"a"> href="/auth/signup" fw={700}>
          Register
        </Anchor>
      </Text>
    </form>
  );
}
