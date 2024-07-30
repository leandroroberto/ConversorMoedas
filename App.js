import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Alert, Keyboard, TouchableOpacity, ActivityIndicator } from 'react-native';
import Picker from './src/components/Picker';

import api from './src/services/api'

export default function App() {

  const [moedas, setMoedas] = useState([])
  const [loading, setLoading] = useState(true)

  const [moedaSelecionada, setMoedaSelecionada] = useState(null)
  const [moedaBValor, setMoedaBValor] = useState(0)

  const [valorMoeda, setValorMoeda] = useState(null)
  const [valorConvertido, setValorConvertido] = useState(0)

  useEffect(() => {
    async function loadingMoedas() {
      const response = await api.get('all')

      let arrayMoedas = []
      Object.keys(response.data).map((key) => {
        arrayMoedas.push({
          key: key,
          label: key,
          value: key
        })
      })

      setMoedas(arrayMoedas)
      setLoading(false)
    }

    loadingMoedas()
  }, [])


  async function converter() {
    if(moedaSelecionada === null || moedaBValor === 0){
      Alert.alert('Campos vazios', 'Selecione uma moeda')
      return
    }

    const response = await api.get(`all/${moedaSelecionada}-BRL`)
    let valor = (response.data[moedaSelecionada].ask * parseFloat(moedaBValor))
    setValorConvertido(valor)
    setValorMoeda(moedaBValor)
    Keyboard.dismiss()
  }


  if (loading) {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <ActivityIndicator color={'#fff'} size={45} />
      </View>
    )
  } else {
    return (
      <View style={styles.container}>

        <View style={styles.areaMoeda}>
          <Text style={styles.titulo}>Selecione sua moeda</Text>
          <Picker moedas={moedas} onChange={(moeda) => setMoedaSelecionada(moeda)} />
        </View>

        <View style={styles.areaValor}>
          <Text style={styles.titulo}>Digite um valor para converter em (R$)</Text>
          <TextInput onChangeText={(valor) => setMoedaBValor(valor)}
            style={styles.input}
            placeholder='ex: 250'
            keyboardType='numeric' />
        </View>

        <TouchableOpacity style={styles.botaoArea} onPress={converter}>
          <Text style={styles.botaoTexto}>Converter</Text>
        </TouchableOpacity>

        {valorConvertido !== 0 && (
          <View style={styles.areaResultado}>
            <Text style={styles.valorConvertido}>{valorMoeda} em {moedaSelecionada}</Text>
            <Text style={[styles.valorConvertido, { fontSize: 18, margin: 10 }]}>Corresponde a</Text>
            <Text style={styles.valorConvertido}>R$ {valorConvertido.toFixed(2)}</Text>
          </View>
        )}


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#101215',
    paddingTop: 50,
  },

  areaMoeda: {
    width: '90%',
    backgroundColor: '#f9f9f9',
    paddingTop: 9,
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
    marginBottom: 1,
  },

  titulo: {
    fontSize: 15,
    color: '#000',
    paddingTop: 5,
    paddingLeft: 5
  },

  areaValor: {
    width: '90%',
    backgroundColor: '#f9f9f9',
    paddingBottom: 9,
    paddingTop: 9
  },

  input: {
    width: '100%',
    padding: 10,
    height: 45,
    fontSize: 20,
    marginLeft: 5,
    color: '#000'
  },

  botaoArea: {
    width: '90%',
    backgroundColor: '#fb4b57',
    height: 45,
    borderBottomLeftRadius: 9,
    borderBottomRightRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },

  botaoTexto: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold'
  },

  areaResultado: {
    width: '90%',
    backgroundColor: '#fff',
    marginTop: 35,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25
  },

  valorConvertido: {
    fontSize: 39,
    fontWeight: 'bold',
    color: '#000'
  }
});
