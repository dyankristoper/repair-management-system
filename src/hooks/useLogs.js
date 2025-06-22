import supabase from "../services/supabase";

import useLocalUser from "./useLocalUser";
import { getCurrentUser } from "../services/apiAuth";
import { EVENT_TYPES } from "../utilities/constants";

const useLogs = () => {
  const createLog = async ( eventLogPayload ) => {
    const userInfo = await getCurrentUser();
    const { getUserIP } = useLocalUser();

    const {
      type,
      source,
      eventError
    } = eventLogPayload;

    const event = EVENT_TYPES[type] || {
      label: 'Unknown Event',
      description: 'No description available.',
      category: 'Uncategorized'
    };

    const { label, description, category } = event;
    const { user } = userInfo;
    const userIP = await getUserIP();

    try {
      const { data } = await supabase
        .from("event_logs")
        .insert([
          {
            user_id: user?.id || null,
            event_type: `${category}: ${label}`,
            event_source: source,
            description,
            metadata: eventError,
            ip_address: `${userIP}`,
          },
        ])
        .select();

      if( data.length > 0 ) return;
    } catch (error) {
      throw new Error(`${ error }`);
    }
  };

  return { createLog };
};

export default useLogs;
