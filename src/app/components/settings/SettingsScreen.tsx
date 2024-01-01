import { PropsWithChildren } from "react"
import {  StyleSheet, Text, View } from "react-native"

type Props = PropsWithChildren;

const SettingsScreen = (props: Props) =>{

    return <View style={styles.background}>
          {props.children}
        </View>
}

export default SettingsScreen;

const styles = StyleSheet.create({
    background: {
      height: "99%",
      backgroundColor: 'white',
      padding: 30,
      marginTop: 5
    },
  });
  