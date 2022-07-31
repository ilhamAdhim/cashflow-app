import { SQLiteDatabase, Transaction } from "react-native-sqlite-storage";
import { FinancialRecord } from "../models";
import * as SQLite from "expo-sqlite";
import { Alert, Platform } from "react-native";
import { SQLTransaction } from "expo-sqlite";

const tableName = "records";

export const getDBConnection = () => {
  if (Platform.OS === "web") {
    return {
      transaction: () => {
        return {
          executeSql: () => {},
        };
      },
    };
  }

  const db = SQLite.openDatabase("financial_records.db");
  return db;
};

export const createTableFinancialRecords = async (db: any) => {
  // create table if not exists
  const query = `CREATE TABLE IF NOT EXISTS ${tableName}(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nominal TEXT NOT NULL,
    notes TEXT NOT NULL,
    date TEXT NOT NULL,
    category TEXT NOT NULL
)`;

  await db.transaction(
    (tx: any) => tx.executeSql(query),
    (error: any) => console.log("error ketika membuat tabel records", error),
    () => console.log("tabel records terbentuk")
  );
};

export const getTotalPemasukan = async (db: any, setTotalPemasukan: any) => {
  const query = `SELECT SUM(nominal) AS total FROM ${tableName} WHERE category = 'pemasukan'`;

  await db.transaction(
    async (tx: Transaction) =>
      tx.executeSql(query, [], (_, { rows }) => {
        rows.length > 0 && setTotalPemasukan(rows.item(0).total);
      }),
    (error: any) =>
      console.log("error ketika mengambil total pemasukan", error),
    () => console.log("total pemasukan berhasil diambil")
  );
};

export const getTotalPengeluaran = async (
  db: any,
  setTotalPengeluaran: any
) => {
  const query = `SELECT SUM(nominal) AS total FROM ${tableName} WHERE category = 'pengeluaran'`;

  await db.transaction(
    (tx: Transaction) =>
      tx.executeSql(query, [], (_, { rows }) => {
        rows.length > 0 && setTotalPengeluaran(rows.item(0).total);
      }),
    (error: any) =>
      console.log("error ketika mengambil total pengeluaran", error),
    () => console.log("total pengeluaran berhasil diambil")
  );
};

export const getFinancialRecords = async (
  db: any,
  setDataRecords: any,
  initialTodos: FinancialRecord[]
) => {
  try {
    await db.transaction(async (tx: SQLTransaction) =>
      tx.executeSql(
        `SELECT rowid as id, nominal, notes, date, category FROM ${tableName}`,
        [],
        (_, { rows: { _array, length } }) => {
          if (length) {
            setDataRecords(_array);
            console.log("apakah masuk ? iya");
          } else {
            saveFinancialRecords(db, initialTodos);
            console.log("apakah masuk ? tidak");
            setDataRecords(initialTodos);
          }
        }
      )
    );
  } catch (error) {
    console.error(error);
    throw Error("Failed to get records !!!");
  }
};

export const saveFinancialRecords = async (
  db: any,
  financialRecord: FinancialRecord[]
) => {
  const insertQuery =
    `INSERT OR REPLACE INTO ${tableName}(nominal, notes, date, category) values` +
    financialRecord
      .map(
        (i) => `('${i.nominal}', '${i.notes}', '${i.date}', '${i.category}')`
      )
      .join(",");

  return await db.transaction(
    (tx: Transaction) => tx.executeSql(insertQuery),
    (error: any) =>
      console.log("gagal menambahkan data financial record", error)
  );
};

const deleteFinancialRecord = async (db: SQLiteDatabase, id: number) => {
  const deleteQuery = `DELETE from ${tableName} where rowid = ${id}`;
  await db.transaction((tx: Transaction) => tx.executeSql(deleteQuery));
};

const deleteTable = async (db: SQLiteDatabase) => {
  const query = `drop table ${tableName}`;
  await db.transaction((tx: Transaction) => tx.executeSql(query));
};
