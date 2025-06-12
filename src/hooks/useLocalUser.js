const DEFAULT_LOCAL_IP = '127.0.0.1';

const useLocalUser = () => {
  const getUserIP = async () => {
    const res = await fetch('https://api.ipify.org?format=json');
    const data = await res.json();
    
    return data.ip || DEFAULT_LOCAL_IP;
  }

  return { getUserIP }
}

export default useLocalUser;