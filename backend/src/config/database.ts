import sqlite3 from "sqlite3";
import { Database } from "sqlite3";

export const database = new sqlite3.Database("./src/database.sqlite", (err) => {
  if (err) {
    console.error("Error opening database:", err);
  } else {
    createTables();
  }
});

function createTables() {
  const userTable = `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'user'
    )
  `;

  database.run(userTable, (err) => {
    if (err) {
      console.error("Error creating users table:", err);
    } else {
      console.log("Users table ready");
    }
  });
}