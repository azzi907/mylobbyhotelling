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
      <ScrollView style={{marginTop: hp(5)}}>
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
            and more generally, use any of our services (the "Services", which
            include the Website), we appreciate that you are trusting us with
            your personal information. We take your privacy very seriously. In
            this privacy notice, we seek to explain to you in the clearest way
            possible what information we collect, how we use it and what rights
            you have in relation to it. We hope you take some time to read
            through it carefully, as it is important. If there are any terms in
            this privacy notice that you do not agree with, please discontinue
            use of our Services immediately.
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
            height: 340,
            paddingHorizontal: 10.0,
            paddingBottom: 20,
          }}>
          <Text style={{color: '#5A5A5A', fontSize: 15.0, fontWeight: '600'}}>
            TABLE OF CONTENTS
          </Text>
          <View style={{height: hp(30)}}>
            {/* <FlatList
              data={}
              renderItem={({item, index}) => (
               
              )}
            /> */}
            {[
              'WHAT INFORMATION DO WE COLLECT?',
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
              return (
                <View style={{flexDirection: 'row', marginTop: 5}}>
                  <Text>{index + 1}. </Text>
                  <Text>{item}</Text>
                </View>
              );
            })}
          </View>
        </View>
        <View style={styles.headingsContainer}>
          <Text style={styles.headings}>
            1. WHAT INFORMATION DO WE COLLECT?
          </Text>
        </View>
        <View
          style={{
            ...styles.firstParagraph,
            height: 1000,
          }}>
          <Text
            style={{paddingHorizontal: 10, fontSize: 15.0, color: '#949494'}}>
            Personal information you disclose to us {'\n'}
            {'\n'} In Short: We collect information that you provide to us.
            {'\n'} We collect personal information that you voluntarily provide
            to us when you register on the Website, express an interest in
            obtaining information about us or our products and Services, when
            you participate in activities on the Website or otherwise when you
            contact us.{'\n'}
            {'\n'} The personal information that we collect depends on the
            context of your interactions with us and the Website, the choices
            you make and the products and features you use. The personal
            information we collect may include the following: {'\n'}
            {'\n'} Personal Information Provided by You. We collect names; phone
            numbers; email addresses; job titles; and other similar information.
            {'\n'}
            {'\n'} All personal information that you provide to us must be true,
            complete and accurate, and you must notify us of any changes to such
            personal information. {'\n'}
            {'\n'}
            Information automatically collected {'\n'}
            {'\n'}
            In Short: Some information — such as your Internet Protocol (IP)
            address and/or browser and device characteristics — is collected
            automatically when you visit our Website.{'\n'}
            {'\n'} We automatically collect certain information when you visit,
            use or navigate the Website. This information does not reveal your
            specific identity (like your name or contact information) but may
            include device and usage information, such as your IP address,
            browser and device characteristics, operating system, language
            preferences, referring URLs, device name, country, location,
            information about who and when you use our Website and other
            technical information. This information is primarily needed to
            maintain the security and operation of our Website, and for our
            internal analytics and reporting purposes.{'\n'}
            {'\n'}Like many businesses, we also collect information through
            cookies and similar technologies.
            {'\n'}
            {'\u2022'}  Log and Usage Data. Log and usage data are
            service-related, diagnostic usage and performance information our
            servers automatically collect when you access or use our Website and
            which we record in log files. Depending on how you interact with us,
            this log data may include your IP address, device information,
            browser type and settings, and information about your activity on
            the Website (such as the date/time stamps associated with your
            usage, pages, and files viewed, searches and other actions you take
            such as which features you use), device event information (such as
            system activity, error reports (sometimes called 'crash dumps') and
            hardware settings).
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    padding: wp(3),
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
  },
  headings: {
    fontSize: hp(2),
    fontWeight: '700',
  },
  headingsContainer: {
    padding: wp(3),
  },
});

export default PrivacyPolicy;
