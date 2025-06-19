import { jobOrderStatus } from "./constants";

const statusToTagName = ( status ) => {
  for (const key in jobOrderStatus) {
    if (jobOrderStatus[key].includes(status)) {
      return key === 'true' ? 'green' : 'red';
    }
  }

  return 'grey';
};

const displayPhoneDiagnosticStatus = (status) => {
  return status ? "✅" : "❌";
}

const checkIfNullOrEmpty = (value) => {
  const isInvalid = value === null || value === undefined || value === '';

  if( isInvalid ) return new Error(`Data is invalid. Must not be empty, null or undefined.`);
}

export { statusToTagName, displayPhoneDiagnosticStatus, checkIfNullOrEmpty }