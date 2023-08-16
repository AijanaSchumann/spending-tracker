import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {Pressable, StyleSheet, Text, View} from 'react-native';

type Props = {
  onAction(): void;
  color?: string;
  borderColor?: string;
  icon? : IconDefinition,
  fullWidth?: boolean
  title: string;
};

const TextButton = (props: Props) => {

  const widthCss = !props.fullWidth ? styles.nonFullWidth : styles.fullWidth;

  return (
    <Pressable onPress={props.onAction} style={[{padding: 5}, widthCss]}>
      <View
        style={[styles.container,{backgroundColor: props.color || "white", borderColor: props.borderColor || 'white'}]}>
        {
          props.icon &&
          <FontAwesomeIcon style={{marginLeft: 20}} size={23} icon={props.icon} />
        }
        <Text style={styles.title}>{props.title}</Text>
      </View>
    </Pressable>
  );
};

export default TextButton;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
   // justifyContent:"center",
    borderRadius: 30,
    borderWidth: 2,
    paddingHorizontal: 10,
    paddingVertical: 10,
    paddingRight: 35
  },
  title: {
    marginLeft: 10,
    fontSize: 18,
    textAlign: 'center',

    //color: '#fff',
    fontWeight: 'bold',
  },
  nonFullWidth: {
    alignSelf: "center"
  },
  fullWidth:
  {flex: 1}
});
