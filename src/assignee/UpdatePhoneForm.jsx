import { useForm } from "react-hook-form";

import styled from "styled-components";
import Button from "../ui/Button";
import { useUpdatePhone } from "../phones/useUpdatePhone";

const StyledUpdatePhoneForm = styled.div`
  width: 100%;
  max-width: 380px;
`;

const UpdateForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
`;
const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0.2em;

  &:hover {
    background-color: var(--color-grey-100);
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5em;

  p {
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

  textarea {
    width: 100%;
    height: 140px;
  }
`;

function UpdatePhoneForm({ assignedToUpdate = {} }) {
  const handleCheckboxChange = (e) => {
    if (e.target.value) {
      setValue(e.target.name, e.target.checked);
    }
  };

  const { phoneModel, imei } = assignedToUpdate;
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

  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: isEditSession ? editValues && defaultCheckValues : {},
  });

  const { mutate: createPhone, isLoading: isCreating } = useUpdatePhone(
    "create",
    "Phone successfully created"
  );

  const { mutate: editPhone, isLoading: isEditing } = useUpdatePhone(
    "edit",
    "Phone successfully edited"
  );

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
        },
      });
  }

  return (
    <StyledUpdatePhoneForm>
      <Header>
        <h1>update details for job order #</h1>
        <div>
          <h3>{phoneModel}</h3>
          <p>{imei}</p>
        </div>
      </Header>
      <UpdateForm onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <label htmlFor="success">Success</label>
          <input
            name="success"
            id="success"
            type="checkbox"
            {...register("success")}
            onChange={handleCheckboxChange}
            disabled={isCreating || isEditing}
          />
        </Row>

        <Row>
          <label htmlFor="failed">Failed</label>
          <input
            name="failed"
            id="failed"
            type="checkbox"
            {...register("failed")}
            onChange={handleCheckboxChange}
            disabled={isCreating || isEditing}
          />
        </Row>

        <Row>
          <label htmlFor="waitingForConfirmation">
            Waiting for confirmation
          </label>
          <input
            name="waitingForConfirmation"
            id="waitingForConfirmation"
            type="checkbox"
            {...register("waitingForConfirmation")}
            onChange={handleCheckboxChange}
            disabled={isCreating || isEditing}
          />
        </Row>
        <Row>
          <label htmlFor="success">Completed</label>
          <input
            name="completed"
            id="completed"
            type="checkbox"
            {...register("completed")}
            onChange={handleCheckboxChange}
            disabled={isCreating || isEditing}
          />
        </Row>

        <TextArea>
          <label htmlFor="remarks">Remarks:</label>
          <textarea
            id="remarks"
            type="text"
            {...register("remarks")}
            disabled={isCreating || isEditing}
          />
        </TextArea>

        <Button variation="quaternary">Done</Button>
      </UpdateForm>
    </StyledUpdatePhoneForm>
  );
}

export default UpdatePhoneForm;
