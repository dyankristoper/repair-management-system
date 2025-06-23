import { RiUploadCloud2Fill } from "react-icons/ri";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useSettings } from "./useSettings";
import { useUpdateSettings } from "./useUpdateSettings";
import { useEffect, useMemo } from "react";

import styled from "styled-components";
import FormRow from "../ui/FormRow";
import Input from "../ui/Input";
import FileInput from "../ui/FileInput";
import Button from "../ui/Button";
import ModalWindow from "../ui/ModalWindow";
import ConfirmDelete from "../ui/ConfirmDelete";
import ColorPicker from "./ColorPicker";
import CompanySettings from "./CompanySettings";

import { onError, onEvent } from "../utilities/formError";
import toast from "react-hot-toast";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

const StyledSettingsForm = styled.form`
  height: 100%;
  padding: 2em;
  background-color: var(--color-grey-0);
  border-radius: 8px;
  box-shadow: var(--shadow-md);

  display: flex;
  align-items: center;
  gap: 2em;

  h1 {
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 1em;
  }
`;

const ImageInputWrapper = styled.div`
  width: 55rem;
  height: 30rem;
  border: 2px solid var(--color-grey-400);
  border-style: dotted;
  border-radius: 8px;
  background-color: var(--color-grey-50);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5em;

  & svg {
    font-size: 4rem;
  }

  img {
    width: 8rem;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1em;
`;

function SettingsForm() {
  const { settings } = useSettings();
  const { id: settingsId, company_logo } = settings ?? {};
  const navigate = useNavigate();

  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const settingsToEdit = useMemo(() => {
    return location.state?.settings ?? {};
  }, [location.state?.settings]);

  const editId = settingsToEdit?.id;
  const isEditSession = Boolean(editId);

  const editValues = useMemo(() => {
    const { ...valuesToEdit } = settingsToEdit ?? {};
    return valuesToEdit;
  }, [settingsToEdit]);

  useEffect(() => {
    if (isEditSession && Object.keys(editValues).length > 0) {
      reset(editValues);
    }
  }, [isEditSession, editValues, reset]);

  const { mutate: editSettings, isLoading: isEditing } = useUpdateSettings(
    "edit",
    "Settings successfully edited"
  );

  const { mutate: deleteSettings, isLoading: isDeleting } = useUpdateSettings(
    "delete",
    "Settings successfully deleted"
  );

  const { mutate: createSettings, isLoading: isCreating } = useUpdateSettings(
    "create",
    "Settings successfully created"
  );

  const isUpdating = isCreating || isEditing || isDeleting;

  function onSubmit(data) {
    const company_logo =
      typeof data.company_logo === "string"
        ? data.company_logo
        : data.company_logo[0];

    if (isEditSession)
      editSettings(
        {
          newSettingsData: {
            ...data,
            company_logo,
          },
          id: editId,
        },
        {
          onSuccess: async () => {
            await onEvent({ type: 'resource_updated', source: 'SettingsForm', metadata: {...data, company_logo}});
            navigate("/settings");
          },
          onError: async (error) => {
            await onError('error_server', 'SettingsForm', error);
            toast.error("Failed to edit company settings:", error);
          },
        }
      );
    else
      createSettings(
        {
          ...data,
          company_logo,
        },
        {
          onSuccess: async () => {
            await onEvent({ type: 'resource_created', source: 'SettingsForm', metadata: {...data, company_logo}});
          },
          onError: async (error) => {
            await onError('error_server', 'SettingsForm', error);
            toast.error("Failed to create company settings:", error);
          },
        }
      );
  }

  return (
    <Wrapper>
      {!isEditSession && settings ? (
        <CompanySettings settings={settings} />
      ) : (
        <StyledSettingsForm onSubmit={handleSubmit(onSubmit, onError)}>
          <ImageInputWrapper>
            <p>Upload Company Logo & Name</p>

            {Object.keys(settingsToEdit).length > 0 ? (
              <img src={company_logo} alt="A sample logo of a company" />
            ) : (
              <RiUploadCloud2Fill />
            )}

            <p>Please choose a file to upload</p>
            <FileInput
              id="company_logo"
              name="company_logo"
              {...register("company_logo")}
              accept="image/*"
            />
          </ImageInputWrapper>

          <FormGroup>
            <FormRow label="Company Name" error={errors?.company_name?.message}>
              <Input
                id="company_name"
                name="company_name"
                disabled={isUpdating}
                {...register("company_name", {
                  required: "This field is required",
                })}
              />
            </FormRow>
            <FormRow
              label="Company Alternative Name"
              error={errors?.alternative_name?.message}
            >
              <Input
                id="alternative_name"
                name="altenative_name"
                disabled={isUpdating}
                {...register("alternative_name", {
                  required: "This field is required",
                })}
              />
            </FormRow>

            <FormRow label="Choose Primary Color Theme">
              <ColorPicker
                id={"primary_color"}
                name={"primary_color"}
                register={register}
                columnName={"primary_color"}
              />
            </FormRow>

            <FormRow label="Choose Secondary Color Theme">
              <ColorPicker
                id={"secondary_color"}
                name={"secondary_color"}
                register={register}
                columnName={"secondary_color"}
              />
            </FormRow>

            <ButtonGroup>
              <Button variation="default" type="reset" disabled={isUpdating}>
                Reset
              </Button>
              <Button variation="primary" type="submit" disabled={isUpdating}>
                {isEditSession && Object.keys(settingsToEdit).length > 0
                  ? "Confirm Edit"
                  : "Upload settings"}
              </Button>
            </ButtonGroup>
          </FormGroup>
        </StyledSettingsForm>
      )}

      <ButtonGroup>
        {isEditSession && settings && (
          <Button onClick={() => navigate("/settings")}>Cancel</Button>
        )}
        {Object.keys(settingsToEdit).length > 0 && (
          <ModalWindow>
            <ModalWindow.Open opens="delete">
              <Button variation="danger">Delete Settings ?</Button>
            </ModalWindow.Open>

            <ModalWindow.Window name="delete">
              <ConfirmDelete
                onConfirm={() => {
                  deleteSettings(settingsId, {
                    onSuccess: () => {
                      navigate("/settings", { state: {} });
                    },
                  });
                }}
              />
            </ModalWindow.Window>
          </ModalWindow>
        )}
      </ButtonGroup>
    </Wrapper>
  );
}

export default SettingsForm;
