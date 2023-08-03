import {useState} from 'react';
import { Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import CurrencyList from './CurrencyList';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faXmark} from '@fortawesome/free-solid-svg-icons';

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
    //borderBottomWidth:1,
    borderBottomColor: 'black'
  },
  settingsTitle: {
    fontSize: 20,
    marginTop:5,
    marginBottom:5
  }
});

const SettingsList = () => {
  const [isModalVisible, setshowModal] = useState(false);
  const [setting, setSetting] = useState<JSX.Element | null>(null);
  const [modalTitle, setTitle] = useState('');

  const settingsList = [{title: 'Currency', element: <CurrencyList />}];

  return (
    <View>
      {settingsList.map(el => (
        
        <Pressable style={styles.settingsListItem}
          onPress={() => {
            setshowModal(true);
            setSetting(el.element);
            setTitle(el.title);
          }}>
          <Text style={styles.settingsTitle}>{el.title}</Text>
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
