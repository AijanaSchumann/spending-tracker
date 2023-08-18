import { Pressable, StyleSheet, Text, View } from "react-native"
import { Entry } from "../../../models/entry";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSortAsc, faSortDesc } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

const styles = StyleSheet.create({
    text: {fontSize: 20, padding: 5}
});

type Props = {
    data: (Entry )[];
    isAscending?: boolean
    onFilterChanged(data: (Entry )[]): void;
    type: "date" | "value"
}

const AscendingDescendingFilter = (props: Props) =>{

    const [isAscending, setAscending] = useState(props.isAscending || false);
    
    useEffect(()=>{
        filterData(props.isAscending || false);
    },[]);

    useEffect(()=>{
        filterData(isAscending);
    },[isAscending]);

    const filterData = (isAsc: boolean) => {
        if(isAsc){
            onAscendingFilterChange();
        }else{
            onDescendingFilterChange();
        }
    }

    const AscendingFilter = () => {
        return (
            <View style={{flexDirection:"row"}}>
                <FontAwesomeIcon style={{alignSelf:"center"}} size={20} icon={faSortAsc} />
          <Pressable onPress={e => setAscending(false)}>
            <Text style={styles.text}>Ascending by {props.type === "date" ? "Date" : "$"}</Text>
          </Pressable>
          </View>
        );
      };
    
      const onAscendingFilterChange = () =>{
        
        const getData = ()=> {
            if(props.type=="value"){
                return [...props.data].sort((a,b)=> a.value - b.value);
            }
            else{
                return  [...props.data].sort((a,b)=> a.date - b.date);
            }
        };
        
        props.onFilterChanged(getData());
      }
    
      const onDescendingFilterChange = () =>{
       
        const getData = ()=> {
            if(props.type=="value"){
                return  [...props.data].sort((a,b)=> b.value - a.value);
            }
            else{
                return  [...props.data].sort((a,b)=> b.date - a.date);
            }
        };

        props.onFilterChanged(getData());
      }
    
      const DescendingFilter = () => {
        return (
            <View style={{flexDirection:"row"}}>
                <FontAwesomeIcon style={{alignSelf:"flex-start"}} size={20} icon={faSortDesc} />
          <Pressable onPress={e => setAscending(true)}>
            
            <Text style={styles.text}>Descending by {props.type === "date" ? "Date" : "$"}</Text>
          </Pressable>
          </View>
        );
      };

    return <View>
    {
        isAscending ? <AscendingFilter /> : <DescendingFilter />
    }
    </View>
}

export default AscendingDescendingFilter;