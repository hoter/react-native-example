/** Splash Screen */
import SplashScreen from './screens/Splash';

/** Home screen */
import HomeScreen from './screens/Home';

/** Auth screens */
import SignupScreen from './screens/Auth/Signup';
import LoginScreen from './screens/Auth/Login';

/** Tab screens */
import MainScreen from './screens/Main';
import ConversationScreen from './screens/Conversation';
import ConnectionsScreen from './screens/Connections';
import FindConnections from './screens/Connections/FindConnections';
import MeScreen from './screens/Me';

/** Inner(modal) screens */
import AppointmentsScreen from './screens/Main/Appointments';
import QAScreen from './screens/Conversation/QA';

/** Ask Screens */
import AskAdvisorsScreen from './screens/Ask';
import AdvisorsListScreen from './screens/Ask/AdvisorList';
import SelectedAdvisorsListScreen from './screens/Ask/SelectedAdvisorsList';
import AskConfirmScreen from './screens/Ask/Confirm';
import SuccessAskScreen from './screens/Ask/Success';

import AdvisorProfileScreen from './screens/AdvisorProfile';

/** Settings Screens */
import ProfessionalProfileScreen from './screens/Settings/ProfessionalProfile';
import AdvisorSettingScreen from './screens/Settings/AdvisorSetting';
import AudioSessionScreen from './screens/Settings/AudioSession';
import AccountScreen from './screens/Settings/Account';
import AvailabilityScreen from './screens/Settings/Availability';

/** Book Screens */
import BookScreen from './screens/Book';

const bookRoutes = {
  'Book': { screen: BookScreen },
};

const settings = {
  'ProfessionalProfile': { screen: ProfessionalProfileScreen },
  'AdvisorSetting': { screen: AdvisorSettingScreen },
  'AudioSession': { screen: AudioSessionScreen },
  'Account': { screen: AccountScreen },
  'Availability': { screen: AvailabilityScreen }
};

const modalRoutes = {
  'Appointments': { screen: AppointmentsScreen },
  'AskAdvisors': { screen: AskAdvisorsScreen },
  'AdvisorsList': { screen: AdvisorsListScreen },
  'AdvisorProfile': { screen: AdvisorProfileScreen },
  'SelectedAdvisorsList': { screen: SelectedAdvisorsListScreen },
  'AskConfirm': { screen: AskConfirmScreen },
  'AskSuccess': { screen: SuccessAskScreen },
  'FindConnections': { screen: FindConnections },
  'QA': { screen: QAScreen },
  ...settings,
  ...bookRoutes,
};


const authRoutes = {
  'Home': { screen: HomeScreen },
  'Signup': { screen: SignupScreen },
  'Login': { screen: LoginScreen },
};

export const routes = {
  'Splash': { screen: SplashScreen },
  ...authRoutes,
  ...modalRoutes,
};

export const userRoutes = {
  'Main': { screen: MainScreen },
  'Conversation': { screen: ConversationScreen },
  'Advisors': { screen: ConnectionsScreen },
  'Me': { screen: MeScreen },
};

export const config = {
  headerMode: 'none',
  lazy: 'false',
};
