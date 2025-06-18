import { useForm } from "react-hook-form";
import { useState } from "react";
import { useSignup } from "./useSignup";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import styled from "styled-components";
import PasswordShow from "./PasswordShow";

// Email regex: /\S+@\S+\.\S+/

const ShowPasswordWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 2em;
`;

function SignupForm() {
  const { signup, isLoading } = useSignup();
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  function onSubmit({ fullName, email, password }) {
    signup(
      { fullName, email, password },
      {
        onSettled: () => reset(),
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isLoading}
          {...register("fullName", { required: "This field isRequired" })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isLoading}
          {...register("email", {
            required: "This field isRequired",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <ShowPasswordWrapper>
          <Input
            type={showPassword ? "text" : "password"}
            id="password"
            disabled={isLoading}
            {...register("password", {
              required: "This field isRequired",
              minLength: {
                value: 8,
                message: "Password needs a minimum 8 characters",
              },
            })}
          />
          <PasswordShow argument={showPassword} setter={setShowPassword} />
        </ShowPasswordWrapper>
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <ShowPasswordWrapper>
          <Input
            type={showConfirmPassword ? "text" : "password"}
            id="passwordConfirm"
            disabled={isLoading}
            {...register("passwordConfirm", {
              required: "This field is required",
              validate: (value) =>
                value === getValues().password || "Password needs to match",
            })}
          />
          <PasswordShow
            argument={showConfirmPassword}
            setter={setShowConfirmPassword}
          />
        </ShowPasswordWrapper>
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}

        <Button
          variation="secondary"
          type="reset"
          disabled={isLoading}
          onClick={reset}
        >
          Cancel
        </Button>
        <Button variation="primary" disabled={isLoading}>
          Create new user
        </Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
