import {StyleSheet, Text, View} from 'react-native';
import {Entry} from '../../../models/entry';
import MonthOrDayFilter from './MonthOrDayFilter';
import {useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import { FilterConfig, FilterTypes, SupportedFilters } from '../../../models/filterTypes';
import { faRepeat } from '@fortawesome/free-solid-svg-icons';
import AscendingDescendingFilter from './AscendingDescendingFilter';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatcher, RootState } from '../../../store/store';
import { filterEntries } from '../../../store/slices/overviewSlice';

type Props = {
  activeFilter: SupportedFilters;
  onActiveFilterChange: (data:FilterTypes)=> void
};

type FilterConfigDictionary = Record<SupportedFilters, FilterConfig>;

const styles = StyleSheet.create({
    text: {fontSize: 20, padding: 5}
});

const FilterSelector = (props: Props) => {

  const entries = useSelector((state : RootState)=> state.spending.entries)
  const dispatch = useDispatch<Dispatcher>();

  useEffect(() => {
    const activeFilter = AllFilters[props.activeFilter];
    console.log("filter prop: "+props.activeFilter);
    console.log(activeFilter);

    if (activeFilter.filteredData) {
      const data = activeFilter.filteredData();
      
      onFilterChanged(data);
    }
  }, [props.activeFilter]);

  useEffect(() => {
    const activeFilter = AllFilters[props.activeFilter];
    if (activeFilter.filteredData) {
      const data = activeFilter.filteredData();
      onFilterChanged(data);
    }
},[entries]);

const onFilterChanged = (data: (Entry)[]) => {

  dispatch(filterEntries(data));
}

  const incomeFilter = () => {
    const data = entries.filter((el) => el.type === "income");
    return data;
  };

  const ReaccuringFilter = () => {
    return (
        <View style={{alignItems: "center"}}>
      <View style={{flexDirection:"row", paddingLeft:5}}>
        <FontAwesomeIcon style={{alignSelf:"center"}} size={20} icon={faRepeat} />
        <Text style={styles.text}>Showing all repeating</Text>
      </View>
      </View>
    );
  };

  const reacurringFilter = () => {
    return entries.filter(
      (el: Entry) => el.interval && el.interval?.length > 0,
    );
  };

 

  const IncomeFilter = () => {
    return (
      <View style={{flexDirection:"row"}}>
        <Text style={styles.text}>Showing all...</Text>
        <Text style={[styles.text, {color: "green"}]}>Income</Text>
      </View>
    );
  };

  const AllFilters: FilterConfigDictionary = {
    [SupportedFilters.month]: {
      content: <MonthOrDayFilter data={entries} onFilterChanged={onFilterChanged} {...props} />,
    },
    [SupportedFilters.day]: {
      content: <MonthOrDayFilter data={entries} onFilterChanged={onFilterChanged} {...props} isDay />,
    },
    [SupportedFilters.income]: {
      content: <IncomeFilter />,
      filteredData: incomeFilter,
    },
    [SupportedFilters.reacurring]: {
      content: <ReaccuringFilter />,
      filteredData: reacurringFilter,
    },
    [SupportedFilters.ascDescValue]: {
      content: <AscendingDescendingFilter data={entries} onFilterChanged={onFilterChanged} {...props} type="value" />,
    },
    [SupportedFilters.ascDescDate]: {
      content: <AscendingDescendingFilter data={entries} onFilterChanged={onFilterChanged} {...props} type="date" />,
    },
  };

  const activeFilter = AllFilters[props.activeFilter];

  return <View>{activeFilter.content}</View>;
};

export default FilterSelector;
