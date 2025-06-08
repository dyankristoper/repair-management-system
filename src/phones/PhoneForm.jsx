import { Controller } from "react-hook-form";

import CreatableSelect from "react-select/creatable";
import Button from "../ui/Button";
import FileInput from "../ui/FileInput";
import Form from "../ui/Form";
import FormRow from "../ui/FormRow";
import Input from "../ui/Input";
import CreateChecklist from "./CreateChecklist";
import styled from "styled-components";

const StyledSelect = styled.select`
  background-color: var(--color-grey-100);
`;

const Textarea = styled.textarea`
  padding: 0.8rem 1rem;
  border: 1px solid var(--color-grey-300);
  border-radius: 5px;
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  width: 100%;
  height: 8rem;
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
`;

function PhoneForm({
  onSubmit,
  onError,
  errors,
  isWorking,
  phoneModelOptions,
  handleSubmit,
  control,
  register,
  isEditSession,
  handleCheckboxChange,
  setTechnician,
  isCreating,
  isValid,
  isSubmitting,
  setError,
  clearErrors,
}) {
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)} type={"modal"}>
      <Wrapper>
        <div>
          <FormRow label="Phone model" error={errors?.phoneModel?.message}>
            <Controller
              control={control}
              name="phoneModel"
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <CreatableSelect
                  isDisabled={isWorking}
                  options={phoneModelOptions}
                  onChange={(val) => field.onChange(val?.value)}
                />
              )}
            />
          </FormRow>

          <FormRow label="IMEI" error={errors?.imei?.message}>
            <Input
              type="text"
              id="imei"
              disabled={isWorking}
              {...register("imei", {
                required: "This field is required",
              })}
            />
          </FormRow>
          <FormRow
            label="Phone condition"
            error={errors?.phoneCondition?.message}
          >
            <Textarea
              type="text"
              id="phoneCondition"
              disabled={isWorking}
              {...register("phoneCondition", {
                required: "This field is required",
              })}
            />
          </FormRow>
          <FormRow label="Cost (Php)" error={errors?.cost?.message}>
            <Input
              type="text"
              id="cost"
              disabled={isWorking}
              {...register("cost", {
                required: "This field is required",
              })}
            />
          </FormRow>
          <FormRow label="Assignee" error={errors?.assignee?.message}>
            <StyledSelect
              id="assignee"
              onChange={(e) => setTechnician(e.target.value)}
              {...register("assignee", {
                required: "This field is required",
              })}
            >
              <option value="">Select technician</option>
              <option value="550e8400-e29b-41d4-a716-446655440000">
                Tech-001
              </option>
              <option value="550e8400-e29b-41d4-a716-556655440000">
                Tech-002
              </option>
            </StyledSelect>
          </FormRow>
          <FormRow label="Image (Optional)" error={errors?.image?.message}>
            <FileInput id="image" accept="image/*" {...register("image")} />
          </FormRow>
        </div>
        <CreateChecklist
          register={register}
          handleCheckboxChange={handleCheckboxChange}
          setError={setError}
          clearErrors={clearErrors}
          errors={errors}
        />
      </Wrapper>

      <FormRow>
        <Button
          disabled={!isValid || isCreating || isSubmitting}
          variation="primary"
          size="small"
        >
          {isEditSession ? "Edit details" : "Add phone"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default PhoneForm;
