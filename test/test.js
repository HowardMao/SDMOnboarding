//Backend Tests
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index.js').server;
let close = require('../index.js').close;
let open = require('../index.js').connectToMongoDB;
chai.use(chaiHttp);
chai.should();

describe("Testing MongoDB functions", function() {

    before(() =>{
        open();
    })

    after(() => {
        server.close();
        close();
    })
    
    it('should GET all goals', (done) =>{
        chai.request(server)
            .get('/api/goals')
            .end((err, res) =>{
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            })
    // gave extra time just in case the mongodb server takes a while to load the data
    }).timeout(20000)
})