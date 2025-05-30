import { useForm } from "react-hook-form";
import { useUpdateCustomers } from "./useUpdateCustomers";

import FormRow from "../ui/FormRow";
import Input from "../ui/Input";
import Button from "../ui/Button";

function CreateCustomerForm({ setCustomerID, customerToEdit = {} }) {
  const { id: customerId, ...editValues } = customerToEdit;

  const isEditSession = Boolean(customerId);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const { mutate: createCustomer, isLoading } = useUpdateCustomers(
    "create",
    "Customer successfully created"
  );

  const { mutate: editCustomer } = useUpdateCustomers(
    "edit",
    "Customer successfully edited"
  );

  function onSubmit(data) {
    if (isEditSession)
      editCustomer({
        newCustomerData: {
          ...data,
        },
        id: customerId,
      });
    else
      createCustomer(
        { ...data },
        {
          onSuccess: (customerData) => {
            setCustomerID(customerData.id);
            reset();
          },
          onError: (error) => {
            console.error("Failed to create customer:", error);
          },
        }
      );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Customer name">
        <Input
          type="text"
          id="name"
          name="name"
          disabled={isLoading}
          {...register("name", { required: "Customer name is required" })}
        />
      </FormRow>
      <FormRow label="Email">
        <Input
          type="email"
          id="email"
          name="email"
          disabled={isLoading}
          {...register("email", { required: "Email is required" })}
        />
      </FormRow>
      <FormRow label="Address">
        <Input
          type="text"
          id="address"
          name="address"
          disabled={isLoading}
          {...register("address")}
        />
      </FormRow>
      <FormRow label="Contact number">
        <Input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          disabled={isLoading}
          {...register("phoneNumber", { required: "Phone number is required" })}
        />
      </FormRow>
      <Button disabled={isLoading} variation="primary" size="small">
        {isEditSession ? "Edit details" : "Add phone"}
      </Button>
    </form>
  );
}

export default CreateCustomerForm;
