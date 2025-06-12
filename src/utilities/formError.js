import useLogs from "../hooks/useLogs";

export async function onError( type, source, error ) {
  const { createLog } = useLogs();

  await createLog({ type, source, eventError: error });
  
  console.error(`[${ new Date }] Error: ${ error }`);
  throw new Error(`Error: ${ error?.message || error }`);
}

export async function onEvent( onEventPayload ){
  const { createLog } = useLogs();
  const { type, source = '', metadata = {} } = onEventPayload;

  await createLog({ type, source, eventError: metadata });
}
