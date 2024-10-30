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
    id: 10,
    deskNo: 10,
    reservations: [],
    fixedUser: {
      id: 10,
      name: '김종하',
      team: teamDev,
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
      name: '전상훈',
      team: teamPo,
      email: '',
      photo: '',
      reservations: [],
    },
  },
  {
    id: 16,
    deskNo: 16,
    reservations: [],
    fixedUser: {
      id: 16,
      name: '박상유',
      team: teamPo,
      email: '',
      photo: '',
      reservations: [],
    },
  },
  {
    id: 17,
    deskNo: 17,
    reservations: [],
    fixedUser: {
      id: 17,
      name: '이승한',
      team: teamPo,
      email: '',
      photo: '',
      reservations: [],
    },
  },
  {
    id: 18,
    deskNo: 18,
    reservations: [],
    fixedUser: {
      id: 18,
      name: '성인식',
      team: teamPo,
      email: '',
      photo: '',
      reservations: [],
    },
  },
];

export { fixedSeatList };
