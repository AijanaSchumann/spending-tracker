import {faArrowLeft, faArrowRight} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {useState} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {Entry} from '../../../models/entry';

type Props = {
  data: (Entry )[];
  onFilterChanged(data: (Entry )[]): void;
  isDay?: boolean;
};

const styles = StyleSheet.create({
  text: {fontSize: 22},
  textInput: { width: 25},
  button:  {borderRadius: 2, borderColor: "black", borderWidth: 2,  alignSelf: "center"}
});

const iconSize = 23;

const MonthOrDayFilter = (props: Props) => {
  const [month, setMonth] = useState(new Date().getMonth());
  const [day, setDay] = useState(new Date().getDay());
  const [year, setYear] = useState(new Date().getFullYear());

  React.useEffect(() => {
    updateMonthFilter(month);
  }, []);

  React.useEffect(() => {
    updateMonthFilter(month);
  }, [month]);

  const updateDayFilter = (newDay: number) => {
    if (newDay <= 0 || newDay >= 32) {
      props.onFilterChanged([]);
    } else {
      const data = props.data.filter(el => {
        const date = new Date(el.date);
        return date.getMonth() === month && date.getDate() === newDay;
      });
     
      props.onFilterChanged(data);
    }

    setDay(newDay);
  };

  const updateMonthFilter = (newMonth: number) => {
    if (newMonth > 12 || newMonth < 0) {
      props.onFilterChanged([]);
    } else {
      const data = props.data.filter(
        el => new Date(el.date).getMonth() === newMonth,
      );
      props.onFilterChanged(data);
    }
  };

  return (
    <View style={{alignItems:"center", padding: 5}}>
        <View style={{flexDirection: 'row'}}>
        <View style={styles.button}>
        <Pressable onPress={e => setMonth(month - 1)}>
        <FontAwesomeIcon size={iconSize} icon={faArrowLeft} />
      </Pressable>
        </View>

      <View style={{flexDirection: "row", padding: 3}}>
      {props.isDay && (
        <>
          <TextInput
            style={[styles.text, styles.textInput]}
            value={day.toString()}
            onChangeText={e => updateDayFilter(Number(e))}
            keyboardType="numeric"
          />
          <Text style={styles.text}>/</Text>
          <Text style={styles.text}>{month+1}</Text>
        </>
      )}
      {
        // add / substract 1 to handle 0 based month
      }{
       !props.isDay &&
       <TextInput
        style={[styles.text, styles.textInput]}
        value={(month+1).toString()}
        onChangeText={e => setMonth(Number(e)-1)}
        keyboardType="numeric"
      />
      }
      <Text style={styles.text}>/{year}</Text>
      </View>
      <View style={styles.button}>
      <Pressable onPress={e => setMonth(month + 1)} >
        <FontAwesomeIcon size={iconSize} icon={faArrowRight} />
      </Pressable>
      </View>
      </View>
    </View>
  );
};

export default MonthOrDayFilter;
