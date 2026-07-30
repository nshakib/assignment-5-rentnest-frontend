"use client";

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useSearchParams } from 'next/navigation'
import { registerAction } from '../_actions/authActions'
import { useActionState, useEffect } from 'react'
import { toast } from 'sonner'

const RegisterForm = () => {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? "";
  
  const [state, action, pending] = useActionState(registerAction.bind(null, redirectTo),false)

  useEffect(() => {
    if (!state) return;
    if (state.success) {
      toast.success(state.message || "Registration Successful");
    } else {
      toast.error(state.message || "Registration failed");
    }
  }, [state]);

  const errors = state && !state.success ? state.errors : undefined;


  return (
    <form action={action} className="space-y-4">
      <Card className="p-5 space-y-4">
        <FieldGroup className="gap-4">
          <Field className="gap-1.5" data-invalid={!!errors?.name}>
            <FieldLabel htmlFor="name">Name</FieldLabel>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Enter Your Name"
              autoComplete="name"
              aria-invalid={!!errors?.name}
            />
            {errors?.name && <FieldError errors={[{ message: errors.name }]} />}
          </Field>
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
          <Field className="gap-1.5" data-invalid={!!errors?.role}>
            <FieldLabel htmlFor="role">Role</FieldLabel>
            <select name="role" defaultValue="choose">
              <option value="choose">Select Role</option>
              <option value="TENANT">Tenant</option>
              <option value="LANDLORD">Landlord</option>
            </select>
            {errors?.role && <FieldError errors={[{ message: errors.role }]} />}
          </Field>
        </FieldGroup>

        <Button type="submit" disabled={pending} className="w-full">
          {pending ? "Submitting..." : "Register"}
        </Button>
      </Card>
    </form>
  )
}

export default RegisterForm