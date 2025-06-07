import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useUpdateCustomers } from "./useUpdateCustomers";

import FormRow from "../ui/FormRow";
import Input from "../ui/Input";
import Button from "../ui/Button";
import styled from "styled-components";
import toast from "react-hot-toast";

const StyledForm = styled.form`
  width: 100%;
  max-width: 80rem;
  height: 35rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: end;
`;

function CreateCustomerForm({
  setCustomerID,
  nextStep,
  selectedCustomerInfo,
  editValues,
  customerId,
  isEditSession,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const { mutate: createCustomer, isLoading: isCreating } = useUpdateCustomers(
    "create",
    "Customer successfully created"
  );

  const { mutate: editCustomer, isLoading: isEditing } = useUpdateCustomers(
    "edit",
    "Customer successfully edited"
  );

  const isWorking = isCreating || isEditing;

  useEffect(() => {
    if (!isEditSession && selectedCustomerInfo) {
      reset({
        name: selectedCustomerInfo.name || "",
        address: selectedCustomerInfo.address || "",
        email: selectedCustomerInfo.email || "",
        phoneNumber: selectedCustomerInfo.phoneNumber || "",
      });
    }
  }, [selectedCustomerInfo, reset, isEditSession]);

  function onSubmit(data) {
    if (isEditSession) {
      editCustomer({
        newCustomerData: {
          ...data,
        },
        id: customerId,
      });
    } else {
      createCustomer(
        { ...data },
        {
          onSuccess: (customerData) => {
            setCustomerID(customerData.id);
            nextStep();
          },
          onError: (error) => {
            toast.error("Failed to create customer:", error);
          },
        }
      );
    }
  }

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Customer name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", { required: "Customer name is required" })}
          disabled={isWorking}
        />
      </FormRow>
      <FormRow label="Email" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          {...register("email", { required: "Email Address is required" })}
          disabled={isWorking}
        />
      </FormRow>
      <FormRow label="Address" error={errors?.address?.message}>
        <Input
          type="text"
          id="address"
          {...register("address", { required: "Address is required" })}
          disabled={isWorking}
        />
      </FormRow>
      <FormRow label="Contact number" error={errors?.phoneNumber?.message}>
        <Input
          type="tel"
          id="phoneNumber"
          {...register("phoneNumber", { required: "Phone number is required" })}
          disabled={isWorking}
        />
      </FormRow>
      <ButtonGroup>
        <Button disabled={isWorking} variation="primary" size="small">
          {isEditSession ? "Edit details" : "Add customer"}
        </Button>
      </ButtonGroup>
    </StyledForm>
  );
}

export default CreateCustomerForm;
