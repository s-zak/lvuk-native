import { StyleSheet, Text, TextInput, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import { IconSymbol } from '@/components/ui/IconSymbol';
import ParallaxFlatList, { HEADER_HEIGHT } from '@/components/ParallaxFlatList';

export default function TabTwoScreen() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  });

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((user) =>
          user.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredUsers(filtered);
      });
  }, [query]); 

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={query}
          onChangeText={setQuery}
          placeholder="Search users..."
        />
      </View>
      <ParallaxFlatList
        headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
        headerImage={
          <IconSymbol
            size={310}
            color="#808080"
            name="brain.head.profile.fill"
            style={styles.headerImage}
          />
        }
        data={filteredUsers}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text style={styles.user}>{item.name}</Text>}
        >

      </ParallaxFlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  inputContainer: {
    width: '100%',
    paddingHorizontal: 32,
    position: 'absolute',
    top: HEADER_HEIGHT,
    zIndex: 1,
  },
  input: {
    fontSize: 18,
    backgroundColor: 'white'
  }
});
