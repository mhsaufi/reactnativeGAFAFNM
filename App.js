import bgRNFB from './bgRNFB';
import React, {Component} from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";
import { GoogleAnalyticsTracker } from "react-native-google-analytics-bridge";
import { AppRegistry, Button, Text, View , ImageBackground } from 'react-native';
import firebase from 'react-native-firebase';
import type { Notification, NotificationOpen, RemoteMessage } from 'react-native-firebase';

const tracker1 = new GoogleAnalyticsTracker("UA-8146561-2");

const notification = new firebase.notifications.Notification()
  .setNotificationId('notificationId')
  .setTitle('Firebase')
  .setBody('New Firebase Notification')
  .setData({
    key1: 'value1',
    key2: 'value2',
  });

class HomeOne extends React.Component {

  static navigationOptions = {
    title: 'R-T-A Screen-One',
  };

  // FIREBASE MESSAGING/NOTIFICAITON SECTION ===============================================

  async componentDidMount() {
    const notificationOpen: NotificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
        // App was opened by a notification
        // Get the action triggered by the notification being opened
        const action = notificationOpen.action;
        // Get information about the notification that was opened
        const notification: Notification = notificationOpen.notification;
    }
  }

  componentDidMount() {

    this.messageListener = firebase.messaging().onMessage((message: RemoteMessage) => {
      alert("onMessage triggered");
    });

    this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification: Notification) => {
        alert("onNotificationDisplayed triggered");
    });

    this.notificationListener = firebase.notifications().onNotification((notification: Notification) => {
      alert("onNotification triggered");

      notification.android.setChannelId('channelId').android.setSmallIcon('ic_launcher');
      firebase.notifications().displayNotification(notification);
    });

    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen: NotificationOpen) => {
      
      alert("onNotificationOpened triggered");
      const action = notificationOpen.action;
      const notification: Notification = notificationOpen.notification;
    });
  }

  componentWillUnmount() {
      this.messageListener();
      this.notificationDisplayedListener();
      this.notificationListener();
      this.notificationOpenedListener();
  }

  // ##FIREBASE MESSAGING/NOTIFICAITON SECTION ===============================================

  _triggerGA(){
    
    tracker1.trackEvent("React-Test-App-Button-Click1","Click");
    alert("Your event has been recorded to Google Analytics");
  }

  _triggerFA(){

    firebase.analytics().logEvent("kasatria_FA_button_click");
    alert("Your Firebase event has been recorded to Firebase Analytics");
  }

  render(){

    tracker1.trackScreenView("React-Test-App-Screen-One");
    firebase.analytics().setCurrentScreen("React-Test-App-Screen-One");
    firebase.analytics().setUserProperty("Fullname","Kasatria React Native Test App");
    firebase.analytics().setUserProperty("gender","Male");
    firebase.analytics().setUserProperty("Organization","Kasatria");

    return(
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
      }}>
          <View style={{height: 180, marginTop: 5, paddingTop: 30, paddingLeft: 10, paddingRight: 10, backgroundColor: 'white'}}>
            <ImageBackground style={{ width: '100%', height: '100%'}} source={require('./logo.png')} />
          </View>
          <View style={{height: 50, marginTop: 5, paddingTop: 30, paddingLeft: 40, paddingRight: 40, backgroundColor: 'white'}}>
            <Button
              onPress={this._triggerGA}
              title="GA Event Trigger"
            />
          </View>
          <View style={{height: 50, marginTop: 20, paddingTop: 30, paddingLeft: 40, paddingRight: 40, backgroundColor: 'white'}}>
            <Button
              onPress={this._triggerFA}
              title="Firebase Event Trigger"
            />
          </View>
          <View style={{height: 70, marginTop: 20, paddingTop: 30, paddingLeft: 40, paddingRight: 40, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-around'}}>

            <Button
                onPress={() => this.props.navigation.navigate('Detail')}
                title="Screeen 2"
              />

            <Button
                onPress={() => this.props.navigation.navigate('Detail2')}
                title="Screeen 3"
              />
          </View>
      </View>
    );
  }
}

class DetailsScreen extends React.Component {

  static navigationOptions = {
    title: 'R-T-A Screen-Two',
  };

  _triggerFA(){

    tracker1.trackEvent("Kasatria_Checkout_Button","Click",{"itemId":"123AEFR","itemName":"SONY Xtra Bass Earbuds"});
    firebase.analytics().logEvent("Kasatria_Checkout_Button",{"itemId":"123AEFR","itemName":"SONY Xtra Bass Earbuds"});
    alert("Your item has been added to your cart");
  }

  render() {

    tracker1.trackScreenView("React-Test-App-Screen-Two");
    tracker1.trackEvent("React-Test-App-Click_Page_2","Click");
    firebase.analytics().logEvent("kasatria_FA_click_page_two");
    firebase.analytics().setCurrentScreen("React-Test-App-Screen-Two");
    
    return (
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
      }}>
          <View style={{height: 180, marginTop: 5, paddingTop: 30, paddingLeft: 10, paddingRight: 10, backgroundColor: 'white'}}>
            <ImageBackground style={{ width: '100%', height: '100%'}} source={require('./logo.png')} />
          </View>
          <View style={{height: 50, marginTop: 20, paddingTop: 30, paddingLeft: 40, paddingRight: 40, backgroundColor: 'white'}}>
            <Button
              onPress={this._triggerFA}
              title="Sample Checkout"
            />
          </View>
          <View style={{height: 50, marginTop: 20, paddingTop: 30, paddingLeft: 40, paddingRight: 40, backgroundColor: 'white'}}>
          <Button
              onPress={() => this.props.navigation.navigate('Home')}
              title="Back Home"
            />
          </View>
      </View>
    );
  }
}

class DetailsScreen2 extends React.Component {

  static navigationOptions = {
    title: 'R-T-A Screen-Three',
  };

  render() {

    tracker1.trackScreenView("React-Test-App-Screen-Three");
    tracker1.trackEvent("React-Test-App-Click_Page_3","Click");
    firebase.analytics().logEvent("kasatria_FA_click_page_three");
    firebase.analytics().setCurrentScreen("React-Test-App-Screen-Three");

    return (
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
      }}>
          <View style={{height: 180, marginTop: 5, paddingTop: 30, paddingLeft: 10, paddingRight: 10, backgroundColor: 'white'}}>
            <ImageBackground style={{ width: '100%', height: '100%'}} source={require('./logo.png')} />
          </View>
          <View style={{height: 50, marginTop: 20, paddingTop: 30, paddingLeft: 40, paddingRight: 40, backgroundColor: 'white'}}>
          <Button
              onPress={() => this.props.navigation.navigate('Home')}
              title="Back Home"
            />
          </View>
      </View>
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    Home : HomeOne,
    Detail : DetailsScreen,
    Detail2 : DetailsScreen2
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#000000',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);

export default  createAppContainer(AppNavigator);

AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => bgRNFB);
