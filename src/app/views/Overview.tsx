import React, {FC} from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Entry} from '../models/entry';
import {RootState} from '../store/store';
import Filter from '../components/overview/filter/FilterContainer';
import FAB from '../components/general/FAB';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import DataEntryModal from '../components/forms/DataEntryModal';

const styles = StyleSheet.create({
  mainContainer: {
    padding: 5,
    borderBottomWidth: 1,
  },
  stackContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  text: {
    fontSize: 16,
  },
  valueText: {
    fontWeight: 'bold',
    fontSize: 19,
    alignSelf: 'center',
  },
  income: {
    color: 'green',
  },
  spending: {
    color: 'red',
  },
});

const Overview: FC = ({navigation}: any) => {
  const entries = useSelector((state: RootState) => state.spending.entries);
  const income = useSelector((state: RootState) => state.income.income);
  const currency = useSelector((state: RootState)=> state.settings.currency).symbol;

  const data = [...entries, ...income];

  const [filteredData, setFilteredData] = React.useState<(Entry)[]>([]);
  const [isDataEntryVisible, showDataEntry] = React.useState(false);

  const Spending = ({data}: {data: Entry}) => (
    <View style={styles.mainContainer}>
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <Text style={[styles.text, {alignSelf: 'center', marginHorizontal: 5}]}>
          {data.categoryId}
        </Text>
        <View style={{flex: 1, flexDirection: 'column'}}>
          <Text style={styles.text}>{new Date(data.date).toDateString()}</Text>
          <Text style={styles.text}>{data.categoryId}</Text>
          {data.note !== null && data.note !== 'null' && (
            <Text style={styles.text}>{data.note.substring(0, 10)}</Text>
          )}
        </View>
        <Text style={[styles.valueText, styles.spending]}>
          - {data.value} {currency}
        </Text>
      </View>
    </View>
  );

  const Income = ({data}: {data: Entry}) => (
    <View style={styles.mainContainer}>
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <View style={{flex: 1, flexDirection: 'column'}}>
          <Text style={styles.text}>Income</Text>
          <Text style={styles.text}>{new Date(data.date).toDateString()}</Text>
        </View>
        <Text style={[styles.valueText, styles.income]}>+ {data.value} {currency}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView>
      <View style={{backgroundColor: 'lightgrey'}}>
        <Filter data={data} onFilterChanged={e => setFilteredData(e)} />
      </View>
      <View style={{height: '93%'}}>
        {filteredData.length > 0 ? (
          <FlatList
            data={filteredData}
            renderItem={({item}) => {
              {
                return item.type==="expense" ? (
                  <Spending key={'spending' + item.id} data={item} />
                ) : (
                  <Income key={'income' + item.id} data={item} />
                );
              }
            }}
          />
        ) : (
          <Text style={{textAlign: 'center', textAlignVertical: 'center'}}>
            No data logged.
          </Text>
        )}
      </View>

      <FAB icon={faPlus} color="#189EEC" onPress={() => showDataEntry(true)} />
      <DataEntryModal isVisible={isDataEntryVisible} onClose={() => showDataEntry(false)} />
    </SafeAreaView>
  );
};

export default Overview;
