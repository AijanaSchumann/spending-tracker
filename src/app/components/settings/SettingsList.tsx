import {useState} from 'react';
import { Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import CurrencyList from './CurrencyList';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faXmark} from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import CategoryList from './CategoryList';

const styles = StyleSheet.create({
  modalBackground: {
    backgroundColor: 'white',
    marginTop: 30,
    padding: 20,
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    flexGrow: 1,
    fontSize: 18,
  },
  settingsListItem:{
    borderBottomWidth:1,
    borderBottomColor: '#abb0ab',
    display:"flex",
    flexDirection: "row",
    alignItems:"center",
    justifyContent:"space-between"
  },
  settingsTitle: {
    fontSize: 20,
    marginTop:5,
    marginBottom:5
  },
});

type AvailableSettings = { title: string, element: JSX.Element, selected: string}

const SettingsList = () => {

  const settings = useSelector((state: RootState)=> state.settings);  

  const [isModalVisible, setshowModal] = useState(false);
  const [setting, setSetting] = useState<JSX.Element | null>(null);
  const [modalTitle, setTitle] = useState('');

  const settingsList : AvailableSettings[] = 
    [   {title: 'Categories', element: <CategoryList />, selected:''},
        {title: 'Currency', element: <CurrencyList />, selected: `(${settings.currency.name})`},                 
    ];

  return (
    <View>
      {settingsList.map(el => (
        <Pressable 
          onPress={() => {
            setshowModal(true);
            setSetting(el.element);
            setTitle(el.title);
          }}>
            <View style={styles.settingsListItem}>
              <Text style={styles.settingsTitle}>{el.title}</Text>
              <Text style={{alignSelf:"center"}}>{el.selected}</Text>
          </View>
        </Pressable>
      ))}

      <Modal
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={e => setshowModal(false)}
        presentationStyle="fullScreen">
        <View style={styles.modalBackground}>
          <View style={styles.titleContainer}>
            <View>
              <Pressable onPress={() => setshowModal(false)}>
                <FontAwesomeIcon size={23} icon={faXmark} />
              </Pressable>
            </View>
            <Text style={styles.title}>{modalTitle}</Text>
          </View>
          {setting}
        </View>
      </Modal>
    </View>
  );
};

export default SettingsList;
