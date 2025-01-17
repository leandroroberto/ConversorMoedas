import React from "react";
import RNPickerSelect from 'react-native-picker-select'

export default function Picker(props){

    const placeHolder = {
        label: 'Selecione uma moeda',
        value: null,
        color: '#000'
    }


    return(
        <RNPickerSelect
        placeholder={placeHolder}
        items={props.moedas}
        onValueChange={(valor) => props.onChange(valor)}
        style={{
            inputIOS:{
                fontSize: 20,
                color: '#000'
            },

            inputAndroid:{
                fontSize: 20,
                color: '#000'
            }
        }}
        />
    )
}