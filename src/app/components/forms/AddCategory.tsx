import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useEffect, useRef, useState} from 'react';
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
import {faImage, faSave, faXmark} from '@fortawesome/free-solid-svg-icons';
import {useDispatch, useSelector} from 'react-redux';
import {Dispatcher, RootState} from '../../store/store';
import {Category} from '../../models/category';
import { deleteCategory, saveCategory, updateCategory } from '../../store/actions/SettingsActions';

type Props = { 
  editElement: Category | null
  isVisible: boolean; 
  onClose(): void};

const AddCategoryModal = (props: Props) => {
    
  const dispatch = useDispatch<Dispatcher>();
  const categories = useSelector((state: RootState)=> state.settings.categories);

  const [value, setValue] = useState(props.editElement?.title || '');
  const [selectedIcon, setSelectedIcon] = useState(props.editElement?.icon || '');
  const [selectedColor, setSelectedColor] = useState(props.editElement?.color || 'black');
  const [selectedBackgroundColor, setSelectedBackgroundColor] = useState(props.editElement?.background || 'white');
  const [type, setType] = useState<'expense' | 'income'>(props.editElement?.type || 'expense');
  const [error, setError] = useState(false);
  const [infoMessage, setInfoMessage] = useState("");
  const [modal, showModal] = useState<JSX.Element | null>(null);

  useEffect(()=>{

    return () =>{
      clearTimeout(timeout.current);
    }

  },[]);

  const timeout = useRef<undefined | ReturnType<typeof setTimeout>>(undefined);

  const isInEditMode = props.editElement !== null;

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
    selectedIcon={selectedIcon}
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
      dispatch(saveCategory(newCategory));
      props.onClose();
    }
  };

  const onUpdate = () => {
    if (value.length === 0) {
      setError(true);
    } else {
      setError(false);

      const updateType = props.editElement?.type !== type;

      const newCategory: Category = {
        id: props.editElement?.id!,
        title: value,
        type: type,
        icon: selectedIcon,
        color: selectedColor,
        background: selectedBackgroundColor,
      };
      dispatch(updateCategory({data: newCategory, switchType: updateType}));
      props.onClose();
    }
  }

  const onDelete = () =>{

    dispatch(deleteCategory(props.editElement!));
    props.onClose();

  }

  const checkForDuplicateCategories = (newValue: string) =>{
    setInfoMessage("");
    clearTimeout(timeout.current);
    const allCategories = [...categories.expense, ...categories.income];

    timeout.current = setTimeout(()=>{
      if(!!allCategories.find(el => el.title == newValue)){
        setInfoMessage("Category with the same name exists.");
      }
   }, 1000);
  }

  const titleAction = isInEditMode ? "Update" : "New";

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
          <Text style={styles.header}>{titleAction} Category</Text>
        </View>

        <View style={{height: '85%'}}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            value={value}
            onChangeText={ev => {
              setValue(ev);
              setError(false);
              checkForDuplicateCategories(ev);
            }}
            style={{fontSize: 20}}
            placeholder="streaming"
          />
          {error && <Text style={{color: 'red'}}>Cannot be empty</Text>}
          {
            infoMessage.length>0 &&
            <Text style={{color: 'green'}}>{infoMessage}</Text>
          }

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
        {
          isInEditMode ?
          <View style={{display: "flex", flexDirection: "row"}}>
            <TextButton icon={faSave} title="Delete" color="#DA4343" onAction={onDelete} />
            <TextButton icon={faSave} title="Save" color="#189EEC" onAction={onUpdate} />
          </View>
          :
          <TextButton icon={faSave} title="Save" color="#189EEC" onAction={onSave} />
        }
       
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