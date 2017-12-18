const MongoClient = require('mongodb').MongoClient
async = require('async')

const customers = require('./data/m3-customer-data')
const addresses = require('./data/m3-customer-address-data')

const chunkSize = parseInt(process.argv[2], 10)
if(!chunkSize) {
  console.error(`Usage: ${process.argv[0]} ${process.argv[1]} <chunk size>` )
  process.exit(1)
}


const insertDocuments = (db, customers, addresses, done) => {
  const restoredCustomers = []
  customers.forEach((c, i) => {
    restoredCustomers.push(Object.assign(c, addresses[i]))
  })
  db.collection('customers').insert(restoredCustomers, (error, result) => {
    done(error, result)
  })

}


const updateCustomers = (db) => {

  const updateTask = (obj) => {
    console.log('updating', obj.customers.length)
  }

  let updatetasks = []


  for (let i = 0, j = customers.length; i < j; i += chunkSize) {
    let customersChunkedArray, addressesChunkedArray
    customersChunkedArray = customers.slice(i, i + chunkSize);
    addressesChunkedArray = addresses.slice(i, i + chunkSize);

    updatetasks.push((done) => {
      insertDocuments(db, customersChunkedArray, addressesChunkedArray, done)

    })
  }

  const startTime = Date.now()
  async.parallel(updatetasks, (error, results) => {
    if (error) console.error(error)
    // console.log('results:', results)
    db.close()
    console.log(`time: ${Date.now() - startTime} milliseconds`)
  })
}

const urlLab3 = 'mongodb://localhost:27017/lab3'
MongoClient.connect(urlLab3, (error, db) => {
  if (error) return process.exit(1)

  db.dropCollection("customers", (err, result) => {
    updateCustomers(db)

  })

})
