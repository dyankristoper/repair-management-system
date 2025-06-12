import useLogs from "../hooks/useLogs"

export default async function onError( error, customErrorMessage = '' ) {
  const { createLog } = useLogs();
  const onErrorMessage = customErrorMessage || error || error?.message || '';

  console.error( onErrorMessage )

  await createLog( onErrorMessage, 'error' );
  throw new Error(`Error: ${ onErrorMessage }`);
}
