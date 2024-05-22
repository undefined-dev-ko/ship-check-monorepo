import { QueryKey, useQuery } from '@tanstack/react-query';
import { SendRequestOptions, sendRequest } from '../api/client';

export default function useAppQuery<T>({
  queryKey,
  requestOptions,
  enabled = true,
}: {
  queryKey: QueryKey;
  requestOptions: SendRequestOptions;
  enabled?: boolean;
}) {
  const queryResult = useQuery<{ data: T }>({
    queryKey,
    queryFn: () => sendRequest(requestOptions),
    enabled,
  });

  return { ...queryResult, data: queryResult.data?.data };
}
