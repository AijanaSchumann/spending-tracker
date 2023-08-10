import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import {useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {Category} from '../../models/category';
import AddCategoryModal from '../forms/AddCategory';
import FAB from '../general/FAB';
import {faImage, faPlus} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

const CategoryList = () => {
  const incomeCategories = useSelector(
    (state: RootState) => state.income.categories,
  );
  const expenseCategories = useSelector(
    (state: RootState) => state.spending.categories,
  );

  const [isModalVisible, setVisible] = useState(false);
  const [showIcons, setShowIcons] = useState(false); // TODO: save to db / store

  const CategorySection = ({title,data}: { title: string, data: Category[] }) => {
    return (
      <>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{title}</Text>
        </View>
        {data.map(el => {
          return (
            <View style={styles.itemRow} key={el.id}>
              {showIcons && (
                <View style={[styles.iconBackground,{backgroundColor: el.background || 'white'}]}>
                  {el.icon ? (
                    <FontAwesomeIcon color={el.color || 'black'} size={25} icon={['fas', el.icon as any]} />
                  ) : (
                    <FontAwesomeIcon size={25} icon={faImage} />
                  )}
                </View>
              )}
              <Text style={styles.itemTitle}>{el.title}</Text>
            </View>
          )})}
      </>
    )
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <CategorySection title="Expense" data={expenseCategories} />
        <CategorySection title="Income" data={incomeCategories} />
      </ScrollView>
      <Text style={{marginTop: 5}}>Show icons?</Text>
      <Switch value={showIcons} onValueChange={setShowIcons} />

      <FAB
        icon={faPlus}
        position={{bottom: -50, right: 0}}
        color="#189EEC"
        onPress={() => setVisible(!isModalVisible)}
      />
      <AddCategoryModal
        isVisible={isModalVisible}
        onClose={() => setVisible(!isModalVisible)}
      />
    </View>
  );
};

export default CategoryList;


const styles = StyleSheet.create({
    container: {padding: 5, marginTop: 10},
    scrollView: {height: '80%', marginBottom: 10},
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