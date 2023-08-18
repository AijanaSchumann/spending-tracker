import {useEffect, useRef, useState} from 'react';
import {Entry} from '../../../models/entry';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import TimeFilter from './TimeFilter';
import {useDispatch, useSelector} from 'react-redux';
import {Dispatcher, RootState} from '../../../store/store';
import {updateDayFilter} from '../../../store/slices/overviewSlice';
import {getLastDayOfMonth} from '../../../utils/dateUtils';

type Props = {
  data: Entry[];
  onFilterChanged(data: Entry[]): void;
};

const DayFilter = (props: Props) => {

  const date = useSelector((state: RootState) => state.overview.filter.day);
  const dispatch = useDispatch<Dispatcher>();

  const [month, setMonth] = useState(new Date(date).getMonth());
  const [day, setDay] = useState(new Date(date).getDate());
  const [year, setYear] = useState(new Date(date).getFullYear());

  const timeoutRef = useRef<undefined | ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    updateFilter();
    clearTimeout(timeoutRef.current);
    delayedUpdate(day, month, year);
  }, [day, month, year]);

  useEffect(() => {
    updateFilter();
  }, [props.data]);

  const updateFilter = () => {
    if (day <= 0 || day >= 32) {
      props.onFilterChanged([]);
    } else {
      const data = [...props.data].filter(el => {
        const date = new Date(el.date);
        return date.getMonth() === month && date.getDate() === day && date.getFullYear() === year;
      });

      props.onFilterChanged(data);
    }
  };

  /***
   * Saves current day/month/year after user stopped changing values
   */
  const delayedUpdate = (newDay: number, newMonth: number, newYear: number) => {
    timeoutRef.current = setTimeout(() => {
      dispatch(
        updateDayFilter(new Date(newYear, newMonth, newDay).getTime()),
      );
    }, 1500);
  };

  const onBack = () => {
    if (day - 1 === 0 && month === 0) {
      // set to last day of december
      updateDayMonthYear(getLastDayOfMonth(year - 1, 11), 11, year - 1);
    } else if (day - 1 === 0) {
      updateDayMonthYear(getLastDayOfMonth(year, month - 1), month - 1);
    } else {
      setDay(day - 1);
    }
  };

  const onForward = () => {
    const lastDay = getLastDayOfMonth(year, month);
    if (day === lastDay && month === 11) {
      // set to first day of january
      updateDayMonthYear(1, 0, year + 1);
    } else if (day === lastDay) {
      updateDayMonthYear(1, month + 1);
    } else {
      setDay(day + 1);
    }
  };

  const updateDayMonthYear = (day: number, month?: number, year?: number) => {
    setDay(day);

    // check against undefined -> not check against falsy 0
    if (month !== undefined) setMonth(month);
    if (year !== undefined) setYear(year);
  };

  return (
    <TimeFilter year={year} onBack={onBack} onForward={onForward}>
      <TextInput
        style={[styles.text, styles.textInput]}
        value={day.toString()}
        onChangeText={e => setDay(Number(e))}
        keyboardType="numeric"
      />
      <Text style={styles.text}>/</Text>
      <Text style={styles.text}>{month + 1}</Text>
    </TimeFilter>
  );
};

export default DayFilter;

const styles = StyleSheet.create({
  text: {fontSize: 22},
  textInput: {width: 28}
});
