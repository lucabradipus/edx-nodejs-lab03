
# edx-nodejs-lab03
Module 3 assignment lab in edX introduction to NodeJS 

here is the repository https://github.com/lucabradipus/edx-nodejs-lab03.git

**Testing**

after npm install you can run either
    
    npm test  
or 
    
    node test.js  
        
test.js verify that, for the chunk size that is passed to the migration program, the size of the collection remains equal to the size of starting data. It verifies also, on a sample customer, that the address inserted is the expected one.( that is that the customer with id 500 has the address at the line 500)

When you run the test you will have a few outputs like this

    ===================== 
    
    running test with chunkSize: [xx]
    
    time: [xx] milliseconds


If you want to run more tests you can add new sizes at the chunks array

    const chunks = [100, 10, 30, 50 ] 

**running**

node index.js [chunk size]

**dependencies**
    
    * async
    * mongodb
