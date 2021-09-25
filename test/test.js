//Backend Tests
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index.js').server;
let close = require('../index.js').close;
let open = require('../index.js').connectToMongoDB;

chai.use(chaiHttp);
chai.should();

class Hello{
    Hello(){}

    SayHello(){
        return "hello";
    }
}

describe("Testing the test in server", function() {

    before(() =>{
        open();
    })

    after(() => {
        server.close();
        close();
    })
    
    it('should return \'hello\'', function(){
        var hello = new Hello();
        var word = hello.SayHello();

        chai.expect(word).to.equal("hello");
    }),
    
    it('should GET all goals', (done) =>{
        chai.request(server)
            .get('/api/goals')
            .end((err, res) =>{
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            })
    }).timeout(50000)
})