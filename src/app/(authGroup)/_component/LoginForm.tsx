"use client";

import { useActionState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldContent, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { loginAction } from "../_actions/authActions";


const LoginForm = () => {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? "";

  const [state, action, pending] = useActionState(loginAction.bind(null, redirectTo),false)

  useEffect(() => {
    if (!state) return;
    if (state.success) {
      toast.success(state.message || "Login Successful");
      // router.push("/dashboard")
    } else {
      toast.error(state.message || "Login failed");
    }
  }, [state]);

  const errors = state && !state.success ? state.errors : undefined;

  return (
    <form action={action} className="space-y-4">
      <Card className="p-5 space-y-4">
        <FieldGroup className="gap-4">
          <Field className="gap-1.5" data-invalid={!!errors?.email}>
            <FieldLabel htmlFor="login-email">Email Address</FieldLabel>
            <Input
              id="login-email"
              name="email"
              type="email"
              placeholder="Enter Your Email"
              autoComplete="email"
              aria-invalid={!!errors?.email}
            />
            {errors?.email && <FieldError errors={[{ message: errors.email }]} />}
          </Field>

          <Field className="gap-1.5" data-invalid={!!errors?.password}>
            <FieldLabel htmlFor="login-password">Password</FieldLabel>
            <Input
              id="login-password"
              name="password"
              type="password"
              placeholder="Enter Your Password"
              autoComplete="current-password"
              aria-invalid={!!errors?.password}
            />
            {errors?.password && <FieldError errors={[{ message: errors.password }]} />}
          </Field>

          {/* <Field orientation="horizontal">
            <Checkbox id="login-remember" name="remember" />
            <FieldContent>
              <FieldLabel htmlFor="login-remember" className="font-normal">
                Remember me for 30 days
              </FieldLabel>
            </FieldContent>
          </Field> */}
        </FieldGroup>

        <Button type="submit" disabled={pending} className="w-full">
          {pending ? "Submitting..." : "Login"}
        </Button>
      </Card>
    </form>
  );
};

export default LoginForm;