import { Controller, useForm } from "react-hook-form";
import { useUpdatePhone } from "../phones/useUpdatePhone";
import { onError, onEvent } from "../utilities/formError";
import { job_order_status } from "../utilities/constants";

import styled from "styled-components";
import Button from "../ui/Button";
import Select from "../ui/Select";
import toast from "react-hot-toast";
import Input from "../ui/Input";

const StyledUpdatePhoneForm = styled.div`
  width: 580px;
  min-height: 380px;
`;

const UpdateForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5em;
  margin-top: 1em;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  background-color: var(--color-grey-100);
  padding: 1em;

  h3 {
    font-size: 1.8rem;
    font-weight: 500;
  }
  div {
    border-bottom: 1px solid var(--color-grey-200);
    padding: 0.8rem;
  }
`;

const TextArea = styled.div`
  display: flex;
  flex-direction: column;
`;

function UpdatePhoneForm({ assignedToUpdate = {}, onCloseModal }) {
  const { id: editId, ...editValues } = assignedToUpdate ?? {};

  const { phoneModel, imei } = editValues;

  const isEditSession = Boolean(editId);

  const { register, handleSubmit, control } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const { mutate: editPhone } = useUpdatePhone(
    "edit",
    "Phone successfully edited"
  );

  const onSubmit = (data) => {
    editPhone(
      {
        newPhoneData: {
          status: data.status,
          job_order_status: data.job_order_status,
        },
        id: editId,
      },
      {
        onSuccess: async ([updatedPhone]) => {
          await onEvent({
            type: "resource_updated",
            source: "UpdatePhoneForm",
            metadata: updatedPhone,
          });
          onCloseModal?.();
        },
        onError: async (error) => {
          await onError("error_server", "UpdatePhoneForm", error);
          toast.error(`Failed to edit phone: ${error}`);
        },
      }
    );
  };

  return (
    <StyledUpdatePhoneForm>
      <Header>
        <h2>Update details for job order #</h2>
        <div>
          <h3>{phoneModel}</h3>
          <p>{imei}</p>
        </div>
      </Header>

      <UpdateForm onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="job_order_status"
          render={({ field }) => (
            <Select options={job_order_status} id="status" {...field} />
          )}
        />

        <TextArea>
          <p>Add description if any</p>
          <Input id="remarks" {...register("remarks")} />
        </TextArea>

        <Button variation="quaternary">Done</Button>
      </UpdateForm>
    </StyledUpdatePhoneForm>
  );
}

export default UpdatePhoneForm;
