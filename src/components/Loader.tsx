import React from 'react';
import {
  StyleSheet,
  View,
  Modal,
  Image,
  ActivityIndicator
} from 'react-native';

function Loader(props:any) {

  return (
      <Modal
        transparent={true}
        animationType={'none'}
        visible={true}
        style={{ zIndex: 1100 }}
        onRequestClose={() => { }}>
        <View style={styles.modalBackground}>
          <View style={styles.activityIndicatorWrapper}>
            <Image
              source={require('../../images/loader.gif')}
              style={{ height: 80, width: 80 }}
              resizeMode="contain"
              resizeMethod="resize"
            />
          </View>
        </View>
      </Modal>
    )
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#rgba(0, 0, 0, 0.5)',
    zIndex: 1000
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
});

export default Loader;