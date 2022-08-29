
import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TransitionSpecs, HeaderStyleInterpolators } from '@react-navigation/stack';
import Screen1 from '../Screens/Screen1'
import InputField from '../Components/InputField';
import Login from '../Screens/LoginScreen';
import RegisterScreen from '../Screens/RegisterScreen';
import ContinueWithPhone from '../Screens/ContinueWithPhone';
import VerifyPhone from '../Screens/VerifyPhone';
import CreateNewPassword from '../Screens/CreateNewPassword';
import VerifyCode from '../Screens/VerifyCode';
import ResetPassword from '../Screens/ResetPassword';
import MissingPoints from '../Screens/MissingPointsForm';
import TransferFunds from '../Screens/TransferFunds';
import Notification from '../Screens/Notification';
import Notifications from '../Screens/Notifications';
import PasswordInputField from '../Components/PaswordInputField';
import BlueButton from '../Components/BlueButton';
import CardTransactions from '../../Src/Screens/CardTransactions';
import ItemDescription from '../../Src/Screens/ItemDescription';
import OrangeHeader from '../../Src/Components/OrangeHeader';
import DashboardStorePromotion from '../../Src/Screens/DashboardStorePromotion';

import UpcomingPromotion from '../../Src/Screens/UpcomingPromotions';
import CurrentPromotion from '../../Src/Screens/CurrentPromotion';
import MyBalance from '../../Src/Screens/MyBalance';
import More from '../../Src/Screens/More';
import MissingPointsSend from '../Screens/MissingPointSend';
import AddCancoCard from '../../Src/Screens/AddCancoCard';
import FAQ from '../../Src/Screens/FAQ';
import Settings from '../../Src/Screens/Settings'
import ContactUs from '../../Src/Screens/ContactUs';
import DashboardFlatlist from '../../Src/Components/DasboardFlatlist';
import GoogleWallet from '../../Src/Screens/GoogleWallet';
import TermsCondition from '../../Src/Screens/TermsCondition';
import BottomTab from '../../Src/Components/BottomTab';
import Promotions from '../../Src/Screens/Promotions';
import Location from '../../Src/Screens/Location';
import ScanQrCode from '../../Src/Screens/ScanQrCode';
import SplashScreen2 from '../Screens/SplashScreen2';
import BuiltInBrowse from '../Screens/BuiltInBrowse';
import CancoCardWallet from '../Screens/CancoCardWallet';
import ResendMessage from '../Screens/ResendMessage';
import { useSelector } from 'react-redux';
import CheckEmail from '../Screens/CheckEmail';
import TransferFundsSuccess from '../Screens/TransferFundsSuccess';
import UpdateUserProfile from '../Screens/UpdateUserProfile';
import ChangePassword from '../Screens/ChangePassword';
import DisableInput from '../Components/DisableInput';
import SearchItemPage from '../Screens/SearchItem';
import SearchNotification from '../Screens/SearchNotification';
import EditCancoCard from '../Screens/EditCancoCard';
import CancoLocations from '../Screens/CancoLocations';
import AddCardSuccess from '../Screens/CardAddedSuccess';

const Stack = createStackNavigator();

const MyTransition = {
  gestureDirection: "vertical",

  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,

  },
  headerStyleInterpolator: HeaderStyleInterpolators.forFade,
}

function App() {
  const { currentUser } = useSelector(({ authRed }) => authRed)

  return (
    currentUser ?
      <Stack.Navigator headerMode="none" initialRouteName="DashboardStorePromotion" >
      <Stack.Screen name="DashboardStorePromotion" component={DashboardStorePromotion} />
        <Stack.Screen name="Location" component={Location} />
        <Stack.Screen name="CancoLocations" component={CancoLocations} />

        <Stack.Screen name="UpcomingPromotion" component={UpcomingPromotion} />
        <Stack.Screen name="BuiltInBrowse" component={BuiltInBrowse} />
        <Stack.Screen name="CurrentPromotion" component={CurrentPromotion} />
        <Stack.Screen name="CardTransactions" component={CardTransactions} />
        <Stack.Screen name="ItemDescription" component={ItemDescription} />
        <Stack.Screen name="TransferFunds" component={TransferFunds} />
        <Stack.Screen name="Notification" component={Notification} />
        <Stack.Screen name="Notifications" component={Notifications} />
        <Stack.Screen name="MyBalance" component={MyBalance} />
        <Stack.Screen name="More" component={More} />
        <Stack.Screen name="MissingPoints" component={MissingPoints} />

        <Stack.Screen name="MissingPointsSend" component={MissingPointsSend} />
        <Stack.Screen name="UpdateUserProfile" component={UpdateUserProfile} />
        <Stack.Screen name="AddCancoCard" component={AddCancoCard} />
        <Stack.Screen name="FAQ" component={FAQ} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="ContactUs" component={ContactUs} />
        <Stack.Screen name="GoogleWallet" component={GoogleWallet} />
        <Stack.Screen name="TermsCondition" component={TermsCondition} />
        <Stack.Screen name="BottomTab" component={BottomTab} />
        <Stack.Screen name="Promotions" component={Promotions} />
        <Stack.Screen name="ScanQrCode" component={ScanQrCode} />
        <Stack.Screen name="SplashScreen2" component={SplashScreen2} />
        <Stack.Screen name="CancoCardWallet" component={CancoCardWallet} />
        <Stack.Screen name="PasswordInputField" component={PasswordInputField} />
        <Stack.Screen name="InputField" component={InputField} />
        <Stack.Screen name="DisableInput" component={DisableInput} />

        <Stack.Screen name="BlueButton" component={BlueButton} />
        <Stack.Screen name="OrangeHeader" component={OrangeHeader} />
        <Stack.Screen name="DashboardFlatlist" component={DashboardFlatlist} />
        <Stack.Screen name="TransferFundsSuccess" component={TransferFundsSuccess} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
        <Stack.Screen name="SearchItem" component={SearchItemPage} />
        <Stack.Screen name="SearchNotification" component={SearchNotification} />
        <Stack.Screen name="EditCancoCard" component={EditCancoCard} />
        <Stack.Screen name="AddCardSuccess" component={AddCardSuccess} />
      </Stack.Navigator>
      :
      <Stack.Navigator headerMode="none" initialRouteName="Screen1" >
        <Stack.Screen name="Screen1" component={Screen1} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="ContinueWithPhone" component={ContinueWithPhone} />
        <Stack.Screen name="ResendMessage" component={ResendMessage} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="VerifyPhone" component={VerifyPhone} />
        <Stack.Screen name="CreateNewPassword" component={CreateNewPassword} />
        <Stack.Screen name="CheckEmail" component={CheckEmail} />




      </Stack.Navigator>

  );
}
export default App;