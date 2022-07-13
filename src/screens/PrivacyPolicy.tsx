import {
  View,
  Text,
  StyleSheet,
  Linking,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  Platform,
} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const Table = require('../../images/table_privacy_policy.png');
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
            style={{paddingHorizontal: 10, fontSize: 15.0, color: '#5a5a5a'}}>
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
            style={{paddingHorizontal: 10, fontSize: 15.0, color: '#5a5a5a'}}>
            When you visit our website{' '}
            <Text
              style={{color: 'blue', textDecorationLine: 'underline'}}
              onPress={() => Linking.openURL('https://www.my-lobby.com/')}>
              {'https://www.my-lobby.com/'}
            </Text>{' '}
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
            style={{paddingHorizontal: 10, fontSize: 15.0, color: '#5a5a5a'}}>
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
            style={{paddingHorizontal: 10, fontSize: 15.0, color: '#5a5a5a'}}>
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
                  <Text style={{color: 'black'}}>{index + 1}. </Text>
                  <Text style={{color: 'black'}}>{item}</Text>
                </View>
              );
            })}
          </View>
        </View>
        <View style={{...styles.headingsContainer, marginTop: Platform.OS === "ios" ? hp(0.5): hp(3)}}>
          <Text style={styles.headings}>
            1. WHAT INFORMATION DO WE COLLECT?
          </Text>
        </View>
        <View
          style={{
            ...styles.firstParagraph,
          }}>
          <Text
            style={{paddingHorizontal: 10, fontSize: 15.0, color: '#5a5a5a'}}>
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
            {'\u2022'} Log and Usage Data. Log and usage data are
            service-related, diagnostic usage and performance information our
            servers automatically collect when you access or use our Website and
            which we record in log files. Depending on how you interact with us,
            this log data may include your IP address, device information,
            browser type and settings, and information about your activity on
            the Website (such as the date/time stamps associated with your
            usage, pages, and files viewed, searches and other actions you take
            such as which features you use), device event information (such as
            system activity, error reports (sometimes called 'crash dumps') and
            hardware settings). Personal information you disclose to us {'\n'}
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
            {'\u2022'} Log and Usage Data. Log and usage data are
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
            {'\n'}
            {'\u2022'} Device Data. We collect device data such as information
            about your computer, phone, tablet or another device you use to
            access the Website. Depending on the device used, this device data
            may include information such as your IP address (or proxy server),
            device application identification numbers, location, browser type,
            hardware model Internet service provider and/or mobile carrier, and
            operating system configuration information.
            {'\n'}
            {'\u2022'} Location Data. We collect information data such as
            information about your device's location, which can be either
            precise or imprecise. How much information we collect depends on the
            type of settings of the device you use to access the Website. For
            example, we may use GPS and other technologies to collect
            geolocation data that tells us your current location (based on your
            IP address). You can opt-out of allowing us to collect this
            information either by refusing access to the information or by
            disabling your Locations settings on your device. Note, however,
            that if you choose to opt-out, you may not be able to use certain
            aspects of the Services.
          </Text>
        </View>
        <View style={styles.headingsContainer}>
          <Text style={styles.headings}>
            Information collected from other sources
          </Text>
        </View>
        <View
          style={{
            ...styles.firstParagraph,
            marginTop: 10.0,
          }}>
          <Text
            style={{
              paddingHorizontal: 10,
              fontSize: 15.0,
              fontStyle: 'italic',
              color: '#5a5a5a',
            }}>
            In Short: We may collect limited data from public databases,
            marketing partners, and other outside sources.
          </Text>
          <Text
            style={{paddingHorizontal: 10, fontSize: 15.0, color: '#5a5a5a'}}>
            In order to enhance our ability to provide relevant marketing,
            offers and services to you and update our records, we may obtain
            information about you from other sources, such as public databases,
            joint marketing partners, affiliate programs, data providers, as
            well as from other third parties. This information includes mailing
            addresses, job titles, email addresses, phone numbers, intent data
            (or user behavior data), Internet Protocol (IP) addresses, social
            media profiles, social media URLs and custom profiles, for purposes
            of targeted advertising and event promotion.
          </Text>
        </View>
        <View style={styles.headingsContainer}>
          <Text style={styles.headings}>
            2. HOW DO WE USE YOUR INFORMATION?
          </Text>
        </View>
        <View
          style={{
            ...styles.firstParagraph,
            marginTop: 10.0,
          }}>
          <Text
            style={{
              paddingHorizontal: 10,
              fontSize: 15.0,
              fontStyle: 'italic',
              color: '#5a5a5a',
            }}>
            In Short: We process your information for purposes based on
            legitimate business interests, the fulfillment of our contract with
            you, compliance with our legal obligations, and/or your consent.
          </Text>
          <Text
            style={{paddingHorizontal: 10, fontSize: 15.0, color: '#5a5a5a'}}>
            We use personal information collected via our Website for a variety
            of business purposes described below. We process your personal
            information for these purposes in reliance on our legitimate
            business interests, in order to enter into or perform a contract
            with you, with your consent, and/or for compliance with our legal
            obligations.{'\n'}
            {'\n'}We indicate the specific processing grounds we rely on next to
            each purpose listed below. We use the information we collect or
            receive:
            {'\n'}
            {'\n'}
            {'\u2022'} To facilitate account creation and logon process. If you
            choose to link your account with us to a third-party account (such
            as your Google or Facebook account), we use the information you
            allowed us to collect from those third parties to facilitate account
            creation and logon process for the performance of the contract.
            {'\n'}
            {'\n'}
            {'\u2022'} To post testimonials. We post testimonials on our Website
            that may contain personal information. Prior to posting a
            testimonial, we will obtain your consent to use your name and the
            consent of the testimonial. If you wish to update, or delete your
            testimonial, please contact us at test@example.com and be sure to
            include your name, testimonial location, and contact information.
            {'\n'}
            {'\n'}
            {'\u2022'} Request feedback. We may use your information to request
            feedback and to contact you about your use of our Website.
            {'\n'}
            {'\n'}
            {'\u2022'} To enable user-to-user communications. We may use your
            information in order to enable user-to-user communications with each
            user's consent.
            {'\n'}
            {'\n'}
            {'\u2022'} To manage user accounts. We may use your information for
            the purposes of managing our account and keeping it in working
            order.
            {'\n'}
            {'\n'}
            {'\u2022'} To send administrative information to you. We may use
            your personal information to send you product, service and new
            feature information and/or information about changes to our terms,
            conditions, and policies.
            {'\n'}
            {'\n'}
            {'\u2022'} To protect our Services. We may use your information as
            part of our efforts to keep our Website safe and secure (for
            example, for fraud monitoring and prevention).
            {'\n'}
            {'\n'}
            {'\u2022'} To enforce our terms, conditions and policies for
            business purposes, to comply with legal and regulatory requirements
            or in connection with our contract.
            {'\n'}
            {'\n'}
            {'\u2022'} To respond to legal requests and prevent harm. If we
            receive a subpoena or other legal request, we may need to inspect
            the data we hold to determine how to respond.
          </Text>
        </View>
        <View style={styles.headingsContainer}>
          <Text style={styles.headings}>
            3. WILL YOUR INFORMATION BE SHARED WITH ANYONE?
          </Text>
        </View>
        <View
          style={{
            ...styles.firstParagraph,
            marginTop: 10.0,
          }}>
          <Text
            style={{
              paddingHorizontal: 10,
              fontSize: 15.0,
              fontStyle: 'italic',
              color: '#5a5a5a',
            }}>
            In Short: We only share information with your consent, to comply
            with laws, to provide you with services, to protect your rights, or
            to fulfill business obligations.
          </Text>
          <Text
            style={{paddingHorizontal: 10, fontSize: 15.0, color: '#5a5a5a'}}>
            {'\n'}We may process or share your data that we hold based on the
            following legal basis:
            {'\n'}
            {'\n'}
            {'\u2022'} Consent: We may process your data if you have given us
            specific consent to use your personal information in a specific
            purpose.
            {'\n'}
            {'\n'}
            {'\u2022'} Legitimate Interests: We may process your data when it is
            reasonably necessary to achieve our legitimate business interests.
            {'\n'}
            {'\n'}
            {'\u2022'} Performance of a Contract: Where we have entered into a
            contract with you, we may process your personal information to
            fulfill the terms of our contract.
            {'\n'}
            {'\n'}
            {'\u2022'} Legal Obligations: We may disclose your information where
            we are legally required to do so in order to comply with applicable
            law, governmental requests, a judicial proceeding, court order, or
            legal process, such as in response to a court order or a subpoena
            (including in response to public authorities to meet national
            security or law enforcement requirements).
            {'\n'}
            {'\n'}
            {'\u2022'} Vital Interests: We may disclose your information where
            we believe it is necessary to investigate, prevent, or take action
            regarding potential violations of our policies, suspected fraud,
            situations involving potential threats to the safety of any person
            and illegal activities, or as evidence in litigation in which we are
            involved.
            {'\n'}
            {'\n'}
            More specifically, we may need to process your data or share your
            personal information in the following situations:
            {'\n'}
            {'\n'}
            {'\u2022'} Business Transfers. We may share or transfer your
            information in connection with, or during negotiations of, any
            merger, sale of company assets, financing, or acquisition of all or
            a portion of our business to another company.
            {'\n'}
            {'\n'}
            {'\u2022'} Affiliates. We may share your information with our
            affiliates, in which case we will require those affiliates to honor
            this privacy notice. Affiliates include our parent company and any
            subsidiaries, joint venture partners or other companies that we
            control or that are under common control with us.
          </Text>
        </View>
        <View style={styles.headingsContainer}>
          <Text style={styles.headings}>
            4. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?
          </Text>
        </View>
        <View
          style={{
            ...styles.firstParagraph,
            marginTop: 10.0,
          }}>
          <Text
            style={{
              paddingHorizontal: 10,
              fontSize: 15.0,
              fontStyle: 'italic',
              color: '#5a5a5a',
            }}>
            In Short: We may use cookies and other tracking technologies to
            collect and store your information.
          </Text>
          <Text
            style={{paddingHorizontal: 10, fontSize: 15.0, color: '#5a5a5a'}}>
            We may use cookies and similar tracking technologies (like web
            beacons and pixels) to access or store information. Specific
            information about how we use such technologies and how you can
            refuse certain cookies is set out in our Cookie Notice.
          </Text>
        </View>
        <View style={styles.headingsContainer}>
          <Text style={styles.headings}>
            5. HOW LONG DO WE KEEP YOUR INFORMATION?
          </Text>
        </View>
        <View
          style={{
            ...styles.firstParagraph,
            marginTop: 10.0,
          }}>
          <Text
            style={{
              paddingHorizontal: 10,
              fontSize: 15.0,
              fontStyle: 'italic',
              color: '#5a5a5a',
            }}>
            In Short: We keep your information for as long as necessary to
            fulfill the purposes outlined in this privacy notice unless
            otherwise required by law.
          </Text>
          <Text
            style={{paddingHorizontal: 10, fontSize: 15.0, color: '#5a5a5a'}}>
            {'\n'}We will only keep your personal information for as long as it
            is necessary for the purposes set out in this privacy notice, unless
            a longer retention period is required or permitted by law (such as
            tax, accounting or other legal requirements). No purpose in this
            notice will require us keeping your personal information for longer
            than one (1) months past the termination of the user's account.
            {'\n'}
            {'\n'}When we have no ongoing legitimate business need to process
            your personal information, we will either delete or anonymize such
            information, or, if this is not possible (for example, because your
            personal information has been stored in backup archives), then we
            will securely store your personal information and isolate it from
            any further processing until deletion is possible.
          </Text>
        </View>
        <View style={styles.headingsContainer}>
          <Text style={styles.headings}>
            6. HOW DO WE KEEP YOUR INFORMATION SAFE?
          </Text>
        </View>
        <View
          style={{
            ...styles.firstParagraph,
            marginTop: 10.0,
          }}>
          <Text
            style={{
              paddingHorizontal: 10,
              fontSize: 15.0,
              fontStyle: 'italic',
              color: '#5a5a5a',
            }}>
            In Short: We aim to protect your personal information through a
            system of organizational and technical security measures.
          </Text>
          <Text
            style={{paddingHorizontal: 10, fontSize: 15.0, color: '#5a5a5a'}}>
            {'\n'}We have implemented appropriate technical and organizational
            security measures designed to protect the security of any personal
            information we process. However, despite our safeguards and efforts
            to secure your information, no electronic transmission over the
            Internet or information storage technology can be guaranteed to be
            100% secure, so we cannot promise or guarantee that hackers, cyber
            criminals, or other unauthorized third parties will not be able to
            defeat our security, and improperly collect, access, steal, or
            modify your information. Although we will do our best to protect
            your personal information, transmission of personal information to
            and from our Website is at your own risk. You should only access the
            Website within a secure environment.
          </Text>
        </View>
        <View style={styles.headingsContainer}>
          <Text style={styles.headings}>
            7. DO WE COLLECT INFORMATION FROM MINORS?
          </Text>
        </View>
        <View
          style={{
            ...styles.firstParagraph,
            marginTop: 10.0,
          }}>
          <Text
            style={{
              paddingHorizontal: 10,
              fontSize: 15.0,
              fontStyle: 'italic',
              color: '#5a5a5a',
            }}>
            In Short: We do not knowingly collect data from or market to
            children under 18 years of age.
          </Text>
          <Text
            style={{paddingHorizontal: 10, fontSize: 15.0, color: '#5a5a5a'}}>
            {'\n'}We do not knowingly solicit data from or market to children
            under 18 years of age. By using the Website, you represent that you
            are at least 18 or that you are the parent or guardian of such a
            minor and consent to such minor dependent’s use of the Website. If
            we learn that personal information from users less than 18 years of
            age has been collected, we will deactivate the account and take
            reasonable measures to promptly delete such data from our records.
            If you become aware of any data we may have collected from children
            under age 18, please contact us at test@example.com.
          </Text>
        </View>
        <View style={styles.headingsContainer}>
          <Text style={styles.headings}>8. WHAT ARE YOUR PRIVACY RIGHTS?</Text>
        </View>
        <View
          style={{
            ...styles.firstParagraph,
            marginTop: 10.0,
          }}>
          <Text
            style={{
              paddingHorizontal: 10,
              fontSize: 15.0,
              fontStyle: 'italic',
              color: '#5a5a5a',
            }}>
            In Short: In some regions, such as the European Economic Area, you
            have rights that allow you greater access to and control over your
            personal information. You may review, change, or terminate your
            account at any time.
          </Text>
          <Text
            style={{paddingHorizontal: 10, fontSize: 15.0, color: '#5a5a5a'}}>
            {'\n'}In some regions (like the European Economic Area), you have
            certain rights under applicable data protection laws. These may
            include the right (i) to request access and obtain a copy of your
            personal information, (ii) to request rectification or erasure;
            (iii) to restrict the processing of your personal information; and
            (iv) if applicable, to data portability. In certain circumstances,
            you may also have the right to object to the processing of your
            personal information. To make such a request, please use the{' '}
            <Text
              style={{color: 'blue', textDecorationLine: 'underline'}}
              onPress={() =>
                Linking.openURL(
                  'https://app.termly.io/dashboard/website/499237/privacy-policy#contact',
                )
              }>
              contact details
            </Text>{' '}
            provided below. We will consider and act upon any request in
            accordance with applicable data protection laws.
            {'\n'}
            {'\n'}If we are relying on your consent to process your personal
            information, you have the right to withdraw your consent at any
            time. Please note however that this will not affect the lawfulness
            of the processing before its withdrawal, nor will it affect the
            processing of your personal information conducted in reliance on
            lawful processing grounds other than consent.
            {'\n'}
            {'\n'}If you are resident in the European Economic Area and you
            believe we are unlawfully processing your personal information, you
            also have the right to complain to your local data protection
            supervisory authority. You can find their contact details here:
            <Text
              style={{color: 'blue', textDecorationLine: 'underline'}}
              onPress={() =>
                Linking.openURL(
                  'http://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm.',
                )
              }>
              http://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm.
            </Text>
            {'\n'}
            {'\n'}If you are resident in Switzerland, the contact details for
            the data protection authorities are available here:
            <Text
              style={{color: 'blue', textDecorationLine: 'underline'}}
              onPress={() =>
                Linking.openURL('https://www.edoeb.admin.ch/edoeb/en/home.html')
              }>
              https://www.edoeb.admin.ch/edoeb/en/home.html
            </Text>
            .{'\n'}
            {'\n'}If you have questions or comments about your privacy rights,
            you may email us at test@example.com.
            {'\n'}
            {'\n'}
            <Text style={{fontWeight: '500', color: 'black'}}>
              Account Information
            </Text>
            {'\n'}
            {'\n'}If you would at any time like to review or change the
            information in your account or terminate your account, you can:
            {'\n'}
            {'\n'}
            {'\u2022'} Log in to your account settings and update your user
            account.
            {'\n'}
            {'\n'}
            {'\u2022'} Contact us using the contact information provided.
            {'\n'}
            {'\n'}
            Upon your request to terminate your account, we will deactivate or
            delete your account and information from our active databases.
            However, we may retain some information in our files to prevent
            fraud, troubleshoot problems, assist with any investigations,
            enforce our Terms of Use and/or comply with applicable legal
            requirements.
            {'\n'}
            {'\n'}
            <Text style={{textDecorationLine: 'underline'}}>
              Cookies and similar technologies:
            </Text>{' '}
            Most Web browsers are set to accept cookies by default. If you
            prefer, you can usually choose to set your browser to remove cookies
            and to reject cookies. If you choose to remove cookies or reject
            cookies, this could affect certain features or services of our
            Website. To opt-out of interest-based advertising by advertisers on
            our Website visit{' '}
            <Text
              style={{color: 'blue', textDecorationLine: 'underline'}}
              onPress={() =>
                Linking.openURL('http://www.aboutads.info/choices/')
              }>
              http://www.aboutads.info/choices
            </Text>
            {'\n'}
            {'\n'}
            <Text style={{textDecorationLine: 'underline'}}>
              Opting out of email marketing:
            </Text>
            You can unsubscribe from our marketing email list at any time by
            clicking on the unsubscribe link in the emails that we send or by
            contacting us using the details provided below. You will then be
            removed from the marketing email list – however, we may still
            communicate with you, for example to send you service-related emails
            that are necessary for the administration and use of your account,
            to respond to service requests, or for other non-marketing purposes.
            To otherwise opt-out, you may:
            {'\n'}
            {'\n'}
            {'\u2022'} Access your account settings and update your preferences.
            {'\n'}
            {'\n'}
            {'\u2022'} Contact us using the contact information provided.
          </Text>
        </View>
        <View style={styles.headingsContainer}>
          <Text style={styles.headings}>
            9. CONTROLS FOR DO-NOT-TRACK FEATURES
          </Text>
        </View>
        <View
          style={{
            ...styles.firstParagraph,
          }}>
          <Text
            style={{paddingHorizontal: 10, fontSize: 15.0, color: '#5a5a5a'}}>
            {'\n'}Most web browsers and some mobile operating systems and mobile
            applications include a Do-Not-Track (“DNT”) feature or setting you
            can activate to signal your privacy preference not to have data
            about your online browsing activities monitored and collected. At
            this stage, no uniform technology standard for recognizing and
            implementing DNT signals has been finalized. As such, we do not
            currently respond to DNT browser signals or any other mechanism that
            automatically communicates your choice not to be tracked online. If
            a standard for online tracking is adopted that we must follow in the
            future, we will inform you about that practice in a revised version
            of this privacy notice.
          </Text>
        </View>
        <View style={styles.headingsContainer}>
          <Text style={styles.headings}>
            10. DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?
          </Text>
        </View>
        <View
          style={{
            ...styles.firstParagraph,
          }}>
          <Text
            style={{
              paddingHorizontal: 10,
              fontSize: 15.0,
              fontStyle: 'italic',
              color: '#5a5a5a',
            }}>
            In Short: Yes, if you are a resident of California, you are granted
            specific rights regarding access to your personal information.
          </Text>
          <Text
            style={{paddingHorizontal: 10, fontSize: 15.0, color: '#5a5a5a'}}>
            {'\n'}California Civil Code Section 1798.83, also known as the
            “Shine The Light” law, permits our users who are California
            residents to request and obtain from us, once a year and free of
            charge, information about categories of personal information (if
            any) we disclosed to third parties for direct marketing purposes and
            the names and addresses of all third parties with which we shared
            personal information in the immediately preceding calendar year. If
            you are a California resident and would like to make such a request,
            please submit your request in writing to us using the contact
            information provided below. If you are under 18 years of age, reside
            in California, and have a registered account with the Website, you
            have the right to request removal of unwanted data that you publicly
            post on the Website. To request removal of such data, please contact
            us using the contact information provided below, and include the
            email address associated with your account and a statement that you
            reside in California. We will make sure the data is not publicly
            displayed on the Website, but please be aware that the data may not
            be completely or comprehensively removed from all our systems (e.g.
            backups, etc.).
            {'\n'}
            {'\n'}
            <Text style={{fontWeight: '400', color: 'black'}}>
              CCPA Privacy Notice
            </Text>
            {'\n'}
            {'\n'}
            The California Code of Regulations defines a "resident" as: {'\n'}
            {'\n'}
            {'\t'}
            {'\t'}(1) every individual who is in the State of California for
            other than a temporary or transitory purpose and {'\n'}
            {'\n'}
            {'\t'}
            {'\t'}(2) every individual who is domiciled in the State of
            California who is outside the State of California for a temporary or
            transitory purpose.
            {'\n'}
            {'\n'}
            All other individuals are defined as "non-residents."
            {'\n'}
            {'\n'}If this definition of "resident" applies to you, certain
            rights and obligations apply regarding your personal information.
            {'\n'}
            {'\n'}
            What categories of personal information do we collect? We have
            collected the following categories of personal information in the
            past twelve (12) months:{'\n'}
          </Text>
          <Image
            style={{width: '100%', height: 650}}
            resizeMode="contain"
            source={Table}
          />
          <Text
            style={{paddingHorizontal: 10, fontSize: 15.0, color: '#5a5a5a'}}>
            {'\n'}
            {'\n'}
            We may also collect other personal information outside of these
            categories in instances where you interact with us in-person,
            online, or by phone or mail in the context of:
            {'\n'}
            {'\n'}
            {'\u2022'} Receiving help through our customer support channels
            {'\n'}
            {'\n'}
            {'\u2022'} Participation in customer surveys or contests; and
            {'\n'}
            {'\n'}
            {'\u2022'} Facilitation in the delivery of our Services and to
            respond to your inquiries How do we use and share your personal
            information?
            {'\n'}
            {'\n'}
            More information about our data collection and sharing practices can
            be found in this privacy notice.{'\n'}
            {'\n'}You may contact us by email at test@contact.com, by calling
            toll-free at 1-866-636-0636, or by referring to the contact details
            at the bottom of this document.{'\n'}
            {'\n'}If you are using an authorized agent to exercise your right to
            opt-out, we may deny a request if the authorized agent does not
            submit proof that they have been validly authorized to act on your
            behalf.{'\n'}
            {'\n'}Will your information be shared with anyone else? We may
            disclose your personal information with our service providers
            pursuant to a written contract between us and each service provider.
            Each service provider is a for-profit entity that processes the
            information on our behalf.{'\n'}
            {'\n'}We may use your personal information for our own business
            purposes, such as for undertaking internal research for
            technological development and demonstration. This is not considered
            to be "selling" of your personal data.{'\n'}
            {'\n'}MyMedia Inc. has not disclosed or sold any personal
            information to third parties for a business or commercial purpose in
            the preceding twelve (12) months. MyMedia Inc. will not sell
            personal information in the future belonging to website visitors,
            users and other consumers.{'\n'}
            {'\n'}Your rights with respect to your personal data{'\n'}
            {'\n'}
            <Text style={{textDecorationLine: 'underline'}}>
              Right to request deletion of the data - Request to delete{' '}
            </Text>
            {'\n'}
            {'\n'}You can ask for the deletion of your personal information. If
            you ask us to delete your personal information, we will respect your
            request and delete your personal information, subject to certain
            exceptions provided by law, such as (but not limited to) the
            exercise by another consumer of his or her right to free speech, our
            compliance requirements resulting from a legal obligation or any
            processing that may be required to protect against illegal
            activities.{'\n'}
            {'\n'}
            <Text style={{textDecorationLine: 'underline'}}>
              Right to be informed - Request to know
            </Text>
            {'\n'}
            {'\n'}
            Depending on the circumstances, you have a right to know:
            {'\n'}
            {'\u2022'} whether we collect and use your personal information;
            {'\n'}
            {'\u2022'} the categories of personal information that we collect;
            {'\n'}
            {'\u2022'} the purposes for which the collected personal information
            is used;
            {'\n'}
            {'\u2022'} whether we sell your personal information to third
            parties;
            {'\n'}
            {'\u2022'} the categories of personal information that we sold or
            disclosed for a business purpose;
            {'\n'}
            {'\u2022'} the categories of third parties to whom the personal
            information was sold or disclosed for a business purpose; and
            {'\n'}
            {'\u2022'} the business or commercial purpose for collecting or
            selling personal information.
            {'\n'}
            {'\n'}
            In accordance with applicable law, we are not obligated to provide
            or delete consumer information that is de-identified in response to
            a consumer request or to re-identify individual data to verify a
            consumer request.{'\n'}
            {'\n'}
            <Text style={{textDecorationLine: 'underline'}}>
              Right to Non-Discrimination for the Exercise of a Consumer's
              Privacy Rights
            </Text>
            {'\n'}
            {'\n'}We will not discriminate against you if you exercise your
            privacy rights.{'\n'}
            {'\n'}
            <Text style={{textDecorationLine: 'underline'}}>
              Verification process
            </Text>
            {'\n'}
            {'\n'}
            Upon receiving your request, we will need to verify your identity to
            determine you are the same person about whom we have the information
            in our system. These verification efforts require us to ask you to
            provide information so that we can match it with the information you
            have previously provided us. For instance, depending on the type of
            request you submit, we may ask you to provide certain information so
            that we can match the information you provide with the information
            we already have on file, or we may contact you through a
            communication method (e.g. phone or email) that you have previously
            provided to us. We may also use other verification methods as the
            circumstances dictate.
            {'\n'}
            {'\n'}We will only use personal information provided in your request
            to verify your identity or authority to make the request. To the
            extent possible, we will avoid requesting additional information
            from you for the purposes of verification. If, however, if we cannot
            verify your identity from the information already maintained by us,
            we may request that you provide additional information for the
            purposes of verifying your identity, and for security or
            fraud-prevention purposes. We will delete such additionally provided
            information as soon as we finish verifying you.
            {'\n'}
            {'\n'}
            <Text style={{textDecorationLine: 'underline'}}>
              Other privacy rights
            </Text>
            {'\n'}
            {'\u2022'} you may object to the processing of your personal data
            {'\n'}
            {'\u2022'} you may request correction of your personal data if it is
            incorrect or no longer relevant, or ask to restrict the processing
            of the data
            {'\n'}
            {'\u2022'} you can designate an authorized agent to make a request
            under the CCPA on your behalf. We may deny a request from an
            authorized agent that does not submit proof that they have been
            validly authorized to act on your behalf in accordance with the
            CCPA.
            {'\n'}
            {'\u2022'} you may request to opt-out from future selling of your
            personal information to third parties. Upon receiving a request to
            opt-out, we will act upon the request as soon as feasibly possible,
            but no later than 15 days from the date of the request submission.
            {'\n'}
            {'\n'}To exercise these rights, you can contact us by email at
            test@contact.com, by calling toll-free at 1-866-636-0636, or by
            referring to the contact details at the bottom of this document. If
            you have a complaint about how we handle your data, we would like to
            hear from you.
            {'\n'}
            {'\n'}
          </Text>
        </View>
        <View style={styles.headingsContainer}>
          <Text style={styles.headings}>
            11. DO WE MAKE UPDATES TO THIS NOTICE?
          </Text>
        </View>
        <View
          style={{
            ...styles.firstParagraph,
            marginTop: 10.0,
          }}>
          <Text
            style={{
              paddingHorizontal: 10,
              fontSize: 15.0,
              fontStyle: 'italic',
              color: '#5a5a5a',
            }}>
            In Short: Yes, we will update this notice as necessary to stay
            compliant with relevant laws.
          </Text>
          <Text
            style={{paddingHorizontal: 10, fontSize: 15.0, color: '#5a5a5a'}}>
            {'\n'}
            {'\n'}We may update this privacy notice from time to time. The
            updated version will be indicated by an updated “Revised” date and
            the updated version will be effective as soon as it is accessible.
            If we make material changes to this privacy notice, we may notify
            you either by prominently posting a notice of such changes or by
            directly sending you a notification. We encourage you to review this
            privacy notice frequently to be informed of how we are protecting
            your information.
          </Text>
        </View>
        <View style={styles.headingsContainer}>
          <Text style={styles.headings}>
            12. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?
          </Text>
        </View>
        <View
          style={{
            ...styles.firstParagraph,
            marginTop: 5.0,
          }}>
          <Text
            style={{
              paddingHorizontal: 10,
              marginBottom: 30,
              fontSize: 15.0,
              color: '#5a5a5a',
            }}>
            {'\n'}If you have questions or comments about this notice, you may
            contact our Data Protection Officer (DPO), Test DPO name, by email
            at test@example.com, by phone at 1-866-636-0636, or by post to:
            {'\n'}
            {'\n'}
            MyMedia Inc.{'\n'}
            Test DPO name{'\n'}
            5063 North Service Rd., Suite 200 Burlington{'\n'}
            Ontario Canada{'\n'}
            {'\n'}
            {'\n'}
            HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?
            {'\n'}
            {'\n'}
            Based on the applicable laws of your country, you may have the right
            to request access to the personal information we collect from you,
            change that information, or delete it in some circumstances. To
            request to review, update, or delete your personal information,
            please visit: __________. We will respond to your request within 30
            days.
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
    marginTop: 15.0,
  },
  headings: {
    fontSize: hp(2),
    fontWeight: '700',
    color: 'black',
  },
  headingsContainer: {
    padding: wp(2),
  },
});

export default PrivacyPolicy;
