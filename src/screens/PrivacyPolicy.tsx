import {
  View,
  Text,
  StyleSheet,
  Linking,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
function PrivacyPolicy(props: any) {
  return (
    <View style={styles.page}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.heading}>PRIVACY NOTICE</Text>
        </View>
        <View style={styles.lastUpdated}>
          <Text style={styles.lastUpdatedText}>Last updated June 28, 2022</Text>
        </View>
        <View style={styles.firstParagraph}>
          <Text
            style={{paddingHorizontal: 10, fontSize: 15.0, color: '#949494'}}>
            Thank you for choosing to be part of our community at MyMedia Inc.,
            doing business as MyLobby (“MyLobby”, “we”, “us”, or “our”). We are
            committed to protecting your personal information and your right to
            privacy. If you have any questions or concerns about this privacy
            notice, or our practices with regards to your personal information,
            please contact us at test@example.com.
          </Text>
        </View>
        <View style={{...styles.firstParagraph, height: 220.0}}>
          <Text
            style={{paddingHorizontal: 10, fontSize: 15.0, color: '#949494'}}>
            When you visit our website{' '}
            <TouchableOpacity
              onPress={() => Linking.openURL('https://www.my-lobby.com/')}>
              <Text style={{color: 'blue', textDecorationLine: 'underline'}}>
                {'https://www.my-lobby.com/'}
              </Text>
            </TouchableOpacity>{' '}
            (the "Website"), and more generally, use any of our services (the
            "Services", which include the Website), we appreciate that you are
            trusting us with your personal information. We take your privacy
            very seriously. In this privacy notice, we seek to explain to you in
            the clearest way possible what information we collect, how we use it
            and what rights you have in relation to it. We hope you take some
            time to read through it carefully, as it is important. If there are
            any terms in this privacy notice that you do not agree with, please
            discontinue use of our Services immediately.
          </Text>
        </View>
        <View
          style={{
            ...styles.firstParagraph,
            height: 75,
          }}>
          <Text
            style={{paddingHorizontal: 10, fontSize: 15.0, color: '#949494'}}>
            This privacy notice applies to all information collected through our
            Services (which, as described above, includes our Website), as well
            as any related services, sales, marketing or events.
          </Text>
        </View>
        <View
          style={{
            ...styles.firstParagraph,
            height: 60,
          }}>
          <Text
            style={{paddingHorizontal: 10, fontSize: 15.0, color: '#949494'}}>
            Please read this privacy notice carefully as it will help you
            understand what we do with the information that we collect.
          </Text>
        </View>
        <View
          style={{
            ...styles.firstParagraph,
            height: 60,
            paddingHorizontal: 10.0,
          }}>
          <Text style={{color: '#5A5A5A', fontSize: 15.0, fontWeight: '600'}}>
            TABLE OF CONTENTS
          </Text>
          <View style={{height: 'auto', flexDirection: 'column'}}>
            {/* <FlatList
              data={}
              renderItem={({item, index}) => (
               
              )}
            /> */}
            {[
              ' WHAT INFORMATION DO WE COLLECT?',
              'HOW DO WE USE YOUR INFORMATION?',
              'WILL YOUR INFORMATION BE SHARED WITH ANYONE?',
              'DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?',
              'HOW LONG DO WE KEEP YOUR INFORMATION?',
              'HOW DO WE KEEP YOUR INFORMATION SAFE?',
              'DO WE COLLECT INFORMATION FROM MINORS?',
              'WHAT ARE YOUR PRIVACY RIGHTS?',
              'CONTROLS FOR DO-NOT-TRACK FEATURES',
              'DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?',
              'DO WE MAKE UPDATES TO THIS NOTICE?',
              'HOW CAN YOU CONTACT US ABOUT THIS NOTICE?',
            ].map((item, index) => {
              return(
              <View style={{flexDirection: 'row', marginTop: 5.0}}>
                <Text>{index + 1}. </Text>
                <Text>{item}</Text>
              </View>
            )})}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
  },
  heading: {
    marginTop: 15.0,
    color: '#3B3B3B',
    fontSize: 15,
    fontWeight: '600',
  },
  lastUpdated: {
    height: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 20.0,
    marginLeft: 10.0,
  },
  lastUpdatedText: {
    fontSize: 15.0,
    fontWeight: '500',
    color: '#909090',
  },
  firstParagraph: {
    width: '100%',
    height: 130.0,
    marginTop: 15.0,
    backgroundColor: 'yellow',
  },
});

export default PrivacyPolicy;
