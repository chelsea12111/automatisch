import { useMutation } from '@tanstack/react-query';
import api from 'helpers/api';

export default function useRevokeAccessToken(token) {
  const { mutate, ...query } = useMutation({
    mutationFn: async () => {
      if (!token) {
        throw new Error('Token is missing');
      }

      const { data } = await api.delete(`/v1/access-tokens/${token}`);

      return data;
    },
  });

  const revokeAccessToken = () => mutate();

  return { revokeAccessToken, ...query };
}

