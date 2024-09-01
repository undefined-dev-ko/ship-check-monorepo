export interface Team {
  id: number;
  name: string;
  users: User[];
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

/**
 * 사용자 정보
 */
export interface User {
  id: number;
  email: string;
  name: string;
  photo: string;
  reservations: Reservation[];
  team?: Team;
  teamId?: number;
  fixedSeat?: Seat;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

/**
 * 예약 정보
 */
export interface Reservation {
  id: number;
  user: User;
  userId: number;
  seat: Seat;
  seatId: number;
  reservedAt: string;
  createdAt: Date;
  deletedAt?: Date;
}

/**
 * 장비 정보
 */
export interface Item {
  id: number;
  category: 'monitor' | 'arm' | 'charger';
  memo?: string;
}

/**
 * 자리 정보
 */
export interface Seat {
  id: number;
  deskNo: number;
  reservations: Reservation[];
  fixedUser?: User;
  fixedUserId?: number;
  items?: Item[];
}

export type TokenPair = { accessToken: string; refreshToken: string };

export type Rank = {
  id: number;
  user: User;
  count: number;
};
