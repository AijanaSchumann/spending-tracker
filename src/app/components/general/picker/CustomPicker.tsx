import {Picker, PickerProps} from '@react-native-picker/picker';
import React from 'react';
import {Pressable, StyleSheet, Text, TouchableHighlight, View} from 'react-native';

const styles = StyleSheet.create({
  selectedElement: {
    height: 33,
    marginTop: 5,
    paddingTop: 5,
    paddingLeft: 5,
    backgroundColor: 'lightgrey',
    fontSize: 20,
  },
  conatainer: {
    display:"flex", flexDirection: 'column' // stop outer flex from screwing up the layout
  }
});

type Props = PickerProps & {
  value: string;
  children?: React.ReactNode;
};

const CustomPicker = (props: Props) => {
    
  const [isVisible, setVisible] = React.useState(true);

  return (
    <View style={styles.conatainer}>
      {isVisible ? (
        <Pressable onPress={e => setVisible(false)}>
          <Text
            style={styles.selectedElement}>
            {props.value}
          </Text>
        </Pressable>
      ) : (
        <Picker
          {...props}
          onValueChange={(e, i) => {
            props.onValueChange?.(e, i);
            setVisible(true);
          }}>
          {props.children}
        </Picker>
      )}
    </View>
  );
};

export default CustomPicker;
