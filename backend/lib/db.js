// lib/db.js
const { Client } = require('pg')

const client = new Client({
    host: 'localhost',
    user: 'ponyxcgv',
    database: 'ponyxcgv_articulos_lore',
    password: '2Patatas.Fritas',
    port: '5433'
})

client.connect()

module.exports = client;
