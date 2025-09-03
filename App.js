import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import PlayerForm from './components/PlayerForm';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <PlayerForm />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  }
});
