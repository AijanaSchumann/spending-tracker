import { Pressable, StyleSheet, Text, View} from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useNavigation } from '@react-navigation/native';

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
    padding: 5,
    fontSize: 20,
    marginTop:5,
    marginBottom:5,
    marginLeft: 10
  },
});

type AvailableSettings = { title: string, selected: string, goal: string}

const SettingsList = () => {

  const settings = useSelector((state: RootState)=> state.settings);  

  const navigation = useNavigation();

  const settingsList : AvailableSettings[] = 
    [   {title: 'Categories', selected:'', goal: "Categories"},
        {title: 'Currency', selected: `(${settings.currency.name})`, goal: "Currency"},                 
    ];

  return (
    <View>
      {settingsList.map(el => (
        <Pressable 
          onPress={() => {
            navigation.navigate(el.goal  as never)
          }}>
            <View key={el.title} style={styles.settingsListItem}>
              <Text style={styles.settingsTitle}>{el.title}</Text>
              <Text style={{alignSelf:"center", marginRight:10}}>{el.selected}</Text>
          </View>
        </Pressable>
      ))}
    </View>
  );
};

export default SettingsList;
