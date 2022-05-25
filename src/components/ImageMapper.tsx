/* eslint-disable react-native/no-inline-styles */
import { allowStateReadsStart } from 'mobx/dist/internal';
import React, {Component} from 'react';
import {ImageBackground, View, TouchableOpacity} from 'react-native';

class ImageMapper extends Component {
  static defaultProps: {multiselect: boolean, imgSource: string, imgMap: any, onPress: any, imgHeight:any, imgWidth:any, containerStyle:any, selectedAreaId:any};
 
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
    const {imgHeight, imgWidth, imgSource, imgMap, containerStyle, onPress} = this
      .props as any;
      console.log('====================================');
      console.log('imgMap =>', imgMap);
      console.log('====================================');
      console.log('====================================');
      console.log(imgSource);
      console.log('====================================');
    return (
      <View style={[{flex: 1}, containerStyle]}>
        <ImageBackground
          style={{height: imgHeight, width: imgWidth}}
          source={{ uri: `${imgSource}`}}>
          {imgMap?.map((item: any, index: any) => (
            <TouchableOpacity
              key={item.id}
              onPress={event => onPress(item, index, event)}
              style={[{position: 'absolute'}, this.buildStyle(item)]}
            />
          ))}
        </ImageBackground>
      </View>
    );
  }
}

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
