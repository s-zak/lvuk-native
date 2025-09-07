import { StyleSheet, Text, TextInput, View} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { IconSymbol } from '@/components/ui/IconSymbol';
import ParallaxFlatList, { HEADER_HEIGHT } from '@/components/ParallaxFlatList';
import { useDebouncedCallback } from 'use-debounce';

type User = {
  id: string;
  name: string;
}

const filterUsers = (users: User[], name: string) => {
  const nameLowerCase = name.toLowerCase();
  return users.filter((user) =>
    user.name.toLowerCase().includes(nameLowerCase)
  );
}

function keyExtractor<T extends { id: string }>(item: T) {
  return item.id.toString();
}

function renderItem({ item } : { item: User }) {
  return <Text style={styles.user}>{item.name}</Text>;
}

export default function TabTwoScreen() {
  const users = useRef([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        users.current = data;
        setFilteredUsers(data);
      });
  }, []);

  const filterUsersBySearchTextDebounced = useDebouncedCallback((text: string) => {
    if (!users.current.length) {
      return;
    }
    setFilteredUsers(filterUsers(users.current, text));
  }, 150);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={filterUsersBySearchTextDebounced}
          placeholder="Search users..."
        />
      </View>
      <ParallaxFlatList<User>
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
        keyExtractor={keyExtractor}
        renderItem={renderItem}
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
