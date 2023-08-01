import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {PieChart} from 'react-native-gifted-charts';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
  },
  text: {fontSize: 21,
    textShadowRadius: 10,
    textShadowOffset: {width: 5, height: 10},
  }
});

type Props = {
  income: number;
  expenses: number;
};

const ExpenseRatio: FC<Props> = (props: Props) => {
  const incomeColor = '#07964F';
  const expenseColor = '#EF0808';

  const expensePercent = (props.expenses / props.income) * 100 || 0;

  const setPieData = (percent: number) =>{
    if(percent >=100){
        return [{value: 100, color: expenseColor}]

    }else{
        return [
            {value: 100 - percent, color: incomeColor},
            {value: percent, color: expenseColor}
          ]
    }
  }

  const pieData = setPieData(expensePercent);

  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <PieChart
          data={pieData}
          donut
          showGradient
          sectionAutoFocus
          radius={90}
          innerRadius={60}
        />
        <View style={{flexDirection: 'row'}}>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={[
                styles.text,
                {textShadowColor: incomeColor},
              ]}>{`Income: `}</Text>
            <Text style={styles.text}>{`${props.income} $`}</Text>
          </View>

          <Text style={{marginRight: 10, marginLeft: 10}}>{'|'}</Text>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={[
                styles.text,
                {textShadowColor: expenseColor},
              ]}>{`Expenses: `}</Text>
            <Text style={styles.text}>{`${props.expenses} $`}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ExpenseRatio;