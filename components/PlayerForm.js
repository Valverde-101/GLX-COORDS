import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
  Alert
} from 'react-native';
import {
  savePlayer,
  getPlayerByName,
  updatePlayer,
  deletePlayer
} from '../utils/storage';

const planetLabels = ['PP','Col1','Col2','Col3','Col4','Col5','Col6','Col7','Col8','Col9','Col10','Col11'];

const emptyPlanet = { coord: '', star: '' };

export default function PlayerForm() {
  const [name, setName] = useState('');
  const [alliance, setAlliance] = useState('');
  const [level, setLevel] = useState('');
  const [planets, setPlanets] = useState(Array(planetLabels.length).fill(null).map(() => ({ ...emptyPlanet })));

  const handlePlanetChange = (index, field, value) => {
    const updated = planets.map((p, i) => (i === index ? { ...p, [field]: value } : p));
    setPlanets(updated);
  };

  const clearForm = () => {
    setName('');
    setAlliance('');
    setLevel('');
    setPlanets(Array(planetLabels.length).fill(null).map(() => ({ ...emptyPlanet })));
  };

  const handleSave = async () => {
    try {
      await savePlayer({ name, alliance, level, planets });
      Alert.alert('Éxito', 'Registro guardado.');
    } catch (e) {
      Alert.alert('Error', e.message);
    }
  };

  const handleSearch = async () => {
    try {
      const player = await getPlayerByName(name);
      if (player) {
        setAlliance(player.alliance);
        setLevel(player.level);
        setPlanets(player.planets);
        Alert.alert('Información', 'Registro encontrado.');
      } else {
        Alert.alert('Información', 'No se encontró un registro con ese nombre.');
      }
    } catch (e) {
      Alert.alert('Error', e.message);
    }
  };

  const handleUpdate = async () => {
    try {
      await updatePlayer({ name, alliance, level, planets });
      Alert.alert('Éxito', 'Datos actualizados.');
    } catch (e) {
      Alert.alert('Error', e.message);
    }
  };

  const handleDelete = async () => {
    try {
      await deletePlayer(name);
      clearForm();
      Alert.alert('Éxito', 'Registro eliminado.');
    } catch (e) {
      Alert.alert('Error', e.message);
    }
  };

  return (
    <ScrollView>
      <Text style={styles.title}>Gestión de Jugadores</Text>
      <View style={styles.fieldRow}>
        <Text style={styles.label}>Nombre:</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} />
      </View>
      <View style={styles.fieldRow}>
        <Text style={styles.label}>Alianza:</Text>
        <TextInput style={styles.input} value={alliance} onChangeText={setAlliance} />
      </View>
      <View style={styles.fieldRow}>
        <Text style={styles.label}>Nivel:</Text>
        <TextInput style={styles.input} value={level} onChangeText={setLevel} keyboardType="numeric" />
      </View>

      {planets.map((planet, index) => (
        <View key={index} style={styles.planetContainer}>
          <Text style={styles.planetLabel}>{planetLabels[index]}:</Text>
          <TextInput
            style={styles.coordInput}
            placeholder="Coordenada"
            value={planet.coord}
            onChangeText={(text) => handlePlanetChange(index, 'coord', text)}
          />
          <TextInput
            style={styles.starInput}
            placeholder="⭐"
            value={planet.star}
            onChangeText={(text) => handlePlanetChange(index, 'star', text)}
            keyboardType="numeric"
          />
        </View>
      ))}

      <View style={styles.buttonRow}>
        <Button title="Buscar" onPress={handleSearch} />
        <Button title="Guardar" onPress={handleSave} />
        <Button title="Actualizar" onPress={handleUpdate} />
        <Button title="Eliminar" onPress={handleDelete} />
        <Button title="Limpiar" onPress={clearForm} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center'
  },
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  label: {
    width: 80,
    fontWeight: 'bold'
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 5
  },
  planetContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  planetLabel: {
    width: 60
  },
  coordInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    marginRight: 5
  },
  starInput: {
    width: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 5
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    flexWrap: 'wrap'
  }
});
