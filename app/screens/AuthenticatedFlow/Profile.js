import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {
  createTable,
  addName,
  getNames,
  updateName,
  deleteName,
} from '../../database/db';
//Profile Page where CRUD Operation are executed.
const Profile = () => {
  const [name, setName] = useState('');
  const [names, setNames] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');

  useEffect(() => {
    createTable(); // Ensure the table is created
    loadNames(); // Load names from the database
  }, []);

  const loadNames = () => {
    getNames(setNames);
  };

  const handleAddName = () => {
    if (name.trim()) {
      addName(name, () => {
        setName('');
        loadNames(); // Reload names
      });
    } else {
      Alert.alert('Error', 'Name cannot be empty');
    }
  };

  const handleUpdateName = () => {
    if (editName.trim() && editingId) {
      updateName(editingId, editName, () => {
        setEditName('');
        setEditingId(null);
        loadNames(); // Reload names
      });
    } else {
      Alert.alert('Error', 'Please enter a new name');
    }
  };

  const handleDeleteName = id => {
    deleteName(id, () => {
      loadNames(); // Reload names
    });
  };

  const handleEdit = (id, name) => {
    setEditingId(id);
    setEditName(name);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Profile List</Text>

      {editingId ? (
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Edit name"
            value={editName}
            onChangeText={setEditName}
          />
          <Button title="Update Name" onPress={handleUpdateName} />
        </View>
      ) : (
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter name"
            value={name}
            onChangeText={setName}
          />
          <Button title="Add Name" onPress={handleAddName} />
        </View>
      )}

      <FlatList
        data={names}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View style={styles.item}>
            <View style={{flex: 1}}>
              <Text style={styles.titleStyle}>{item.name}</Text>
            </View>
            <TouchableOpacity onPress={() => handleEdit(item.id, item.name)}>
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDeleteName(item.id)}>
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  formContainer: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: 'black',
  },
  item: {
    padding: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonText: {
    color: 'blue',
    marginLeft: 10,
    fontSize: 15,
  },
  titleStyle: {
    fontSize: 15,
    color: 'black',
  },
});

export default Profile;
