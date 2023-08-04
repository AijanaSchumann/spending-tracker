import {faCheck, faSearch} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useEffect, useState} from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {Currency, currencyList} from '../../constants/currencyList';
import {useDispatch, useSelector} from 'react-redux';
import {Dispatcher, RootState} from '../../store/store';
import {saveSetting} from '../../store/slices/settingsSlice';

const styles = StyleSheet.create({
  label: {
    fontSize: 20,
  },
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
  searchInput: {fontSize: 23, padding: 3},
  currencyInfo: {
    display: 'flex',
    flexDirection: 'column',
    flexBasis: '80%',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    borderBottomColor: '#e1e3e1',
  },
});

const CurrencyList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currencies, setCurrencyList] = useState(currencyList);

  const selectedCurrency = useSelector(
    (state: RootState) => state.settings.currency,
  );
  const dispatcher = useDispatch<Dispatcher>();

  useEffect(() => {
    const searchResult = currencyList.filter(
      el => el.name.includes(searchTerm) || el.shorthand.includes(searchTerm),
    );
    setCurrencyList(searchResult);
  }, [searchTerm]);

  const SelectedCurrency = (props: Currency) => {
    return (
      <View style={[styles.container, {borderBottomWidth: 1}]}>
        <CurrencyItem data={props} />
        <FontAwesomeIcon
          style={{alignSelf: 'center', marginLeft: 20}}
          size={20}
          icon={faCheck}
        />
      </View>
    );
  };

  const CurrencyItem = (props: {data: Currency; showBorder?: boolean}) => {
    const data = props.data;

    const css = props.showBorder ? {borderBottomWidth: 1} : {};

    return (
      <View style={[styles.container, css, {marginTop: 5}]}>
        <View style={styles.currencyInfo}>
          <Text style={styles.label}>{data.name}</Text>
          <Text style={styles.label}>{data.shorthand}</Text>
        </View>
        <Text style={[styles.label, {alignSelf: 'center'}]}>{data.symbol}</Text>
      </View>
    );
  };

  return (
    <View style={{padding: 5, marginTop: 10}}>
      <View style={styles.searchContainer}>
        <FontAwesomeIcon size={20} icon={faSearch} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
      </View>
      <FlatList
        data={currencies}
        renderItem={({item}) => {
          {
            return item.name === selectedCurrency.name ? (
              <SelectedCurrency {...item} />
            ) : (
              <Pressable
                onPress={() =>
                  dispatcher(
                    saveSetting({settingsName: 'currency', value: item}),
                  )
                }>
                <CurrencyItem data={item} showBorder />
              </Pressable>
            );
          }
        }}
      />
    </View>
  );
};

export default CurrencyList;
