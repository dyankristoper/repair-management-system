import { useState } from 'react';

import Form from "../ui/Form";
import FormRow from "../ui/FormRow";
import Input from "../ui/Input";
import Button from '../ui/Button';
import ButtonGroupWrapper from '../ui/ButtonGroupWrapper';

import toast from 'react-hot-toast';

import { useUpdateUser } from '../features/authentication/useUpdateUser';
import { onEvent } from '../utilities/formError';

const UserUpdateForm = ({ selectedUser, onCloseModal }) => {
	const [currentUser, setCurrentUser] = useState({...selectedUser});

	const { updateCurrentTechnician, isTechnicianUpdating } = useUpdateUser();

	const onChangeHandler = (e) => {
		const { id, value } = e.target;

		setCurrentUser((prev) => ({
			...prev,
			[id]: value,
		}));
	};

	const onSubmitHandler = (e) => {
		e.preventDefault();

		updateCurrentTechnician(
			currentUser,
			{
				onSuccess: async () => {
					await onEvent({ type: 'profile_updated', metadata: {...currentUser} })
				},
				onError: (err) => {
					toast.error(`Error: ${err.message}`);
				},
				onSettled: () => {
					onCloseModal();
				}
			}
		)
	}

	const onCancelHandler = () => {
		onCloseModal();
	}

  return (
		<>
			<Form onSubmit={ onSubmitHandler }>
				<FormRow label="Email address">
          <Input value={ currentUser?.email } disabled />
        </FormRow>

				<FormRow label="Full name">
					<Input
						id="name"
						type="text"
						value={ currentUser?.name }
						onChange={ onChangeHandler }
						disabled={isTechnicianUpdating}
					/>
				</FormRow>

				<ButtonGroupWrapper className="mt-10">
					<Button
						type="reset"
						variation="secondary"
						onClick={ onCancelHandler }
						disabled={isTechnicianUpdating}
					>
						Cancel
					</Button>
					<Button variation="primary" disabled={isTechnicianUpdating}>
						Update
					</Button>
				</ButtonGroupWrapper>
			</Form>
		</>
  )
}

export default UserUpdateForm