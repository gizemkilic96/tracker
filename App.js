import { StatusBar } from 'expo-status-bar';

import{NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import GiderleriYönetme from './screens/GiderleriYönetme';
import TümMasraflar from './screens/TümMasraflar';
import SonGiderler from './screens/SonGiderler';
import { GlobalStyles } from './constants/styles';
import { Ionicons } from '@expo/vector-icons';
import IconButton from './components/UI/IconButton';
import GiderlerContextProvider from './store/giderler-context';




const Stack=  createNativeStackNavigator();
const  BottomTabs= createBottomTabNavigator();

function HarcamalarOverview(){

  return <BottomTabs.Navigator
   screenOptions={({navigation})=> ( {
     headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
     headerTintColor:'white',
     tabBarStyle: {backgroundColor: GlobalStyles.colors.primary500},
     tabBarActiveTintColor: {backgroundColor: GlobalStyles.colors.primary500},
     headerRight: ({ tintColor }) => (
      <IconButton
        icon="add"
        size={24}
        color={tintColor}
        onPress={() => {
          navigation.navigate('GiderleriYönetme');
        }}
      />
      ),
     } )}  >

      <BottomTabs.Screen name= 'SonGiderler' component={SonGiderler} 
          options={{
             title:"Son Giderler",
              tabBarLabel:'Son',
              tabBarIcon: ({ color, size }) => (
              <Ionicons name="hourglass" size={size} color={color}/>
            ),
          }}
    
    />
    <BottomTabs.Screen  name= 'TümMasraflar' component={TümMasraflar} 
     options={{
      title:"Tüm Masraflar",
      tabBarLabel:'Tüm',
      tabBarIcon: ({ color, size }) => (
        <Ionicons name="calendar" size={size} color={color}/>
      ),
    }}
    
    
    />
    
    
  </BottomTabs.Navigator>

}

export default function App() {
  return (
      <>
      <StatusBar style="light" />
      <GiderlerContextProvider >
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle:{ backgroundColor: GlobalStyles.colors.primary500,
            headerTintColor:'white',
            tabBarStyle: {backgroundColor: GlobalStyles.colors.primary500},
            tabBarActiveTintColor: {backgroundColor: GlobalStyles.colors.primary500},

          },
        }} >
         <Stack.Screen name="HarcamalarOverview"
          component={HarcamalarOverview}
          options={{headerShown:false}} />

          <Stack.Screen  name="GiderleriYönetme"
            component={GiderleriYönetme}
            options={{
              presentation: 'modal',
            }}
          />
         
        

        </Stack.Navigator>
      </NavigationContainer>
      </GiderlerContextProvider>
      </>
  );
}

