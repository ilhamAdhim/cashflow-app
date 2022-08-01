import { SQLiteDatabase, Transaction } from "react-native-sqlite-storage";
import { FinancialRecord } from "../models";
import { Platform } from "react-native";
import * as SQLite from "expo-sqlite";
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

export const getTotalByCategory = async (
  db: any,
  setTotal: any,
  category?: string
) => {
  const query = `SELECT SUM(nominal) AS total FROM ${tableName} WHERE category = ?`;

  await db.transaction(
    async (tx: Transaction) =>
      tx.executeSql(query, [category], (_, { rows }) => {
        rows.length > 0 && setTotal(rows.item(0).total);
      }),
    (error: any) =>
      console.log("error ketika mengambil total by kategori", error),
    () => console.log("total by kategori berhasil diambil")
  );
};

export const getDataByCategory = async (
  db: any,
  setDataByCategory: any,
  category?: string
) => {
  const query = `SELECT nominal,date FROM ${tableName} WHERE category = ? order by date asc`;

  await db.transaction(
    async (tx: Transaction) =>
      tx.executeSql(
        query,
        [category],
        (_, { rows: { _array, length } }: any) => {
          if (length) setDataByCategory(_array);
        }
      ),
    (error: any) =>
      console.log("error ketika mengambil data by kategori", error),
    () => console.log("data by kategori berhasil diambil")
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
        `SELECT rowid as id, nominal, notes, date, category FROM ${tableName} order by date asc`,
        [],
        (_, { rows: { _array, length } }) => {
          if (length) {
            setDataRecords(_array);
          } else {
            saveFinancialRecords(db, initialTodos[0]);
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
  financialRecord: FinancialRecord
) => {
  let query = "";
  // Check dulu apakah data dengan tanggal tertentu dan kategori tertentu sudah ada atau belum
  await db.transaction(async (tx: SQLTransaction) =>
    tx.executeSql(
      `SELECT * from ${tableName} where date = ? and category = ?`,
      [financialRecord.date, financialRecord.category],
      (_, { rows: { _array, length } }) => {
        if (length) {
          // Jika sudah ada, maka update data tersebut
          query = `UPDATE ${tableName} SET nominal = '${
            parseInt(_array[0].nominal) + financialRecord.nominal
          }'
          , notes = '${_array[0].notes}, ${financialRecord.notes}' 
            WHERE category = '${financialRecord.category}' AND date = '${
            financialRecord.date
          }'`;
        } else {
          // Jika belum ada, maka insert data tersebut
          query = `INSERT INTO ${tableName} (nominal, notes, date, category) VALUES ('${financialRecord.nominal}', '${financialRecord.notes}', '${financialRecord.date}', '${financialRecord.category}')`;
        }
      }
    )
  );

  return await db.transaction(
    (tx: Transaction) => tx.executeSql(query),
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
