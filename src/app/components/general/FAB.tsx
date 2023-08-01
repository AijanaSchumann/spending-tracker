import {IconDefinition} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {FC} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    position: 'absolute',
    backgroundColor: 'red',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  title: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

type Props = {onPress: () => void; 
  icon: IconDefinition, 
  color?: string,
  center? : boolean,
  position?:{ bottom: number, right:number}};

const FAB: FC<Props> = (props: Props) => {

  const defaultPosition =  {bottom: 10, right: 20};
  const defaultColor = "red";

  const absolutePosition = { ...props.position || defaultPosition };
  const colorCSS = { backgroundColor: props.color ? props.color : defaultColor};
  const positionCSS : any = props.center ? {alignSelf: "center", bottom: 30} : absolutePosition;



  return (
    <Pressable onPress={props.onPress} style={[styles.container, colorCSS, positionCSS ]}>
      <FontAwesomeIcon size={30} style={{height: '40px'}} icon={props.icon} />
    </Pressable>

  );
};

export default FAB;