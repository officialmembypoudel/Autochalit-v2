import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

const Card = ({
  children,
  title,
  subtitle,
  titleColor,
  subtitleColor,
  backgroundColor,
  height,
  width,
  indicator,
  indicatorHigh,
  imgSrc,
  containerStyle,
  onPress,
  pressDisabled,
}) => {
  return (
    <TouchableOpacity
      disabled={pressDisabled}
      onPress={onPress ?? null}
      activeOpacity={0.6}
      style={{
        ...styles.container,
        backgroundColor: backgroundColor
          ? backgroundColor
          : styles.container.backgroundColor,
        height: height ?? 150,
        width: width ?? 165,
        ...containerStyle,
      }}>
      {indicator && (
        <View
          style={{
            ...styles.indicator,
            backgroundColor: indicatorHigh ? '#2ACE30' : '#dc3545',
          }}></View>
      )}
      {imgSrc && (
        <Image
          style={{
            width: 56,
            height: 56,
            marginHorizontal: 'auto',
            marginVertical: 'auto',
          }}
          source={imgSrc}
        />
      )}

      {title && (
        <Text style={{...styles.title, color: titleColor ?? '#fff'}}>
          {title}
        </Text>
      )}
      {subtitle && (
        <Text style={{...styles.subtitle, color: subtitleColor ?? '#fff'}}>
          {subtitle}
        </Text>
      )}

      {children}
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#A4DDF6',
    padding: 10,
    borderRadius: 16,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.26,
    shadowRadius: 1,
    elevation: 1,
    justifyContent: 'flex-end',
    position: 'relative',
    borderColor: 'grey',
    borderWidth: 0.2,
  },
  indicator: {
    width: 20,
    height: 20,
    backgroundColor: '#dc3545',
    borderRadius: 50,
    position: 'absolute',
    top: 10,
    right: 10,
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
  },
});
