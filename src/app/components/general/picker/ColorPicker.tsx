import { View } from "react-native"
import ReactNativeModal from "react-native-modal"
import ColorPicker from "react-native-wheel-color-picker"

type Props ={
    color: string,
    onColorChangeComplete(colo: string):void
    isVisible: boolean
    onClose(): void
}

const CustomColorPicker = (props: Props) =>{

    return <ReactNativeModal
        isVisible={props.isVisible}
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        propagateSwipe
        onBackdropPress={() => props.onClose()}
    >
        <View style={{padding: 10, backgroundColor: "white", height: 350, marginTop:50}}>
        <ColorPicker
            thumbSize={20}
            color={props.color}
            onColorChangeComplete={props.onColorChangeComplete}
            swatches={false} />
        </View>
    </ReactNativeModal>
}

export default CustomColorPicker;