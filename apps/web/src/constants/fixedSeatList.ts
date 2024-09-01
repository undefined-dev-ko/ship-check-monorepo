import { Seat, Team } from '../types';

const teamDev: Team = {
  id: 1,
  name: '개발팀',
  users: [],
};

const teamPo: Team = {
  id: 2,
  name: '기획팀',
  users: [],
};

const fixedSeatList: Seat[] = [
  {
    id: 8,
    deskNo: 8,
    reservations: [],
    fixedUser: {
      id: 8,
      name: '김종하',
      team: teamDev,
      email: '',
      photo: '',
      reservations: [],
    },
  },
  {
    id: 13,
    deskNo: 13,
    reservations: [],
    fixedUser: {
      id: 13,
      name: '박상유',
      team: teamPo,
      email: '',
      photo: '',
      reservations: [],
    },
  },
  {
    id: 14,
    deskNo: 14,
    reservations: [],
    fixedUser: {
      id: 14,
      name: '박지연',
      team: teamPo,
      email: '',
      photo: '',
      reservations: [],
    },
  },
  {
    id: 15,
    deskNo: 15,
    reservations: [],
    fixedUser: {
      id: 15,
      name: '성인식',
      team: teamPo,
      email: '',
      photo: '',
      reservations: [],
    },
  },
];

export { fixedSeatList };
