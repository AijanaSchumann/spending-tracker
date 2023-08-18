import React, { useEffect, useRef } from 'react';
import {useState} from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {Entry} from '../../../models/entry';
import TimeFilter from './TimeFilter';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatcher, RootState } from '../../../store/store';
import { updateMonthFilter } from '../../../store/slices/overviewSlice';

type Props = {
  data: (Entry )[];
  onFilterChanged(data: (Entry )[]): void;
};

const styles = StyleSheet.create({
  text: {fontSize: 22},
  textInput: { width: 25},
});

const MonthFilter = (props: Props) => {

  const date = useSelector((state: RootState)=> state.overview.filter.month);
  const dispatch = useDispatch<Dispatcher>();

  const [month, setMonth] = useState(new Date(date).getMonth());
  const [year, setYear] = useState(new Date(date).getFullYear());

  const timeoutRef = useRef<undefined | ReturnType<typeof setTimeout>>(undefined);

  useEffect(()=>{

    return ()=>{
      clearTimeout(timeoutRef.current);
    }
  }, []);

  React.useEffect(() => {
    updateFilter(month, year);

    clearTimeout(timeoutRef.current);
    delayedUpdate(month, year);

  }, [month, year]);

  React.useEffect(() => {
    updateFilter(month, year);
},[props.data]);


  const updateFilter = (newMonth: number, newYear: number) => {
    if (newMonth > 12 || newMonth < 0) {
      props.onFilterChanged([]);
    } else {
      const data = props.data.filter(
        el => {
          const elDate = new Date(el.date);
          return elDate.getMonth() === newMonth && elDate.getFullYear() === newYear
        }
      );
      props.onFilterChanged(data);
    }
  };

    /***
   * Saves current day/month/year after user stopped changing values
   */
    const delayedUpdate = (newMonth: number, newYear: number) => {
      timeoutRef.current = setTimeout(() => {
        dispatch(updateMonthFilter(new Date(newYear, newMonth, 1).getTime()));
      }, 1500);
    };

  const onBack = () =>{
    if(month === 0){
      // jump to prev. year
      setMonth(11);
      setYear(year-1);
    }else{
      setMonth(month-1);
    }
  }

  const onForward = () =>{
    if(month === 11){
      // jump to next year
      setMonth(0);
      setYear(year+1);
    }else{
      setMonth(month+1);
    }
  }

   // add / substract 1 to handle 0 based month in textinput
  return (
    <TimeFilter year={year} onBack={onBack} onForward={onForward}>
       <TextInput
        style={[styles.text, styles.textInput]}
        value={(month+1).toString()}
        onChangeText={e => setMonth(Number(e)-1)}
        keyboardType="numeric"
      />
      </TimeFilter>
  );
};

export default MonthFilter;