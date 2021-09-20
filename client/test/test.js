const chai = require('chai');

class Hello{
    Hello(){
    }

    SayHello(){
        return "hello";
    }
}

describe("Testing the test", function() {
    it('should return the word \'hello\'', function(){
        var hello = new Hello();
        var word = hello.SayHello();

        chai.expect(word).to.equal("hello");
    })

})