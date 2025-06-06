import useLogs from "../hooks/useLogs"

export default async function onError( error, customErrorMessage ) {
  const { createLog } = useLogs();

  await createLog( customErrorMessage ?? error, 'error' );

  throw new Error(`Error: ${ customErrorMessage }`)
}
