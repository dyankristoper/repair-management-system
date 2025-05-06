import { useForm } from "react-hook-form";
import { useCreatePhone } from "../phones/useCreatePhone";
import { useEditPhone } from "../phones/useEditPhone";
import styled from "styled-components";

const UpdateForm = styled.form`
  border: 1px solid black;
  width: 100%;
  max-width: 340px;
  display: flex;
  flex-direction: column;
`;

function UpdatePhoneForm({ assignedToUpdate = {} }) {
  const handleCheckboxChange = (e) => {
    if (e.target.value) {
      setValue(e.target.name, e.target.checked);
    }
  };
  const { id: editId, ...editValues } = assignedToUpdate ?? [];

  const isEditSession = Boolean(editId);

  const defaultCheckValues = isEditSession
    ? {
        ...editValues,
        success: editValues.success ?? false,
        failed: editValues.failed ?? false,
        completed: editValues.completed ?? false,
        waitingForConfirmation: editValues.waitingForConfirmation ?? false,
      }
    : {
        success: false,
        failed: false,
        completed: false,
        waitingForConfirmation: false,
      };

  const { register, handleSubmit, reset, formState, setValue } = useForm({
    defaultValues: isEditSession ? editValues && defaultCheckValues : {},
  });
  const { isCreating, createPhone } = useCreatePhone();
  const { isEditing, editPhone } = useEditPhone();

  function onSubmit(data) {
    if (isEditSession)
      editPhone(
        {
          newPhoneData: {
            ...data,
          },
          id: editId,
        },
        {
          onSuccess: () => reset(),
        }
      );
    else
      createPhone({
        onSuccess: () => {
          reset();
          //   onCloseModal?.();
        },
      });
  }

  return (
    <UpdateForm onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="success">Success</label>
        <input
          name="success"
          id="success"
          type="checkbox"
          {...register("success")}
          onChange={handleCheckboxChange}
        />
      </div>

      <div>
        <label htmlFor="failed">Failed</label>
        <input
          name="failed"
          id="failed"
          type="checkbox"
          {...register("failed")}
          onChange={handleCheckboxChange}
        />
      </div>

      <div>
        <label htmlFor="completed">Completed</label>
        <input
          name="completed"
          id="completed"
          type="checkbox"
          {...register("completed")}
          onChange={handleCheckboxChange}
        />
      </div>

      <div>
        <label htmlFor="waitingForConfirmation">Waiting for confirmation</label>
        <input
          name="waitingForConfirmation"
          id="waitingForConfirmation"
          type="checkbox"
          {...register("waitingForConfirmation")}
          onChange={handleCheckboxChange}
        />
      </div>

      <div>
        <label htmlFor="remarks">Remarks</label>
        <input id="remarks" type="text" {...register("remarks")} />
      </div>
    </UpdateForm>
  );
}

export default UpdatePhoneForm;
