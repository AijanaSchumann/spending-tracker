import {faArrowLeft, faArrowRight} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {PropsWithChildren} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

type Props = {
  year: number;
  onBack(): void;
  onForward(): void;
} & PropsWithChildren;

const TimeFilter = (props: Props) => {
  const iconSize = 23;

  return (
    <View style={{alignItems: 'center', padding: 5}}>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.button}>
          <Pressable onPress={e => props.onBack()}>
            <FontAwesomeIcon size={iconSize} icon={faArrowLeft} />
          </Pressable>
        </View>
        <View style={{flexDirection: 'row', padding: 3}}>
          {props.children}
          <Text style={styles.text}>/{props.year}</Text>
        </View>
        <View style={styles.button}>
          <Pressable onPress={e => props.onForward()}>
            <FontAwesomeIcon size={iconSize} icon={faArrowRight} />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default TimeFilter;

const styles = StyleSheet.create({
  text: {fontSize: 22},
  button: {
    borderRadius: 2,
    borderColor: 'black',
    borderWidth: 2,
    alignSelf: 'center',
  }
});