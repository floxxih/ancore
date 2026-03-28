import { useState, useEffect } from 'react';
import { account } from '@ancore/core-sdk';

interface SessionKey {
  id: string;
  name: string;
  permissions: string[];
  expiry: string;
}

export const useSessionKeys = () => {
  const [sessionKeys, setSessionKeys] = useState<SessionKey[]>([]);

  useEffect(() => {
    const fetchSessionKeys = async () => {
      const keys = await account.getSessionKeys();
      setSessionKeys(keys);
    };

    fetchSessionKeys();
  }, []);

  const addSessionKey = async (key: { name: string; permissions: string[]; expiry: string }) => {
    const newKey = await account.addSessionKey(key);
    setSessionKeys((prevKeys) => [...prevKeys, newKey]);
  };

  const revokeSessionKey = async (keyId: string) => {
    await account.revokeSessionKey(keyId);
    setSessionKeys((prevKeys) => prevKeys.filter((key) => key.id !== keyId));
  };

  return {
    sessionKeys,
    addSessionKey,
    revokeSessionKey,
  };
};
