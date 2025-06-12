import React from 'react'
import { getAuthUser } from '../lib/api';
import { useQuery } from '@tanstack/react-query';

const useAuthUser = () => {
  console.log(`inside useAuthUser.js ---`);

  const authUser = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      console.log(`Fetching authUser...`);
      const data = await getAuthUser();
      console.log("Received authUser data:", data);
      return data;
    },
    retry: false,
  });

  console.log("Query result in useAuthUser:", authUser);

  return {
    isLoading: authUser.isLoading,
    authUser: authUser.data?.user,
  };
}

export default useAuthUser;
