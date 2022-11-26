import React, { FC } from "react";
import { FlatList, Text, View } from "react-native";
import { Screen } from "react-native-screens";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";


const Overview: FC = () => {

    const entries = useSelector((state: RootState) => state.entries.entries);


    const Item = ({title }: {title: string}) => (
         <View>
          <Text>{title}</Text>
        </View>
      );

    return (
        <Screen>
            <FlatList data={entries} renderItem={({item}) =>(
             <Item title={`${item.value} ${item.categoryId}`}
          />
        )} />
        </Screen>)
}

export default Overview;