import RNDateTimePicker from '@react-native-community/datetimepicker';
import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import ReactNativeModal from 'react-native-modal';

import '../../../extensions/DateExtension';

type Props = {
  date: Date;
  onDateChanged(newDate: Date): void;
};

const styles = StyleSheet.create({
  text: {
    height: 33,
    paddingTop: 2,
    paddingLeft:5,
    backgroundColor: 'lightgrey',
    textAlign: 'center',
    fontSize: 20,
  },

});

const CustomDatePicker = (props: Props) => {
  const [isVisible, setVisible] = React.useState(false);

  return (
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <Pressable onPress={e => setVisible(true)}>
            <Text style={styles.text}>
              {props.date.toDayName()}, {props.date.toLocaleDateString()}
            </Text>
          </Pressable>
          <ReactNativeModal
            isVisible={isVisible}
            animationIn={"fadeIn"}
            animationOut={"fadeOut"}
            onBackdropPress={() => setVisible(false)}>
            <View style={{backgroundColor: 'white', borderRadius: 20}}>
              <RNDateTimePicker
                display="inline"
                value={props.date}
                onChange={(e, date) => {
                  props.onDateChanged(date!);
                  setVisible(false);
                }}
              />
            </View>
          </ReactNativeModal>
        </View>
  );
};

export default CustomDatePicker;
