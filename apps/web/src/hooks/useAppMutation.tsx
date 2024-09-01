import {
  MutationKey,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { SendRequestOptions, sendRequest } from '../api/client';

export default function useAppMutation<V, T>({
  mutationKey,
  requestOptions,
  onSuccess,
}: {
  mutationKey?: MutationKey;
  requestOptions: SendRequestOptions;
  onSuccess?: (data: any) => void;
}) {
  const queryClient = useQueryClient();

  const handleSuccess = (data: { data: any }) => {
    if (onSuccess) {
      onSuccess(data.data);
    }
  };

  const mutationResult = useMutation<{ data: T }, any, Partial<V>>({
    mutationKey,
    mutationFn: (payload) =>
      sendRequest({
        ...requestOptions,
        data: payload,
        path: requestOptions.path,
      }),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: mutationKey });
    },
    onSuccess: handleSuccess,
  });

  return { ...mutationResult, data: mutationResult.data?.data };
}
