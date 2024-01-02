import {
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Dispatcher, RootState} from '../../store/store';
import {Category} from '../../models/category';
import FAB from '../general/FAB';
import {faImage, faPlus} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import { saveShowCategoryIcons } from '../../store/actions/SettingsActions';
import SettingsScreen from './SettingsScreen';
import { selectCategory } from '../../store/slices/settingsSlice';
import { useNavigation } from '@react-navigation/native';
import { selectCategoriesGroupedByType } from '../../store/selectors';

const CategoryList = () => {
  
  const categories = useSelector(selectCategoriesGroupedByType);
  const showIcons = useSelector((state: RootState)=> state.settings.categories.showIcons);

  const navigation = useNavigation();
  const dispatcher = useDispatch<Dispatcher>();

  const onCreateCategory = () =>{
    dispatcher(selectCategory(null));
     //TODO: add typing
    navigation.navigate("NewCategory" as never);

  }

  const CategorySection = ({title,data}: { title: string, data: Category[] }) => {

    const onEditCategory = (category: Category) => {
      dispatcher(selectCategory(category));
      navigation.navigate("NewCategory" as never);
    }

    return (
      <>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{title}</Text>
        </View>
        {data.map(el => {
          return (
            <Pressable onPress={() => onEditCategory(el)}>
              <View style={styles.itemRow} key={el.id}>
                {showIcons && (
                  <View style={[styles.iconBackground,{backgroundColor: el.background || 'white'}]}>
                    {el.icon ? (
                      <FontAwesomeIcon
                        color={el.color || 'black'}
                        size={25}
                        icon={['fas', el.icon as any]}
                      />
                    ) : (
                      <FontAwesomeIcon size={25} icon={faImage} />
                    )}
                  </View>
                )}
                <Text style={styles.itemTitle}>{el.title}</Text>
              </View>
            </Pressable>
          )})}
      </>
    )
  };

  return (
    <SettingsScreen>
      <ScrollView style={styles.scrollView}>
        <CategorySection title="Expense" data={categories.expense} />
        <CategorySection title="Income" data={categories.income} />
      </ScrollView>
      <Text>Show icons?</Text>
      <Switch value={showIcons} onValueChange={(e) => {dispatcher(saveShowCategoryIcons(e))}} />

      <FAB
        icon={faPlus}
        color="#189EEC"
        onPress={()=> onCreateCategory()}
      />
    </SettingsScreen>
  );
};

export default CategoryList;

const styles = StyleSheet.create({
    scrollView: {height: '85%', marginBottom: 10},
    itemRow: {
      display: 'flex',
      flexDirection: 'row',
      marginTop: 5,
      alignItems: 'center',
    },
    itemTitle: {
      fontSize: 20,
      margin: 5,
    },
    section: {
      borderBottomColor: '#e1e3e1',
      borderBottomWidth: 1,
    },
    sectionTitle: {
      fontSize: 20,
    },
    iconBackground: {borderRadius: 30, width: 44, padding: 10},
  });