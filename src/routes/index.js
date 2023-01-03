import React from "react";
import * as Icon from "@material-ui/icons";
import async from "../components/Async";


import {
  BookOpen,
  Briefcase,
  Calendar as CalendarIcon,
  CheckSquare,
  CreditCard,
  Grid,
  Heart,
  Layout,
  List,
  Map,
  Monitor,
  ShoppingCart,
  PieChart,
  Sliders,
  Users,
  Circle
} from "react-feather";

import MainPage from "../pages/util/ground/MainPage";
import DataRegistPage from "../pages/util/ground/DataRegistPage";
import DataListPage from "../pages/util/ground/DataListPage";
import DataDetailPage from "../pages/util/ground/DataDetailPage.";
import DataPrintPage from "../pages/util/ground/DataPrintPage";
import DataModifyPage from "../pages/util/ground/DataModifyPage";


// Guards
const AuthGuard = async(() => import("../components/AuthGuard"));
// Auth components
const SignIn = async(() => import("../pages/auth/SignIn"));
const SignUp = async(() => import("../pages/auth/SignUp"));
const FindInfo = async(() => import("../pages/auth/FindInfo"));
const FindId = async(() => import("../pages/auth/FindId"));
const FindPw = async(() => import("../pages/auth/FindPw"));
const ResetPassword = async(() => import("../pages/auth/ResetPassword"));
const Page404 = async(() => import("../pages/auth/Page404"));
const Page500 = async(() => import("../pages/auth/Page500"));

//admin > member
const AdminMemberList = async(() => import("../pages/admin/member/AdminMemberList"));
const AdminMemberDetail = async(() => import("../pages/admin/member/AdminMemberDetail"));

//admin > question
const AdminQuestionListPage = async(() => import("../pages/admin/question/AdminQuestionListPage"));

//admin > group
const AdminGroupList = async(() => import("../pages/admin/group/AdminGroupList"));
const AdminGroupDetail = async(() => import("../pages/admin/group/AdminGroupDetail"));
const AdminGroupRegist = async(() => import("../pages/admin/group/AdminGroupRegist"));

// Member components
const MemberProfile = async(() => import("../pages/member/Profile"));

// Components components
const Alerts = async(() => import("../pages/components/Alerts"));
const Avatars = async(() => import("../pages/components/Avatars"));
const Badges = async(() => import("../pages/components/Badges"));
const Buttons = async(() => import("../pages/components/Buttons"));
const Cards = async(() => import("../pages/components/Cards"));
const Chips = async(() => import("../pages/components/Chips"));
const Dialogs = async(() => import("../pages/components/Dialogs"));
const ExpPanels = async(() => import("../pages/components/ExpansionPanels"));
const Lists = async(() => import("../pages/components/Lists"));
const Menus = async(() => import("../pages/components/Menus"));
const Pagination = async(() => import("../pages/components/Pagination"));
const Progress = async(() => import("../pages/components/Progress"));
const Snackbars = async(() => import("../pages/components/Snackbars"));
const Tooltips = async(() => import("../pages/components/Tooltips"));

// Dashboards components
const Default = async(() => import("../pages/dashboards/Default"));
const Analytics = async(() => import("../pages/dashboards/Analytics"));
const SaaS = async(() => import("../pages/dashboards/SaaS"));

// Forms components
const Pickers = async(() => import("../pages/forms/Pickers"));
const SelectionCtrls = async(() => import("../pages/forms/SelectionControls"));
const Selects = async(() => import("../pages/forms/Selects"));
const TextFields = async(() => import("../pages/forms/TextFields"));
const Dropzone = async(() => import("../pages/forms/Dropzone"));
const Editors = async(() => import("../pages/forms/Editors"));
const Formik = async(() => import("../pages/forms/Formik"));

// Icons components
const MaterialIcons = async(() => import("../pages/icons/MaterialIcons"));
const FeatherIcons = async(() => import("../pages/icons/FeatherIcons"));

// Pages components
const Blank = async(() => import("../pages/pages/Blank"));
const InvoiceDetails = async(() => import("../pages/pages/InvoiceDetails"));
const InvoiceList = async(() => import("../pages/pages/InvoiceList"));
const Orders = async(() => import("../pages/pages/Orders"));
const Pricing = async(() => import("../pages/pages/Pricing"));
const Profile = async(() => import("../pages/pages/Profile"));
const Settings = async(() => import("../pages/pages/Settings"));
const Tasks = async(() => import("../pages/pages/Tasks"));
const Projects = async(() => import("../pages/pages/Projects"));
const Calendar = async(() => import("../pages/pages/Calendar"));
const Chat = async(() => import("../pages/pages/Chat"));

// Tables components
const SimpleTable = async(() => import("../pages/tables/SimpleTable"));
const AdvancedTable = async(() => import("../pages/tables/AdvancedTable"));
const DataGrid = async(() => import("../pages/tables/DataGrid"));

// Chart components
const Chartjs = async(() => import("../pages/charts/Chartjs"));

// Maps components
const GoogleMaps = async(() => import("../pages/maps/GoogleMaps"));
const VectorMaps = async(() => import("../pages/maps/VectorMaps"));

// Documentation
const Welcome = async(() => import("../pages/docs/Welcome"));
const GettingStarted = async(() => import("../pages/docs/GettingStarted"));
const EnvironmentVariables = async(() =>
  import("../pages/docs/EnvironmentVariables")
);
const Deployment = async(() => import("../pages/docs/Deployment"));
const Theming = async(() => import("../pages/docs/Theming"));
const StateManagement = async(() => import("../pages/docs/StateManagement"));
const APICalls = async(() => import("../pages/docs/APICalls"));
const ESLintAndPrettier = async(() =>
  import("../pages/docs/ESLintAndPrettier")
);
const Support = async(() => import("../pages/docs/Support"));
const Changelog = async(() => import("../pages/docs/Changelog"));

// Landing
const Landing = async(() => import("../pages/presentation/Landing"));

// Protected routes
const ProtectedPage = async(() => import("../pages/protected/ProtectedPage"));

const InspectionSelectPage = async(() => import("../pages/inspection/InspectionSelectPage"));
const LoginPage = async(() => import("../pages/inspection/Login"));

const TestPage = async(() => import("../pages/util/TestPage"));

const groundInspectionRoute = {
  header: "검사 관리",
  id: "지면검사 관리",
  path: "/ground",
  icon: <Icon.FeaturedPlayList />,
  component: Chartjs,
  children: null,
};

const adminMemberRoute = {
  id: "회원",
  path: "/admin/members",
  header: "사용자 관리",
  group: "사용자 관리",
  icon: <PieChart />,
  containsHome: true,
  auth: true,
  children: [
    {
      path: "/admin/members",
      name: "회원 목록",
      component: AdminMemberList,
    },
    {
      path: "/admin/members/:idx",
      name: "회원 상세",
      component: AdminMemberDetail,
    }
  ],
  component: null,
}


const adminQuestionRoute = {
  id: "문항 관리",
  path: "/admin/questions",
  group: "검사 관리",
  icon: <PieChart />,
  containsHome: true,
  auth: true,
  children: [
    {
      path: "/admin/questions/octagnosis",
      name: "유료 검사",
      component: AdminQuestionListPage,
    },
    {
      path: "/admin/questions/free",
      name: "무료 검사",
      component: AdminQuestionListPage,
    }
  ],
  component: null,

}

const adminGroupRoute = {
  id: "기관",
  path: "/admin/groups",
  group: "사용자 관리",
  icon: <PieChart />,
  containsHome: true,
  auth: true,
  children: [
    {
      path: "/admin/groups",
      name: "기관 목록",
      component: AdminGroupList,
    },
    {
      path: "/admin/groups/regist",
      name: "기관 등록",
      component: AdminGroupRegist,
    },
    {
      path: "/admin/groups/:idx",
      name: "기관 상세",
      component: AdminGroupDetail,
    },
    
  ],
  component: null,
}

const inspectionRoute = {
  path: "/",
  name: "선택 페이지",
  auth: true,
  header: "결과",
  component: InspectionSelectPage
  
}

const memberRoutes = {
  path: "/member",
  name: "선택 페이지",
  header: "결과",
  auth: true,
  children: [
    {
      path: "/member/profile",
      name: "Profile",
      component: MemberProfile,
    },
  ]
}

const groundUtilRoute = {
  path: "/ground",
  name: "지면검사 관리 페이지",
  auth: true,
  children: [
    {
      path: "/ground",
      name: "지면검사 목록",
      component: MainPage,
    },
    {
      path: "/ground/regist",
      name: "지면검사 입력",
      component: DataRegistPage,
    },
    {
      path: "/ground/users",
      name: "지면검사 회원목록",
      component: DataListPage,
    },
    {
      path: "/ground/users/:user_idx",
      name: "지면검사 회원상세",
      component: DataDetailPage,
    },
    {
      path: "/ground/modify/users/:user_idx",
      name: "지면검사 회원수정",
      component: DataModifyPage,
    },
    {
      path: "/ground/print",
      name: "지면검사 인쇄페이지",
      hideLayout: true,
      component: DataPrintPage,
    },
    
  ]
}

const dashboardsRoutes = {
  id: "통계",
  path: "/dashboard",
  header: "결과",
  icon: <PieChart />,
  containsHome: true,
  children: [
    {
      path: "/dashboard/default",
      name: "운영 통계",
      component: Default,
    },
    {
      path: "/dashboard/analytics",
      name: "검사결과 통계",
      component: Analytics,
    },
    {
      path: "/dashboard/saas",
      name: "SaaS",
      component: SaaS,
    },
  ],
  component: null,
};

const pagesRoutes = {
  id: "Pages",
  path: "/pages",
  icon: <Layout />,
  children: [
    {
      path: "/pages/profile",
      name: "Profile",
      component: Profile,
    },
    {
      path: "/pages/settings",
      name: "Settings",
      component: Settings,
    },
    {
      path: "/pages/pricing",
      name: "Pricing",
      component: Pricing,
    },
    {
      path: "/pages/chat",
      name: "Chat",
      component: Chat,
    },
    {
      path: "/pages/blank",
      name: "Blank Page",
      component: Blank,
    },
  ],
  component: null,
};

const projectsRoutes = {
  id: "Projects",
  path: "/projects",
  icon: <Briefcase />,
  badge: "8",
  component: Projects,
  children: null,
};

const invoiceRoutes = {
  id: "Invoices",
  path: "/invoices",
  icon: <CreditCard />,
  children: [
    {
      path: "/invoices",
      name: "List",
      component: InvoiceList,
    },
    {
      path: "/invoices/detail",
      name: "Details",
      component: InvoiceDetails,
    },
  ],
  component: null,
};

const orderRoutes = {
  id: "Orders",
  path: "/orders",
  icon: <ShoppingCart />,
  component: Orders,
  children: null,
};

const tasksRoutes = {
  id: "Tasks",
  path: "/tasks",
  icon: <CheckSquare />,
  badge: "17",
  component: Tasks,
  children: null,
};

const calendarRoutes = {
  id: "Calendar",
  path: "/calendar",
  icon: <CalendarIcon />,
  component: Calendar,
  children: null,
};

const authRoutes = {
  id: "Auth",
  path: "/auth",
  icon: <Users />,
  children: [
    {
      path: "/auth/login",
      component: LoginPage
    },
    {
      path: "/admin/login",
      name: "Sign In",
      component: SignIn,
    },
    {
      path: "/auth/sign-up",
      name: "Sign Up",
      component: SignUp,
    },
    {
      path: "/auth/find-info",
      name: "내 정보 찾기",
      component: FindInfo,
    },
    {
      path: "/auth/find-info/id",
      name: "아이디 찾기",
      component: FindId,
    },
    {
      path: "/auth/find-info/pw",
      name: "비밀번호 찾기",
      component: FindPw,
    },
    {
      path: "/auth/sign-up",
      name: "Sign Up",
      component: SignUp,
    },
    {
      path: "/auth/reset-password",
      name: "Reset Password",
      component: ResetPassword,
    },
    {
      path: "/auth/404",
      name: "404 Page",
      component: Page404,
    },
    {
      path: "/auth/500",
      name: "500 Page",
      component: Page500,
    },
  ],
  component: null,
};

const componentsRoutes = {
  id: "Components",
  path: "/components",
  header: "Elements",
  icon: <Grid />,
  children: [
    {
      path: "/components/alerts",
      name: "Alerts",
      component: Alerts,
    },
    {
      path: "/components/avatars",
      name: "Avatars",
      component: Avatars,
    },
    {
      path: "/components/badges",
      name: "Badges",
      component: Badges,
    },
    {
      path: "/components/buttons",
      name: "Buttons",
      component: Buttons,
    },
    {
      path: "/components/cards",
      name: "Cards",
      component: Cards,
    },
    {
      path: "/components/chips",
      name: "Chips",
      component: Chips,
    },
    {
      path: "/components/dialogs",
      name: "Dialogs",
      component: Dialogs,
    },
    {
      path: "/components/expansion-panels",
      name: "Expansion Panels",
      component: ExpPanels,
    },
    {
      path: "/components/lists",
      name: "Lists",
      component: Lists,
    },
    {
      path: "/components/menus",
      name: "Menus",
      component: Menus,
    },
    {
      path: "/components/pagination",
      name: "Pagination",
      component: Pagination,
    },
    {
      path: "/components/progress",
      name: "Progress",
      component: Progress,
    },
    {
      path: "/components/snackbars",
      name: "Snackbars",
      component: Snackbars,
    },
    {
      path: "/components/tooltips",
      name: "Tooltips",
      component: Tooltips,
    },
  ],
  component: null,
};

const formsRoutes = {
  id: "Forms",
  path: "/forms",
  icon: <CheckSquare />,
  children: [
    {
      path: "/forms/pickers",
      name: "Pickers",
      component: Pickers,
    },
    {
      path: "/forms/selection-controls",
      name: "Selection Controls",
      component: SelectionCtrls,
    },
    {
      path: "/forms/selects",
      name: "Selects",
      component: Selects,
    },
    {
      path: "/forms/text-fields",
      name: "Text Fields",
      component: TextFields,
    },
    {
      path: "/forms/dropzone",
      name: "Dropzone",
      component: Dropzone,
    },
    {
      path: "/forms/editors",
      name: "Editors",
      component: Editors,
    },
    {
      path: "/forms/formik",
      name: "Formik",
      component: Formik,
    },
  ],
  component: null,
};

const tablesRoutes = {
  id: "Tables",
  path: "/tables",
  icon: <List />,
  children: [
    {
      path: "/tables/simple-table",
      name: "Simple Table",
      component: SimpleTable,
    },
    {
      path: "/tables/advanced-table",
      name: "Advanced Table",
      component: AdvancedTable,
    },
    {
      path: "/tables/data-grid",
      name: "Data Grid",
      component: DataGrid,
    },
  ],
  component: null,
};

const iconsRoutes = {
  id: "Icons",
  path: "/icons",
  icon: <Heart />,
  children: [
    {
      path: "/icons/material-icons",
      name: "Material Icons",
      component: MaterialIcons,
    },
    {
      path: "/icons/feather-icons",
      name: "Feather Icons",
      component: FeatherIcons,
    },
  ],
  component: null,
};

const chartRoutes = {
  id: "Charts",
  path: "/charts",
  icon: <PieChart />,
  component: Chartjs,
  children: null,
};

const mapsRoutes = {
  id: "Maps",
  path: "/maps",
  icon: <Map />,
  children: [
    {
      path: "/maps/google-maps",
      name: "Google Maps",
      component: GoogleMaps,
    },
    {
      path: "/maps/vector-maps",
      name: "Vector Maps",
      component: VectorMaps,
    },
  ],
  component: null,
};

const landingRoutes = {
  id: "Landing Page",
  path: "/admin",
  header: "Docs",
  icon: <Monitor />,
  component: Default,
  auth: true,
  children: null,
};




const profileRoutes = {
  id: "Landing Page",
  path: "/profile",
  header: "Docs",
  icon: <Monitor />,
  component: Settings,
  children: null,
  
};

const documentationRoutes = {
  id: "Documentation",
  path: "/documentation",
  header: "Material App",
  icon: <BookOpen />,
  children: [
    {
      path: "/documentation/welcome",
      name: "Welcome",
      component: Welcome,
    },
    {
      path: "/documentation/getting-started",
      name: "Getting Started",
      component: GettingStarted,
    },
    {
      path: "/documentation/environment-variables",
      name: "Environment Variables",
      component: EnvironmentVariables,
    },
    {
      path: "/documentation/deployment",
      name: "Deployment",
      component: Deployment,
    },
    {
      path: "/documentation/theming",
      name: "Theming",
      component: Theming,
    },
    {
      path: "/documentation/state-management",
      name: "State Management",
      component: StateManagement,
    },
    {
      path: "/documentation/api-calls",
      name: "API Calls",
      component: APICalls,
    },
    {
      path: "/documentation/eslint-and-prettier",
      name: "ESLint & Prettier",
      component: ESLintAndPrettier,
    },
    {
      path: "/documentation/support",
      name: "Support",
      component: Support,
    },
  ],
  component: null,
};

const changelogRoutes = {
  id: "Changelog",
  path: "/changelog",
  badge: "v2.0.0",
  icon: <List />,
  component: Changelog,
  children: null,
};

// This route is only visible while signed in
const protectedPageRoutes = {
  id: "Private",
  path: "/private",
  component: ProtectedPage,
  children: null,
};

const testRoute = {
  id: "test",
  path: "/test",
  component: TestPage,
  children: null,

}


export const inspectionRoutes = [
  inspectionRoute,
  memberRoutes
]

// Routes using the Auth layout
export const authLayoutRoutes = [authRoutes, testRoute];

// Routes using the Presentation layout
export const presentationLayoutRoutes = [landingRoutes];

// Routes that are protected
export const protectedRoutes = [protectedPageRoutes, profileRoutes];

// Routes visible in the sidebar
export const sidebarRoutes = [
  groundInspectionRoute,
  adminQuestionRoute,
  dashboardsRoutes,
  adminMemberRoute,
  adminGroupRoute,
  pagesRoutes,
  projectsRoutes,
  orderRoutes,
  invoiceRoutes,
  tasksRoutes,
  calendarRoutes,
  componentsRoutes,
  chartRoutes,
  formsRoutes,
  tablesRoutes,
  iconsRoutes,
  mapsRoutes,
  documentationRoutes,
  changelogRoutes,
];

export const dashboardLayoutRoutes = sidebarRoutes;

export const groundUtilRoutes = [
  groundUtilRoute
]
