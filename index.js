const MongoClient = require('mongodb').MongoClient
async = require('async')
const customers = require('./data/m3-customer-data')
const addresses = require('./data/m3-customer-address-data')

// Connection URL

const insertDocuments = (db, collectionName, customers, addresses) => {
  const collection = db.collection(collectionName)
  const restoredCustomers = []
  customers.forEach((c, i) => {
    //your iterator
    restoredCustomers.push(Object.assign(c, addresses[i]))
  })
    console.log('restoredCustomer:', restoredCustomers[0].id)
    collection.insert(restoredCustomers, (error, result) => {
      if (error) return process.exit(1)
      const added =  1
      // console.log(result.ops.length)
      // console.log(`Inserted ${result} documents into the  collection`)
    })


}


const updateCustomers = (db, callback) => {

  const updateTask = (obj) => {
    console.log('updating', obj.customers.length)
  }

  let updatetasks =[]


  let i,j,chunk = 50;
  for (i=0,j=customers.length; i<j; i+=chunk) {
    let customersChunkedArray ,addressesChunkedArray
    customersChunkedArray = customers.slice(i,i+chunk);
    addressesChunkedArray = addresses.slice(i,i+chunk);

    updatetasks.push((done) => {
      console.log ('customers:', customersChunkedArray[0].id)
      insertDocuments(db, 'customers', customersChunkedArray,addressesChunkedArray )

    })
  }

  async.parallel(updatetasks, (error, results) => {
    if (error) console.error(error)
    console.log('results',results)
  })
}

const urlLab3 = 'mongodb://localhost:27017/lab3'
// Use connect method to connect to the DB server
MongoClient.connect(urlLab3, (error, db) => {
  if (error) return process.exit(1)

  console.log('Connection is okay')
  db.dropCollection("customers", (err, result) => {
    if(err){
      console.log('customer collection does not exist yet')
    } else {
      console.log('dropped customer collection')
    }
    updateCustomers(db, () => {
      db.close()
    })

  })

})
