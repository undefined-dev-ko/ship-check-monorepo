import {
  GetTokenPairWithGoogleAuthResponse,
  GetTokenPairWithGoogleAuthRequest,
  GetUserResponse,
  GetAllSeatResponse,
  CreateReservationRequest,
  CreateReservationResponse,
  GetReservationListResponse,
  CancelReservationRequest,
  RetrieveReservationListRequest,
  RetrieveReservationListResponse,
  GetJudgementsResponse,
  GetRankingSummaryResponse,
} from './interfaces';
import useAppQuery from '../hooks/useAppQuery';
import useAppMutation from '../hooks/useAppMutation';

function useGetAllSeat(): GetAllSeatResponse {
  const { data } = useAppQuery<GetAllSeatResponse>({
    queryKey: ['seats'],
    requestOptions: { method: 'GET', path: '/seat' },
  });
  return data;
}

function useGetUser({ enabled }: { enabled?: boolean }) {
  return useAppQuery<GetUserResponse>({
    queryKey: ['users'],
    requestOptions: { method: 'GET', path: '/user/detail' },
    enabled,
  });
}

function useGetAllReservation({
  reservedAt,
}: {
  reservedAt: string;
}): GetReservationListResponse {
  const { data } = useAppQuery<GetReservationListResponse>({
    queryKey: ['reservations', reservedAt],
    requestOptions: { method: 'GET', path: `/reservation/${reservedAt}` },
  });
  return data;
}

function useGetTokenPairWithGoogleAuth({
  onSuccess,
}: {
  onSuccess?: (data: GetTokenPairWithGoogleAuthResponse) => void;
}) {
  const mutate = useAppMutation<
    GetTokenPairWithGoogleAuthRequest,
    GetTokenPairWithGoogleAuthResponse
  >({
    requestOptions: {
      method: 'POST',
      path: '/auth/login/google',
    },
    onSuccess: onSuccess,
  });

  return mutate;
}

function useCreateReservation({ onSuccess }: { onSuccess?: () => void }) {
  return useAppMutation<CreateReservationRequest, CreateReservationResponse>({
    mutationKey: ['reservations'],
    requestOptions: { method: 'POST', path: '/reservation' },
    onSuccess,
  });
}

function useCancelReservation({ onSuccess }: { onSuccess?: () => void }) {
  return useAppMutation<CancelReservationRequest, void>({
    mutationKey: ['reservations'],
    requestOptions: { method: 'DELETE', path: '/reservation' },
    onSuccess,
  });
}

function useRetrieveReservationList({
  startReservedAt,
  endReservedAt,
  enabled,
}: RetrieveReservationListRequest & {
  enabled?: boolean;
}) {
  return useAppQuery<RetrieveReservationListResponse>({
    queryKey: ['retrieveReservations', startReservedAt, endReservedAt],
    requestOptions: {
      method: 'GET',
      path: `/reservation`,
      params: { startReservedAt, endReservedAt },
    },
    enabled,
  });
}

function useGetJudgements({ enabled }: { enabled?: boolean }) {
  return useAppQuery<GetJudgementsResponse>({
    queryKey: ['getJudgements'],
    requestOptions: {
      method: 'GET',
      path: `/reservation/judgements`,
    },
    enabled,
  });
}

function useGetRankingSummary({
  enabled,
  reservedMonth,
}: {
  enabled?: boolean;
  /** YYYY-MM */
  reservedMonth: string;
}) {
  return useAppQuery<GetRankingSummaryResponse>({
    queryKey: ['getRankingSummary', reservedMonth],
    requestOptions: {
      method: 'GET',
      path: `/rank/${reservedMonth}`,
    },
    enabled,
  });
}

export {
  useGetAllSeat,
  useGetUser,
  useGetAllReservation,
  useGetTokenPairWithGoogleAuth,
  useCreateReservation,
  useCancelReservation,
  useRetrieveReservationList,
  useGetJudgements,
  useGetRankingSummary,
};
