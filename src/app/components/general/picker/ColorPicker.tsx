import { useState } from "react"
import { Pressable, Text, View } from "react-native"
import ColorPicker from "react-native-wheel-color-picker"

type Props ={
    iconColor: string | null,
    backgroundColor: string | null,
    onColorChangeComplete(color: string):void
    onBackgroundColorChangeComplete(color: string):void
}

const CustomColorPicker = (props: Props) =>{

    const iconColor = props.iconColor || "#FFF";
    const backgroundColor = props.backgroundColor || "#FFF";

    const [isBackgroundColor, setIsBackgroundColor] = useState(false);
    const [enabled, setEnabled] = useState(false);

    const onColorChange = (color: string) =>{
        if(enabled){
            console.log("color change?")

            if(isBackgroundColor){
                props.onBackgroundColorChangeComplete(color);
            }else{
                props.onColorChangeComplete(color);
            }
        }
    }

    return <View style={{ backgroundColor: "white", height: 290, padding: 10, marginTop: -10, marginBottom: 15}}>

        <View style={{ position: "absolute", top: 30, right: 0, left: 0, zIndex: 1}}>
            <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: 5}}>
                <Pressable onPress={()=> setIsBackgroundColor(false)} style={{ borderRadius: 25, padding: 7, backgroundColor: !isBackgroundColor ? "#857c7b" : "#d6c8c7"}}>
                    <Text style={{fontSize: 16}}>Icon Color</Text> 
                </Pressable>
                <Pressable onPress={()=> setIsBackgroundColor(true)} style={{borderRadius: 25, padding: 7, backgroundColor: isBackgroundColor ? "#857c7b" : "#d6c8c7"}}>
                    <Text style={{fontSize: 16}}>Background</Text>
                </Pressable>
            </View>
        </View>
        <ColorPicker
            thumbSize={30}
            color={isBackgroundColor ? backgroundColor : iconColor}
            onInteractionStart={()=>setEnabled(true)}
            onColorChangeComplete={onColorChange}
            swatches={false} />
        </View>
}

export default CustomColorPicker;