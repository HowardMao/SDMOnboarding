const chai = require('chai');
const TestUtils = require('react/addons').addons.TestUtils

class Hello{
    Hello(){
    }

    SayHello(){
        return "hello";
    }
}

describe("Testing the test", function() {
    it('should return \'hello\'', function(){
        var hello = new Hello();
        var word = hello.SayHello();

        chai.expect(word).to.equal("hello");
    })

})