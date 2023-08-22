import { Picker } from "@react-native-picker/picker"
import { StyleSheet, Switch, Text, TextInput, View } from "react-native"
import CustomPicker from "../general/picker/CustomPicker"
import CustomDatePicker from "../general/picker/CustomDatePicker"
import MoneyTextInput from "../general/MoneyTextInput"
import { useState } from "react"
import { Entry } from "../../models/entry"
import { Category } from "../../models/category"
import FAB from "../general/FAB"
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { intervalList } from "../../constants/intervalList"
import TextButton from "../general/buttons/TextButton"

const styles = StyleSheet.create({
    container: {padding: 10},
    dataInput: {fontSize: 20},
    label: {marginTop: 20, fontSize: 15},
    error:{
      color: "red",
      fontSize: 12, 
      alignSelf:"flex-start"
  }
  });

type Props = {
    categories: Category[],
    onSave(data: Entry): Promise<void>
    onUpdate(data: Entry): void
    onDelete(): void,
    data: Entry | null
}
const DataEntryForm = (props: Props) =>{

    const [input, setInput] = useState(props.data?.value.toString() || '');
    const [categoryId, setCategory] = useState<number | undefined>(
        props.data?.categoryId || undefined,
    );
    const [note, setNote] = useState(props.data?.note || '');
    const [isRecurring, setRecurring] = useState(
        props.data?.interval ? true : false,
    );
    const [date, setDate] = useState(props.data?.date ? new Date(props.data?.date) : new Date());
    const [interval, setInterval] = useState(props.data?.interval || 'monthly');
    const [error, showError] = useState(false);

    const isInEditMode = props.data !== null;

    const reset = () => {
        
        setInput('');
        setNote('');
        setDate(new Date());
        setRecurring(false);
        setCategory(undefined);
        setInterval('monthly');
         
       };

    const onSave = async () =>{

        if (input.length === 0 || !categoryId) {
            showError(true);
          } else {
            showError(false);
            const newEntry: Entry = {
              note: note,
              value: Number(input),
              date: date.getTime(),
              categoryId: categoryId,
              interval: isRecurring ? interval : null,
              type: "income"
            };

            await props.onSave(newEntry);
            reset();
    }
}

    const onUpdate = () =>{

        if (input.length === 0 || !categoryId) {
            showError(true);
          } else {
            showError(false);
            const updatedEntry: Entry = {
              id: props.data?.id,
              note: note,
              value: Number(input),
              date: date.getTime(),
              categoryId: categoryId,
              interval: isRecurring ? interval : null,
              type: "income"
            };

        props.onUpdate(updatedEntry);
    }
}


    return (
        <View>
          <View style={{height: '83%'}}>
           
          <MoneyTextInput value={input} onChangeText={setInput} error={error} />
          <Text style={[styles.label, {marginTop: 30}]}>Category</Text>
          <CustomPicker
            value={
              props.categories.find(category => categoryId === category.id)?.title || ''
            }
            selectedValue={categoryId}
            onValueChange={(ev: any) => setCategory(ev)}>
            <Picker.Item label="" value={undefined} />
            {props.categories.map(category => {
              return <Picker.Item key={category.id} label={category.title} value={category.id} />;
            })}
          </CustomPicker>
          {error && !categoryId && <Text style={styles.error}>Please select a category</Text>}
          
          <Text style={styles.label}>Date</Text>
          <CustomDatePicker date={date} onDateChanged={setDate} />
    
          <Text style={styles.label}>Repeating?</Text>
          <Switch value={isRecurring} onValueChange={setRecurring} />
          {isRecurring && (
            <CustomPicker
              value={interval}
              selectedValue={interval}
              onValueChange={(e) => {
                setInterval(e.toString());
              }}>
              {intervalList.map(el => (
              <Picker.Item label={el.value} value={el.value} key={el.value} />
            ))}
            </CustomPicker>
          )}
    
          <TextInput
            style={[styles.dataInput, {marginTop: 15}]}
            placeholder="Add a note"
            multiline
            value={note}
            onChangeText={setNote}
          />
          </View> 
    
          {isInEditMode ? (
            <View style={{flexDirection:"row", display: "flex"}}>
              <TextButton fullWidth icon={faTrashCan} title="Delete" color="#DA4343" onAction={props.onDelete} />
              <TextButton fullWidth icon={faSave} title="Save" color="#189EEC" onAction={onUpdate} />
            </View>
          ) : (
            <TextButton icon={faSave} title="Save" color="#189EEC" onAction={onSave} />
          )}
        </View>
      );
}

export default DataEntryForm;