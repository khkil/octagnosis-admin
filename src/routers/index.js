import MainDashBoard from '../pages/dashboards/MainDashBoard';
import React from 'react';
import LoginPage from '../pages/auth/LoginPage';
import { Person, Subject, Group, AdminPanelSettings } from '@mui/icons-material';
import MemberListPage from '../pages/members/MemberListPage';
import MemberDetailPage from '../pages/members/MemberDetailPage';
import InspectionDetailPage from '../pages/inspections/InspectionDetailPage';
import GroupListPage from '../pages/groups/GroupListPage';
import GroupDetailPage from '../pages/groups/GroupDetailPage';
import InspectionStatisticsPage from '../pages/statistics/InspectionStatisticsPage';
import AccessStatisticsPage from '../pages/statistics/AccessStatisticsPage';
import GroupRegistPage from '../pages/groups/GroupRegistPage';

const mainDashBoardRoute = {
  path: '',
  name: '메인 페이지',
  element: MainDashBoard,
};

const authRoute = {
  path: 'auth',
  name: 'auth',
  children: [
    {
      path: 'login',
      name: '로그인 페이지',
      element: LoginPage,
    },
  ],
};

const inspectionRoute = {
  header: '검사 관리',
  name: '검사 목록',
  path: 'inspections',
  icon: <Subject />,
  children: [
    {
      path: ':inspectionIdx',
      name: '검사 상세',
      element: InspectionDetailPage,
    },
  ],
};

const memberRoute = {
  header: '사용자 관리',
  name: '개인 관리',
  path: 'members',
  icon: <Person />,
  children: [
    {
      path: '',
      name: '개인 목록',
      element: MemberListPage,
    },
    {
      name: '개인 상세',
      path: ':memberIdx',
      element: MemberDetailPage,
    },
  ],
};

const managerRoute = {
  name: '매니저 관리',
  path: 'managers',
  icon: <AdminPanelSettings />,
  children: [
    {
      path: '',
      name: '매니저 목록',
      element: MemberListPage,
    },
    {
      name: '매니저 상세',
      path: ':memberIdx',
      element: MemberDetailPage,
    },
  ],
};

const groupRoute = {
  name: '기관 관리',
  path: 'groups',
  icon: <Group />,
  children: [
    {
      name: '기관 목록',
      path: '',
      element: GroupListPage,
    },
    {
      name: '기관 상세',
      path: ':groupIdx',
      element: GroupDetailPage,
    },
    {
      name: '기관 등록',
      path: 'regist',
      element: GroupRegistPage,
    },
  ],
};

const statisticsRoutes = [
  {
    header: '통계',
    name: '검사 통계',
    path: 'statistics/inspection',
    icon: <Subject />,
    element: InspectionStatisticsPage,
  },
  {
    name: '접속 통계',
    path: 'statistics/access',
    icon: <Subject />,
    element: AccessStatisticsPage,
  },
];

export const sidebarRoutes = [inspectionRoute, memberRoute, groupRoute, managerRoute, ...statisticsRoutes];

export const commonLayoutRoutes = [mainDashBoardRoute, ...sidebarRoutes];

export const authLayoutRoutes = [authRoute];
