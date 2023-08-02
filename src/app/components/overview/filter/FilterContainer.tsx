import {
  faFilter,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {FC, useState} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import {Entry} from '../../../models/entry';
import FilterSelector from './FilterSelector';
import {FilterTypes, getSupportedFilter} from '../../../models/filterTypes';

type Props = {
  data: (Entry)[];
  onFilterChanged(data: (Entry)[]): void;
};

const styles = StyleSheet.create({
  text: {fontSize: 20, padding: 5},
  filterListContainer: {
    backgroundColor: "white", margin: 5
  },
  filterItem:{
    borderBottomColor: "black", borderBottomWidth: 0.3, padding: 7
  },
  filterText:{
    fontSize: 23, textAlign:"center"
  }
});

const Filter: FC<Props> = (props: Props) => {
  const [isFilterListVisible, showFilterList] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<FilterTypes>('month');

  const actionItems : {id: number, label: string, value: FilterTypes }[] = [
    {
      id: 1,
      label: 'Month',
      value: "month"
    },
    {
      id: 2,
      label: 'Day',
      value: "day"
    },
    {
      id: 3,
      label: 'Income',
      value: "income"
    },
    {
      id: 4,
      label: 'Repeating',
      value: "reacurring"
    },
    {
      id: 5,
      label: 'Sort by $',
      value: "ascDescValue"
    },
    {
      id: 6,
      label: 'Sort by date',
      value: "ascDescDate"
    },
  ];

  return (
    <View style={{backgroundColor: 'lightgray', display: 'flex'}}>
      <View style={{flexDirection: 'row', width: '100%'}}>
        <View style={{flex: 1}}>
          <FilterSelector
            activeFilter={getSupportedFilter(selectedFilter)}
            onActiveFilterChange={e => setSelectedFilter(e)}
            {...props}
          />
        </View>
        <View style={{alignSelf: 'center', marginRight: 5}}>
          <Pressable onPress={e => showFilterList(true)}>
            <FontAwesomeIcon size={23} icon={faFilter} />
          </Pressable>
        </View>
      </View>
      <Modal
        style={{position:"absolute", right: 0, top: 90}}
        hasBackdrop
        animationIn={"fadeIn"}
        animationOut={"fadeOut"}
        onBackdropPress={() => showFilterList(false)}
        
        isVisible={isFilterListVisible}>
          <View style={styles.filterListContainer}>
            {
              actionItems.map((el, i)=>{

                return <Pressable style={styles.filterItem} key={el.id} onPress={e => {
                  setSelectedFilter(getSupportedFilter(el.value));
                  showFilterList(false);
                }}>
                  <Text style={styles.filterText}>{el.label}</Text>
                </Pressable>
              })
            }
            </View>
        </Modal>
    </View>
  );
};

export default Filter;
