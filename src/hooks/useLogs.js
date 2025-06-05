import { LOG_TYPES } from "../utilities/constants";

import supabase from "../services/supabase";
import onError from "../utilities/formError";

const useLogs = () => {

  const createLog = async ( message, type = LOG_TYPES.default ) => {
    try {      
      const { data, error } = await supabase
        .from('app_logs')
        .insert([
          { message, type },
        ])
        .select();

      if( data.length > 0 ) return;

      if( error ){
        throw new Error(`${ error }`);
      }
    } catch (error) {
      onError( error, `Error creating logs.`);
    }
  }

  return { createLog }
}

export default useLogs;