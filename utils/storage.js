import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'players';

export async function getPlayers() {
  const json = await AsyncStorage.getItem(STORAGE_KEY);
  return json ? JSON.parse(json) : [];
}

export async function savePlayer(player) {
  const players = await getPlayers();
  const exists = players.some(p => p.name.toLowerCase() === player.name.toLowerCase());
  if (exists) {
    throw new Error('El nombre ingresado ya existe.');
  }
  players.push(player);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(players));
}

export async function getPlayerByName(name) {
  const players = await getPlayers();
  return players.find(p => p.name.toLowerCase() === name.toLowerCase());
}

export async function updatePlayer(player) {
  const players = await getPlayers();
  const index = players.findIndex(p => p.name.toLowerCase() === player.name.toLowerCase());
  if (index === -1) {
    throw new Error('No se encontró un registro con ese nombre.');
  }
  players[index] = player;
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(players));
}

export async function deletePlayer(name) {
  const players = await getPlayers();
  const filtered = players.filter(p => p.name.toLowerCase() !== name.toLowerCase());
  if (filtered.length === players.length) {
    throw new Error('No se encontró un registro con ese nombre.');
  }
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}
