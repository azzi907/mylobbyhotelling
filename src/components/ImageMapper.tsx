/* eslint-disable react-native/no-inline-styles */
import {allowStateReadsStart} from 'mobx/dist/internal';
import React, {Component} from 'react';
import {
  ImageBackground,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import BlinkView from 'react-native-blink-view';
import {Image} from 'react-native';
import SOCIAL_DISTANCING from '../../images/socialDistancingIcon.png';
import USER_ICON from '../../images/userIcon.png';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

class ImageMapper extends Component {
  static defaultProps: {
    multiselect: boolean;
    imgSource: string;
    imgMap: any;
    onPress: any;
    imgHeight: any;
    imgWidth: any;
    containerStyle: any;
    selectedAreaId: any;
  };

  buildStyle(item: any) {
    const {x1, y1, x2, y2, width, height, shape, fill, prefill, id, radius} =
      item;
    const {selectedAreaId, multiselect} = this.props as any;
    let areaId = selectedAreaId;
    if (
      multiselect &&
      (selectedAreaId === null || selectedAreaId === undefined)
    ) {
      areaId = [];
    }
    const style: any = {
      width: 0,
      height: 0,
      left: x1,
      top: y1,
    };
    if (prefill !== null && prefill !== undefined) {
      if ((multiselect && !areaId.includes(id)) || id !== areaId) {
        style.backgroundColor = prefill;
      }
    }
    if (fill !== null && fill !== undefined) {
      if ((multiselect && areaId.includes(id)) || id === areaId) {
        style.backgroundColor = fill;
      }
    }
    if (shape === 'rectangle') {
      style.width = width === null || width === undefined ? x2 - x1 : width;
      style.height = height === null || height === undefined ? y2 - y1 : height;
    }
    if (shape === 'circle') {
      style.width = radius;
      style.height = radius;
      style.borderRadius = radius / 2;
    }
    return style;
  }

  render() {
    const {
      imgHeight,
      imgWidth,
      imgSource,
      imgMap,
      containerStyle,
      onPress,
      imgSrc,
    } = this.props as any;
    return (
      <View style={[{flex: 1}, containerStyle]}>
        <ImageBackground
          style={{height: imgHeight, width: imgWidth}}
          source={{uri: `${imgSource}`}}>
          {imgMap?.map((item: any, index: any) => (
            <>
              {item.fill === 'yellow' ? null :
              <TouchableOpacity
                key={item.id}
                onPress={event => onPress(item, index, event)}
                style={[{position: 'absolute'}, this.buildStyle(item)]}>
                {item.prefill === '#324fb650' && item.fill === '#324fb650' ? (
                  <BlinkView
                    useNativeDriver={false}
                    blinking={
                      item.prefill === '#324fb650' && item.fill === '#324fb650'
                        ? true
                        : false
                    }
                    delay={600}>
                    <Image
                      source={USER_ICON}
                      style={{
                        height: hp(3.5),
                        width: wp(7),
                      }}
                    />
                  </BlinkView>
                ) : item.prefill === 'white' && item.fill === 'white' ? (
                  <Image
                    source={SOCIAL_DISTANCING}
                    style={{
                      height: hp(2),
                      width: wp(4),
                    }}
                  />
                ) : null}
              </TouchableOpacity>}
            </>
          ))}
        </ImageBackground>
      </View>
    );
  }
}
const styles = StyleSheet.create({});
ImageMapper.defaultProps = {
  multiselect: false,
  imgSource: '',
  imgMap: null,
  onPress: null,
  selectedAreaId: null,
  imgHeight: null,
  imgWidth: null,
  containerStyle: null,
};

export default ImageMapper;
