import { QueryKey, useQuery, useQueryClient } from '@tanstack/react-query';
import { SendRequestOptions, client, sendRequest } from './client';
import {
  GetTokenPairWithGoogleAuthResponse,
  GetTokenPairWithGoogleAuthRequest,
  GetAllUserResponse,
  GetAllSeatResponse,
  CreateReservationRequest,
  CreateReservationResponse,
  GetReservationListResponse,
  CancelReservationRequest,
} from './interfaces';
import { makeAuthorization } from './utils';

function useAppQuery<T>({
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
  const queryClient = useQueryClient();

  return {
    ...queryResult,
    data: queryResult.data?.data,
    reset: () => queryClient.resetQueries({ queryKey, exact: true }),
  };
}

function useGetAllSeat(): GetAllSeatResponse {
  const { data } = useAppQuery<GetAllSeatResponse>({
    queryKey: ['seats'],
    requestOptions: { method: 'GET', path: '/seat' },
  });
  return data;
}

function useGetAllUser(): GetAllUserResponse {
  const { data } = useAppQuery<GetAllUserResponse>({
    queryKey: ['users'],
    requestOptions: { method: 'GET', path: '/user' },
  });
  return data;
}

function useGetAllReservation({
  reservedAt,
}: {
  reservedAt: string;
}): GetReservationListResponse {
  const { data } = useAppQuery<GetReservationListResponse>({
    queryKey: ['reservations'],
    requestOptions: { method: 'GET', path: `/reservation/${reservedAt}` },
  });
  return data;
}

export { useGetAllSeat, useGetAllUser, useGetAllReservation };

// 아래 함수들은 useAppMutation 훅 만들어서 새로 함수 선언할 예정입니다.

async function getTokenPairWithGoogleAuth({
  authorizationCode,
}: GetTokenPairWithGoogleAuthRequest) {
  const result = await client.post<GetTokenPairWithGoogleAuthResponse>(
    '/auth/login/google',
    {
      authorizationCode,
    },
  );
  return result.data;
}

async function createReservation({
  accessToken,
  refreshToken,
  ...rest
}: CreateReservationRequest) {
  const result = await client.post<CreateReservationResponse>(
    '/reservation',
    {
      ...rest,
    },
    {
      headers: {
        ...makeAuthorization({ accessToken, refreshToken }),
      },
    },
  );
  return result.data;
}

async function cancelReservation({
  accessToken,
  refreshToken,
  ...rest
}: CancelReservationRequest) {
  const result = await client.delete('/reservation', {
    data: {
      ...rest,
    },
    headers: {
      ...makeAuthorization({ accessToken, refreshToken }),
    },
  });
  return result;
}

export const RAW_QUERY = {
  getTokenPairWithGoogleAuth,
  createReservation,
  cancelReservation,
};
