// lib/db.js
const { Client } = require("pg");
const CONFIG = require("./config.json");

const client = new Client({
  host: CONFIG.host,
  user: CONFIG.user,
  database: CONFIG.database,
  password: CONFIG.password,
  port: CONFIG.port,
});

client.connect();

module.exports = client;
