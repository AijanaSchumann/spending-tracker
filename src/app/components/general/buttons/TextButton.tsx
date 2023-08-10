import {Pressable, StyleSheet, Text, View} from 'react-native';

type Props = {
  onAction(): void;
  color: string;
  borderColor?: string;
  title: string;
};

const TextButton = (props: Props) => {
  return (
    <Pressable onPress={props.onAction} style={{flex: 1, padding: 5}}>
      <View
        style={[styles.container,{backgroundColor: props.color,borderColor: props.borderColor || 'white'}]}>
        <Text style={styles.title}>{props.title}</Text>
      </View>
    </Pressable>
  );
};

export default TextButton;

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    borderWidth: 2,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  title: {
    fontSize: 18,
    textAlign: 'center',

    //color: '#fff',
    fontWeight: 'bold',
  },
});
