import { Alert } from "react-native";
import { SQLiteDatabase, Transaction } from "react-native-sqlite-storage";

export const createTableUser = async (db: any) => {
  const query = `CREATE TABLE IF NOT EXISTS user(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      password TEXT NOT NULL
      );`;

  await db.transaction(
    (tx: Transaction) => tx.executeSql(query),
    (error: any) => console.log("error ketika membuat tabel user", error),
    () => console.log("tabel user terbentuk")
  );
};

export const getUser = async (db: any, setUser: any) => {
  const query = `SELECT * FROM user;`;

  await db.transaction(
    async (tx: Transaction) =>
      tx.executeSql(query, [], (_, { rows: { _array, length } }: any) => {
        if (length > 0) setUser(..._array);
      }),
    (error: any) => console.log("error ketika mengambil data user", error),
    () => console.log("data user berhasil diambil")
  );
};

export const checkUserRegistered = async (db: any) => {
  const query = `SELECT * FROM user;`;

  await db.transaction(
    async (tx: Transaction) =>
      tx.executeSql(query, [], (_, { rows: { _array, length } }: any) => {
        if (length === 0) registerInitialUser(db);
      }),
    (error: any) => console.log("error ketika mengambil data user", error),
    () => console.log("data user berhasil diambil")
  );
};

const registerInitialUser = async (db: any) => {
  const queryInsert = `INSERT INTO user (username, password) VALUES ('admin', 'admin')`;

  await db.transaction(
    (tx: Transaction) => tx.executeSql(queryInsert),
    (error: any) => console.log("error ketika membuat admin", error),
    () => console.log("admin berhasil dibuat.")
  );
};

export const getUserWithPassword = async (
  db: any,
  password: string,
  newPassword: string
) => {
  const query = `SELECT * FROM user WHERE password = ?;`;
  await db.transaction(
    (tx: Transaction) =>
      tx.executeSql(query, [password], (_, { rows }) => {
        if (rows.length > 0) {
          changePassword(db, newPassword, 1);
          //   console.log("Berarti bisa diupdate");
          Alert.alert("Berarti bisa diupdate");
        } else Alert.alert("Password lama salah");
      }),
    (error: any) => console.log("user dengan password tidak ditemukan", error),
    () => console.log("user dengan password ditemukan")
  );
};

export const changePassword = async (
  db: any,
  newPassword: string,
  idUser: number
) => {
  const query = `UPDATE user SET password = '${newPassword}' WHERE id = ${idUser}`;

  await db.transaction(
    (tx: Transaction) => tx.executeSql(query),
    (error: any) => console.log("error ketika mengubah password", error),
    () => {
      Alert.alert("Password berhasil diubah");
      console.log("password berhasil diubah");
    }
  );
};

export const loginUser = async (
  db: any,
  username: string,
  password: string,
  setIsLoggedIn: any
) => {
  const query = `SELECT * FROM user WHERE username = ? AND password = ?`;

  await db.transaction(async (tx: Transaction) =>
    tx.executeSql(query, [username, password], (_, { rows }) => {
      if (rows.length > 0) {
        console.log(rows.item(0), "ini apa");
        setIsLoggedIn(true);
      } else {
        Alert.alert("Username atau Password salah");

        setIsLoggedIn(false);
      }
    })
  );
};

const deleteTableUser = async (db: SQLiteDatabase) => {
  const query = `drop table user`;
  await db.transaction((tx: Transaction) => tx.executeSql(query));
};
