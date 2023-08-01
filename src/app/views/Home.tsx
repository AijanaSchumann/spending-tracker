import React, { FC } from 'react';
import { Button, Text, TouchableHighlight } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { selectMonthlySpend, selectMontlyIncome } from '../store/selectors';
import { RootState } from '../store/store';
import ExpenseRatio from '../components/home/ExpenseRatio';
import DataEntryModal from '../components/forms/DataEntryModal';



const Home: FC = ({ navigation } : any) =>{

  const monthlySpend = useSelector(selectMonthlySpend);
  const monthlyIncome = useSelector(selectMontlyIncome);

  const [isDataEntryVisible, showDataEntry] = React.useState(false);
  
    return (
    <SafeAreaView> 
      <ExpenseRatio expenses={monthlySpend} income={monthlyIncome} />
      <Button title="Add Entry" onPress={()=>{ showDataEntry(true); }} />
      {
        isDataEntryVisible &&
        <DataEntryModal onClose={() => showDataEntry(false)} />
      }
    </SafeAreaView>)
}

export default Home;