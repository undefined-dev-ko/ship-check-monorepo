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
  // #TODO data 가 undefined 일 수 있으므로 타입 적용 해주어야할것같습니다 20240824 yck
  const queryResult = useQuery<{ data: T }>({
    queryKey,
    queryFn: () => sendRequest(requestOptions),
    enabled,
  });

  return { ...queryResult, data: queryResult.data?.data };
}
