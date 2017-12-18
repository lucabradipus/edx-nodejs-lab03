const assert = require('assert');
const MongoClient = require('mongodb').MongoClient
const childProcess = require('child_process')
const customersData = require('./data/m3-customer-data')


const urlLab3 = 'mongodb://localhost:27017/lab3'
let index = 0
const chunks = [100, 10, 30, 50]

const runTest = (chunk) => {
  console.log('===================== ')
  console.log('running test with chunkSize: ' + chunk)

  MongoClient.connect(urlLab3, (error, db) => {
    if (error) return process.exit(1)
    const collection = db.collection('customers')
    const converter = childProcess.exec(`node index.js ${chunk}`, (error, stdout, stderr) => {
      if (error) {
        console.log(error.stack)
        console.log('Error code: ', error.code)
        console.log('Signal received: ', error.signal)
      }
      console.log(stderr)
      console.log(stdout)
      collection.count(function (err, count) {
        assert.equal(null, err);
        assert.equal(customersData.length, count, `wrong number of customer inserted in db: expected ${customersData.length} vs ${count}`);
        collection.findOne({id: '500'}, function (err, customer) {
          assert.equal(null, err);
          assert.equal(customer.email, "pdrakersdv@go.com", 'wrong email');
          assert.equal(customer.phone, "805-496-7416", 'wrong phone');
          db.close();
          index += 1
          if (index === chunks.length) process.exit(0)
          runTest(chunks[index])
        })

      })
    })

  })
}

runTest(15)

