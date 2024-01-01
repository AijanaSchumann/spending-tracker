import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {FC, useEffect, useRef, useState} from 'react';
import {
  Button,
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
import {faImage, faSave, faTrashCan, faXmark} from '@fortawesome/free-solid-svg-icons';
import {useDispatch, useSelector} from 'react-redux';
import {Dispatcher, RootState} from '../../store/store';
import {Category} from '../../models/category';
import { deleteCategory, saveCategory, updateCategory } from '../../store/actions/SettingsActions';
import { Slider } from '@miblanchard/react-native-slider';
import SettingsScreen from '../settings/SettingsScreen';


const AddCategoryModal : FC = ({navigation}: any) => {

  const dispatch = useDispatch<Dispatcher>();
  const editElement = useSelector((state: RootState) => state.settings.categories.selectedCategory);
  const categories = useSelector((state: RootState) => state.settings.categories);

  const [value, setValue] = useState(editElement?.title || '');
  const [selectedIcon, setSelectedIcon] = useState(editElement?.icon || '');
  const [selectedColor, setSelectedColor] = useState(editElement?.color || null);
  const [selectedBackgroundColor, setSelectedBackgroundColor] = useState(editElement?.background || null);
  const [borderRadius, setBorderRadius] = useState(10);
  const [type, setType] = useState<'expense' | 'income'>(editElement?.type || 'expense');
  const [error, setError] = useState(false);
  const [infoMessage, setInfoMessage] = useState('');
  const [activePicker, setActivePicker] = useState<"icons" | "colors">("icons");

  const timeout = useRef<undefined | ReturnType<typeof setTimeout>>(undefined);

  

  //TODO: save radius to db!

  useEffect(() => {

    return () => {
      clearTimeout(timeout.current);
    };
  }, []);

  useEffect(()=>{
    if(editElement)
      navigation.setOptions({ title: 'Update Category' });
  }, [editElement]);


  const isInEditMode = editElement !== null;

  const iconPicker = (
    <IconPicker
      selectedIcon={selectedIcon}
      isVisible
      onSelectionChanged={icon => {
        icon && setSelectedIcon(icon);
      }}
    />
  );

  const colorPicker = (
    <CustomColorPicker
        iconColor={selectedColor}
        backgroundColor={selectedBackgroundColor}
        onColorChangeComplete={setSelectedColor}
        onBackgroundColorChangeComplete={setSelectedBackgroundColor}
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
      navigation.goBack();
    }
  };

  const onUpdate = () => {
    if (value.length === 0) {
      setError(true);
    } else {
      setError(false);

      const updateType = editElement?.type !== type;

      const newCategory: Category = {
        id: editElement?.id!,
        title: value,
        type: type,
        icon: selectedIcon,
        color: selectedColor,
        background: selectedBackgroundColor,
      };
      dispatch(updateCategory({data: newCategory, switchType: updateType}));
      navigation.goBack();
    }
  };

  const onDelete = () => {
    dispatch(deleteCategory(editElement!));
    navigation.goBack();
  };

  const checkForDuplicateCategories = (newValue: string) => {
    setInfoMessage('');
    clearTimeout(timeout.current);
    const allCategories = [...categories.expense, ...categories.income];

    timeout.current = setTimeout(() => {
      if (!!allCategories.find(el => el.title == newValue)) {
        setInfoMessage('Category with the same name exists.');
      }
    }, 1000);
  };

  const iconbgRadius = isNaN(Number(borderRadius)) ? 25 : Number(borderRadius);

  return (
    <SettingsScreen>
      <View style={{padding: 10, display: 'flex'}}>
        <View style={{alignItems: 'center'}}>
          <TextInput
            value={value}
            onChangeText={ev => {
              setValue(ev);
              setError(false);
              checkForDuplicateCategories(ev);
            }}
            style={styles.title}
            placeholder="Name"
          />
          {error && <Text style={{color: 'red'}}>Cannot be empty</Text>}
          {infoMessage.length > 0 && (
            <Text style={{color: 'green'}}>{infoMessage}</Text>
          )}

          <Pressable onPress={()=> setActivePicker("colors")}>
            <View
              style={[
                styles.categoryIcon,
                {
                  backgroundColor: `${selectedBackgroundColor}`,
                  borderRadius: iconbgRadius,
                }
              ]}>
                 <Pressable onPress={()=> setActivePicker("icons")}>
              <FontAwesomeIcon
                color={selectedColor || 'black'}
                size={40}
                icon={
                  selectedIcon.length === 0
                    ? faImage
                    : ['fas', selectedIcon as any]
                }
              />
              </Pressable>
            </View>
          </Pressable>

          <View style={{marginTop: 10, marginBottom: 10}}>
            <ExpenseIncomeSwitch value={type} onValueChange={setType} />
          </View>

          <View style={styles.pickerContainer}>
            <View style={{display: "flex", flexDirection: "row"}}>
              <Button title="Icons" onPress={() => setActivePicker("icons")} />
              <Button title="Color" onPress={() => setActivePicker("colors")} />
            </View>

            {activePicker==="icons" ? iconPicker : 
            <>
            {colorPicker}
            {selectedBackgroundColor !== null && (
                <View style={styles.sliderContainer}>
                  <Text style={{textAlign: 'left', fontSize: 17}}>Background Radius</Text>
                  <Slider
                    value={borderRadius}
                    minimumValue={0}
                    maximumValue={44}
                    onValueChange={e => {
                        setBorderRadius(e[0]);
                    }}
                  />
                </View>
                )}
            </>
            }   
          </View>
        </View>
      </View>
      
      {isInEditMode ? (
        <View
          style={{display: 'flex', flexDirection: 'row', alignSelf: 'center'}}>
          <TextButton
            icon={faTrashCan}
            title="Delete"
            color="#DA4343"
            onAction={onDelete}
          />
          <TextButton
            icon={faSave}
            title="Save"
            color="#189EEC"
            onAction={onUpdate}
          />
        </View>
      ) : (
        <TextButton
          icon={faSave}
          title="Save"
          color="#189EEC"
          onAction={onSave}
        />
      )}
    </SettingsScreen>
  );
};

export default AddCategoryModal;

const styles = StyleSheet.create({
    container: {padding: 30, backgroundColor: 'white', marginTop: 30},
    headerRow: {display: 'flex', flexDirection: 'row', alignItems: 'flex-start'},
    header: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: 'bold',
    marginBottom: 30,
    flexGrow: 1
  },
    label: {marginTop: 15, fontSize: 15},
    title: {
      fontSize: 20,
      marginTop: 20,
      marginBottom: 5,
      borderBottomColor: 'black',
      borderBottomWidth: 1,
      width: '60%',
      textAlign: 'center',
    },
    textButton: {color: '#007AFF', fontSize: 20, marginLeft: 20},
    iconContainer: {
      display: 'flex',
      flexDirection: 'row',
      marginTop: 10,
      alignItems: 'center',
    },
    categoryIcon: { width: 80, padding: 20, marginTop:10, marginBottom: 10},
    iconColorOptions: {flexDirection: 'column', alignItems: 'flex-start'},
    buttonRow: {display: 'flex', flexDirection: 'row'},
    pickerContainer: {
      alignItems: 'center', 
      height: '63%'
    },
    sliderContainer: {
      marginTop: 10,
      padding: 10,
      width: 250,
      marginLeft: 10,
      marginRight: 10,
      alignItems: 'stretch',
      justifyContent: 'center',}
  });