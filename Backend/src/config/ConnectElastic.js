const {Client}=require('@elastic/elasticsearch')
require('dotenv').config()

const client = new Client({
    // node: `https://${process.env.ELASTIC_IP}:9200`,
    node: `https://localhost:9200`,
    auth: {
      // username: process.env.USER_NAME,
      // password: process.env.PASSWORD,
      username: 'khoamai',
      password: '123456',
    },
    tls: {
      ca: 'a4856d1a7185d0bc25ce8e5a3fdedda640131e53d843d2508f0dd301d54b6aea',
      rejectUnauthorized: false,
    },
    requestTimeout:9999999,
    
  });
  
module.exports = client;