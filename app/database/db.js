import SQLite from 'react-native-sqlite-storage';

// Open or create a database
const db = SQLite.openDatabase(
  {
    name: 'Profiles.db',
    location: 'default',
  },
  () => {},
  error => {
    console.log('Database Error: ', error);
  },
);
//Create Table
export const createTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS Profiles (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT,month INTEGER)',
      [],
      () => {
        console.log('Table created successfully');
      },
      error => {
        console.log('Table creation error: ', error);
      },
    );
  });
};
//Create Operation(Add)
export const addName = (name, callBack) => {
  db.transaction(tx => {
    const month = Math.floor(Math.random() * 12) + 1;
    tx.executeSql(
      'INSERT INTO Profiles (name,month) VALUES (?,?)',
      [name, month],
      (tx, results) => {
        console.log('Name added successfully');
        callBack?.();
      },
      error => {
        console.log('Add name error: ', error);
      },
    );
  });
};
//Read Operation

export const getNames = callback => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM Profiles',
      [],
      (tx, results) => {
        const rows = results.rows.raw(); // Array of rows
        callback(rows);
      },
      error => {
        console.log('Get names error: ', error);
      },
    );
  });
};

//Update Operation
export const updateName = (id, newName, callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'UPDATE Profiles SET name = ? WHERE id = ?',
      [newName, id],
      (tx, results) => {
        if (callback) callback(results);
      },
      error => {
        console.log('Update name error: ', error);
      },
    );
  });
};

//Delete Operation
export const deleteName = (id, callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'DELETE FROM Profiles WHERE id = ?',
      [id],
      (tx, results) => {
        if (callback) callback(results);
      },
      error => {
        console.log('Delete name error: ', error);
      },
    );
  });
};

export default db;
