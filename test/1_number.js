// Generated by LiveScript 1.5.0
(function(){
  var bigNumber, expect;
  bigNumber = require('big.js');
  expect = require('expect');
  describe('Basic', function(){
    return it('test-big-number', function(){
      expect(bigNumber(5).toString()).toBe("5");
      expect(bigNumber("5").toString()).toBe("5");
      expect(bigNumber("7601.11229246").toString()).toBe("7601.11229246");
      expect(bigNumber("-7601.11229246").toString()).toBe("-7601.11229246");
      return expect(bigNumber("802672.276608465139479303").toString()).toBe("802672.276608465139479303");
    });
  });
}).call(this);
