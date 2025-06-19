import { useForm } from "react-hook-form";
import { useReducer } from "react";
import { useSignup } from "./useSignup";
import { initialState, toggleReducer } from "./useShowPassword";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useSignup } from "./useSignup";
import toast from "react-hot-toast";

import PasswordShow from "./PasswordShow";
import ShowPasswordWrapper from "../../ui/ShowPasswordWrapper";
import ButtonGroupWrapper from "../../ui/ButtonGroupWrapper";

// Email regex: /\S+@\S+\.\S+/

function SignupForm({
  onCloseModal
}) {
  const [state, dispatch] = useReducer(toggleReducer, initialState);
  const { password, confirmPassword } = state;
  const { signup, isLoading } = useSignup();
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;

  function onSubmit({ fullName, email, password }) {
    signup(
      { fullName, email, password },
      {
        onSuccess: () => {
          toast.success(`User has been created successfully.`);
        },
        onError: (error) => {
          toast.error(`Unable to create new user.`, error);
        },
        onSettled: () => {
          reset();
          onCloseModal();
        },
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
            type={password ? "text" : "password"}
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
          <PasswordShow
            isShown={password}
            onToggle={() => dispatch({ type: "TOGGLE_PASSWORD" })}
          />
        </ShowPasswordWrapper>
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <ShowPasswordWrapper>
          <Input
            type={confirmPassword ? "text" : "password"}
            id="passwordConfirm"
            disabled={isLoading}
            {...register("passwordConfirm", {
              required: "This field is required",
              validate: (value) =>
                value === getValues().password || "Password needs to match",
            })}
          />
          <PasswordShow
            isShown={confirmPassword}
            onToggle={() => dispatch({ type: "TOGGLE_CONFIRM_PASSWORD" })}
          />
        </ShowPasswordWrapper>
      </FormRow>

      <ButtonGroupWrapper>
        {/* type is an HTML attribute! */}

        <Button
          variation="secondary"
          type="reset"
          disabled={isLoading}
          onClick={onCloseModal}
        >
          Cancel
        </Button>
        <Button variation="primary" disabled={isLoading}>
          Create new user
        </Button>
      </ButtonGroupWrapper>
    </Form>
  );
}

export default SignupForm;
