import React, { FC } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { selectMonthlySpend, selectMontlyIncome } from '../store/selectors';
import ExpenseRatio from '../components/home/ExpenseRatio';
import DataEntryModal from '../components/forms/DataEntryModal';
import FAB from '../components/general/FAB';
import { faPlus } from '@fortawesome/free-solid-svg-icons';



const Home: FC = () =>{

  const monthlySpend = useSelector(selectMonthlySpend);
  const monthlyIncome = useSelector(selectMontlyIncome);

  const [isModalVisible, showModal] = React.useState(false);
  
    return (
    <SafeAreaView style={{height:"100%"}}> 
      <ExpenseRatio expenses={monthlySpend} income={monthlyIncome} />
      <FAB icon={faPlus} color="#189EEC" onPress={()=>{ showModal(true); }}/>
      <DataEntryModal editElement={null} isVisible={isModalVisible} onClose={() => showModal(false)} />
    </SafeAreaView>)
}

export default Home;