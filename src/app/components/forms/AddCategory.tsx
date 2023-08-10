import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useState} from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import IconPicker from '../general/picker/IconPicker';
import CustomColorPicker from '../general/picker/ColorPicker';
import ExpenseIncomeSwitch from '../general/ExpenseIncomeSwitch';
import TextButton from '../general/buttons/TextButton';
import {faImage, faXmark} from '@fortawesome/free-solid-svg-icons';
import {useDispatch} from 'react-redux';
import {Dispatcher} from '../../store/store';
import {Category} from '../../models/category';

type Props = { isVisible: boolean; onClose(): void};

const AddCategoryModal = (props: Props) => {
    
  const dispatch = useDispatch<Dispatcher>();

  const [value, setValue] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('');
  const [selectedColor, setSelectedColor] = useState('black');
  const [selectedBackgroundColor, setSelectedBackgroundColor] = useState('white');
  const [type, setType] = useState<'expense' | 'income'>('expense');
  const [error, setError] = useState(false);
  const [modal, showModal] = useState<JSX.Element | null>(null);

  const colorModal = (
    <CustomColorPicker
      isVisible
      color={selectedColor}
      onColorChangeComplete={setSelectedColor}
      onClose={() => showModal(null)}
    />
  );

  const backgroundColorModal = (
    <CustomColorPicker
      isVisible
      color={selectedBackgroundColor}
      onColorChangeComplete={setSelectedBackgroundColor}
      onClose={() => showModal(null)}
    />
  );

  const iconModal = (
    <IconPicker
      isVisible
      onClose={icon => {
        showModal(null);
        icon && setSelectedIcon(icon);
      }}
    />
  );

  const onSave = () => {
    if (value.length === 0) {
      setError(true);
    } else {
      setError(false);
      const newCategory: Category = {
        title: value,
        type: type,
        icon: selectedIcon,
        color: selectedColor,
        background: selectedBackgroundColor,
      };
     //TODO: add action to save
    }
  };

  return (
    <Modal
      animationType="slide"
      onRequestClose={e => props.onClose()}
      presentationStyle="pageSheet"
      visible={props.isVisible}>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <Pressable onPress={props.onClose}>
            <FontAwesomeIcon
              style={{alignSelf: 'flex-start'}}
              size={20}
              icon={faXmark}
            />
          </Pressable>
          <Text style={styles.header}>New Category</Text>
        </View>

        <View style={{height: '85%'}}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            value={value}
            onChangeText={ev => {
              setValue(ev);
              setError(false);
            }}
            style={{fontSize: 20}}
            placeholder="streaming"
          />
          {error && <Text style={{color: 'red'}}>Cannot be empty</Text>}

          <Text style={styles.label}>Appearance</Text>

            <View style={styles.iconContainer}>
              <Pressable onPress={e => showModal(iconModal)}>
                <View style={[styles.iconBackground,{backgroundColor: `${selectedBackgroundColor}`}]}>
                  <FontAwesomeIcon
                    color={selectedColor}
                    size={30}
                    icon={ selectedIcon.length=== 0 ? faImage : ['fas', selectedIcon as any]}
                  />
                </View>
              </Pressable>
              <View style={styles.iconColorOptions}>
                <Pressable onPress={() => showModal(colorModal)}>
                  <Text style={styles.textButton}>Choose Icon color</Text>
                </Pressable>
                <Pressable onPress={() => showModal(backgroundColorModal)}>
                  <Text style={styles.textButton}>Choose Background color</Text>
                </Pressable>
              </View>
            </View>
          
          <Text style={styles.label}>Type</Text>
          <ExpenseIncomeSwitch value={type} onValueChange={setType} />
        </View>
        <View style={styles.buttonRow}>
          <TextButton
            color="white"
            borderColor="red"
            title="Cancel"
            onAction={props.onClose}
          />
          <TextButton
            color="white"
            borderColor="black"
            onAction={onSave}
            title="Save"
          />
        </View>
        {modal && modal}
      </View>
    </Modal>
  );
};

export default AddCategoryModal;

const styles = StyleSheet.create({
    container: {padding: 30, backgroundColor: 'white'},
    headerRow: {display: 'flex', flexDirection: 'row', alignItems: 'flex-start'},
    header: {
      fontSize: 20,
      textAlign: 'center',
      fontWeight: 'bold',
      marginBottom: 10,
      flexGrow: 1,
    },
    label: {marginTop: 15, fontSize: 15},
    textButton: {color: '#007AFF', fontSize: 20, marginLeft: 20},
    iconContainer: {
      display: 'flex',
      flexDirection: 'row',
      marginTop: 10,
      alignItems: 'center',
    },
    iconBackground: {borderRadius: 30, width: 50, padding: 10},
    iconColorOptions: {flexDirection: 'column', alignItems: 'flex-start'},
    buttonRow: {display: 'flex', flexDirection: 'row'},
  });