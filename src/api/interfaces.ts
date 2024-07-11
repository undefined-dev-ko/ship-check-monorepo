import { Reservation, Seat, User } from '../types';

export type GetTokenPairWithGoogleAuthRequest = {
  authorizationCode?: string;
  onSuccess: (data: any) => void;
};
export type GetTokenPairWithGoogleAuthResponse = {
  accessToken: string;
  refreshToken: string;
};

export type TokenRefreshRequest = {
  refreshToken: string;
  accessToken: string;
};
export type TokenRefreshResponse = {
  refreshToken: string;
  accessToken: string;
};

export type GetUserResponse = User;

export type GetAllSeatRequest = {};
export type GetAllSeatResponse = {
  list: Seat[];
};

export type CreateReservationRequest = {
  seatId: number;
  reservedAt: string;
};
export type CreateReservationResponse = Reservation;

export type GetReservationListRequest = {};
export type GetReservationListResponse = {
  list: Reservation[];
};

export type CancelReservationRequest = {
  seatId: number;
  reservedAt: string;
};

export type RetrieveReservationListRequest = {
  startReservedAt: string;
  endReservedAt: string;
};

export type RetrieveReservationListResponse = {
  list: Reservation[];
};
