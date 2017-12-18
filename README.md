
# edx-nodejs-lab03
Module 3 assignment lab in edX introduction to NodeJS 

here is the repository https://github.com/lucabradipus/edx-nodejs-lab03.git

**Testing**

after npm install you can run either
    
    npm test  
or 
    
    node test.js  
        
test.js verify that, for the chunk size that is passed to the m=migration program, the size of the collection remains equal to the size of startibg data. It verifies also ona a sample customer that the address inserted is the expected one

When you run the test you will have an output as this

    ===================== 
    
    running test with chunkSize: [xx]
    
    time: [xx] milliseconds

and so on. 

If you want to run more test you can add chunksizes in the chunks array

    const chunks = [100, 10, 30, 50 ] 

**running**

node index.js <chunk size>

**dependencies**
    
    * async
    * mongodb
    
**    
