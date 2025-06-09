import { useState } from "react";
import { useCustomers } from "./useCustomers";

import CreateCustomerForm from "./CreateCustomerForm";
import styled from "styled-components";
import Loader from "../ui/Loader";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const StyledSelect = styled.select`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
  transition: all 0.3s;
`;

function CustomerSelector({ setCustomerID, customerToEdit = {}, nextStep }) {
  const { customers, isLoading } = useCustomers();

  const { id: customerId, ...editValues } = customerToEdit;
  const isEditSession = Boolean(customerId);

  const [selectedCustomerInfo, setSelectedCustomerInfo] = useState();

  function handleSelectionChange(e) {
    const value = e.target.value;

    const selectedCustomer = customers.find(
      (customer) => customer.id === Number(value)
    );

    setSelectedCustomerInfo(selectedCustomer);
    setCustomerID(value);
  }

  if (isLoading) return <Loader />;

  return (
    <Wrapper>
      {!isEditSession && (
        <StyledSelect options={customers} onChange={handleSelectionChange}>
          <option value="">-- Select a customer --</option>
          <option value="new">+ Add new customer</option>
          {customers?.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.name} ({customer.phoneNumber})
            </option>
          ))}
        </StyledSelect>
      )}
      <CreateCustomerForm
        setCustomerID={setCustomerID}
        selectedCustomerInfo={selectedCustomerInfo}
        customerId={selectedCustomerInfo?.id ?? customerId}
        editValues={selectedCustomerInfo ?? editValues}
        isEditSession={Boolean(selectedCustomerInfo?.id || customerId)}
        nextStep={nextStep}
        customerToEdit={customerToEdit}
      />
    </Wrapper>
  );
}

export default CustomerSelector;
