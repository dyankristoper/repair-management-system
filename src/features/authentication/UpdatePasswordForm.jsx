import { useForm } from "react-hook-form";
import { useUpdateUser } from "./useUpdateUser";
import { useReducer } from "react";
import { initialState, toggleReducer } from "./useShowPassword";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import PasswordShow from "./PasswordShow";
import ShowPasswordWrapper from "../../ui/ShowPasswordWrapper";

function UpdatePasswordForm() {
  const [state, dispatch] = useReducer(toggleReducer, initialState);
  const { password, confirmPassword } = state;
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;

  const { updateUser, isUpdating } = useUpdateUser();

  function onSubmit({ password }) {
    updateUser({ password }, { onSuccess: reset });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label="New password (min 8 chars)"
        error={errors?.password?.message}
      >
        <ShowPasswordWrapper>
          <Input
            type={password ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            disabled={isUpdating}
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 8,
                message: "Password needs a minimum of 8 characters",
              },
            })}
          />
          <PasswordShow
            isShown={password}
            onToggle={() => dispatch({ type: "TOGGLE_PASSWORD" })}
          />
        </ShowPasswordWrapper>
      </FormRow>

      <FormRow
        label="Confirm password"
        error={errors?.passwordConfirm?.message}
      >
        <ShowPasswordWrapper>
          <Input
            type={confirmPassword ? "text" : "password"}
            autoComplete="new-password"
            id="passwordConfirm"
            disabled={isUpdating}
            {...register("passwordConfirm", {
              required: "This field is required",
              validate: (value) =>
                getValues().password === value || "Passwords need to match",
            })}
          />
          <PasswordShow
            isShown={confirmPassword}
            onToggle={() => dispatch({ type: "TOGGLE_CONFIRM_PASSWORD" })}
          />
        </ShowPasswordWrapper>
      </FormRow>
      <FormRow>
        <Button onClick={reset} type="reset" variation="secondary">
          Cancel
        </Button>
        <Button variation="primary" disabled={isUpdating}>
          Update password
        </Button>
      </FormRow>
    </Form>
  );
}

export default UpdatePasswordForm;
