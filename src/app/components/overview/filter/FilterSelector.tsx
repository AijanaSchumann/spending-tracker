import {Pressable, StyleSheet, Text, View} from 'react-native';
import {Entry} from '../../../models/entry';
import {Income} from '../../../models/income';
import MonthOrDayFilter from './MonthOrDayFilter';
import {useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import { FilterConfig, FilterTypes, SupportedFilters } from '../../../models/filterTypes';
import { faRepeat, faSortAsc, faSortDesc } from '@fortawesome/free-solid-svg-icons';
import AscendingDescendingFilter from './AscendingDescendingFilter';

type Props = {
  data: (Entry | Income)[];
  onFilterChanged(data: (Entry | Income)[]): void;
  activeFilter: SupportedFilters;
  onActiveFilterChange: (data:FilterTypes)=> void
};

type FilterConfigDictionary = Record<SupportedFilters, FilterConfig>;

const styles = StyleSheet.create({
    text: {fontSize: 20, padding: 5}
});

const FilterSelector = (props: Props) => {

  useEffect(() => {
    const activeFilter = AllFilters[props.activeFilter];
    console.log("filter prop: "+props.activeFilter);
    console.log(activeFilter);

    if (activeFilter.filteredData) {
      const data = activeFilter.filteredData();
      props.onFilterChanged(data);
    }
  }, [props.activeFilter]);

 /* useEffect(() => {
    const activeFilter = AllFilters[props.activeFilter];
    if (activeFilter.filteredData) {
      const data = activeFilter.filteredData();
      props.onFilterChanged(data);
    }
},[props.data]);*/

  const incomeFilter = () => {
    const data = props.data.filter((el: any) => !el.categoryId);
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
    return props.data.filter(
      (el: Entry | Income) => el.interval && el.interval?.length > 0,
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
      content: <MonthOrDayFilter {...props} />,
    },
    [SupportedFilters.day]: {
      content: <MonthOrDayFilter {...props} isDay />,
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
      content: <AscendingDescendingFilter {...props} type="value" />,
    },
    [SupportedFilters.ascDescDate]: {
      content: <AscendingDescendingFilter {...props} type="date" />,
    },
  };

  const activeFilter = AllFilters[props.activeFilter];

  return <View>{activeFilter.content}</View>;
};

export default FilterSelector;
