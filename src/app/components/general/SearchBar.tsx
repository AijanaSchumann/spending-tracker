import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useRef, useState } from "react";
import { Pressable, StyleProp, StyleSheet, TextInput, View, ViewStyle } from "react-native";


type Props = {
    value: string
    onValueChange(val: string): void,
    style?: StyleProp<ViewStyle>
};

const SearchBar = (props: Props ) =>{

    return (
        <View style={[styles.searchContainer, props.style || {}]}>
        <FontAwesomeIcon size={20} icon={faSearch} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={props.value}
          onChangeText={props.onValueChange}
        />
      </View>
     
    );
}

export default SearchBar;

const styles = StyleSheet.create({
    searchContainer: {
      display: 'flex',
      flexDirection: 'row',
      borderRadius: 25,
      backgroundColor: '#e1e3e1',
      marginBottom: 10,
    },
    searchIcon: {
      alignSelf: 'center',
      marginLeft: 7,
      color: 'grey',
    },
    searchInput: {fontSize: 23, padding: 3, width:"100%"},
  });