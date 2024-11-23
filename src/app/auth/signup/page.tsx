"use client";

import { Anchor, Button, PasswordInput, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface IFormSignup {
  email: string;
  password: string;
  name: string;
}

export default function LoginPage() {
  const router = useRouter();

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },

    validate: {
      name: (value) => (value.length > 0 ? null : "Please enter valid name"),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length < 8 ? "Password must have at least 8 characters" : null,
    },
  });

  const onSubmit = async ({ name, email, password }: IFormSignup) => {
    console.log("Submitting");
    try {
      const form = { name, email, password };
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) {
        console.error("Failed to register user");
        return;
      }

      await response.json();

      router.push("/login");
    } catch (err) {
      console.error("Failed to register user");
    }
  };

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <TextInput
        label="Name"
        placeholder="hello@gmail.com"
        size="md"
        {...form.getInputProps("name")}
      />
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
        Sign Up
      </Button>

      <Text ta="center" mt="md">
        Already have an account?{" "}
        <Anchor<"a"> href="/auth/login" fw={700}>
          Login
        </Anchor>
      </Text>
    </form>
  );
}
