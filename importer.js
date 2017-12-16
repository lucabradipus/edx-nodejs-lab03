const MongoClient = require('mongodb').MongoClient
const customers = require('./data/m3-customer-data')
const addresses = require('./data/m3-customer-address-data')

// Connection URL
const urlLab3 = 'mongodb://localhost:27017/lab3'
// Use connect method to connect to the DB server
MongoClient.connect(urlLab3, (error, db) => {
  if (error) return process.exit(1)
  console.log('Connection is okay')
  insertDocuments(db, 'customers', customers, () => {
    db.close()
  })
})

const urlBKLab3 = 'mongodb://localhost:27017/bk-lab3'
// Use connect method to connect to the DB server
MongoClient.connect(urlBKLab3, (error, db) => {
  if (error) return process.exit(1)
  console.log('Connection is okay')
  insertDocuments(db, 'addresses', addresses, () => {
    db.close()
  })
})

const insertDocuments = (db, collectionName, data, callback) => {
  const collection = db.collection(collectionName)
  collection.insert(data, (error, result) => {
    if (error) return process.exit(1)
    const added =  result.result.n
    console.log(result.result.n)
    // console.log(result.ops.length)
    console.log(`Inserted ${added} documents into the edx-course-students collection`)
    callback(result)
  })
}

