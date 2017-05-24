// Generated by LiveScript 1.5.0
(function(){
  var main, bigNumber, expect, slice$ = [].slice;
  main = require('../main/main.js');
  bigNumber = require('big-number');
  expect = require('expect');
  describe('Basic', function(){
    it('test-big-number', function(){
      expect(bigNumber(5).toString()).toBe("5");
      return expect(bigNumber("5").toString()).toBe("5");
    });
    it('exists', function(){
      var i$, ref$, len$, coin, provider, results$ = [];
      for (i$ = 0, len$ = (ref$ = ['eth', 'btc', 'ltc']).length; i$ < len$; ++i$) {
        coin = ref$[i$];
        provider = main.newAddr[coin];
        expect(provider().address).toBeA("string", "Not string Address " + coin);
        results$.push(expect(provider().privateKey).toBeA("string", "Not string Private Key " + coin));
      }
      return results$;
    });
    it('unique', function(){
      var i$, ref$, len$, coin, provider, results$ = [];
      for (i$ = 0, len$ = (ref$ = ['eth', 'btc', 'ltc']).length; i$ < len$; ++i$) {
        coin = ref$[i$];
        provider = main.newAddr[coin];
        expect(provider().address).toNotBe(provider().address, "Not unique Private Key " + coin);
        results$.push(expect(provider().privateKey).toNotBe(provider().privateKey, "Not unique Private Key " + coin));
      }
      return results$;
    });
    it('valid', function(){
      var i$, ref$, len$, coin, provider, ref1$, address, privateKey, valid, message, signature, results$ = [];
      for (i$ = 0, len$ = (ref$ = ['eth', 'btc', 'ltc']).length; i$ < len$; ++i$) {
        coin = ref$[i$];
        provider = main.newAddr[coin];
        ref1$ = provider(), address = ref1$.address, privateKey = ref1$.privateKey;
        valid = provider.verify(address);
        expect(valid).toBe(true, "Invalid Ethereum Address " + coin);
        message = "Test Message";
        signature = main.sign[coin].sign(message, privateKey);
        results$.push(expect(main.sign[coin].verify(message, address, signature)).toBe(true));
      }
      return results$;
    });
    it('balance', function(done){
      var accs, coins, checkBalance, checkBalances;
      this.timeout(3000);
      accs = {
        eth: {
          address: "0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe",
          balance: bigNumber("802672.276608465139479303")
        },
        ltc: {
          address: "LajyQBeZaBA1NkZDeY8YT5RYYVRkXMvb2T",
          balance: bigNumber("7601.11229246")
        },
        btc: {
          address: '16oZmpFVHpXVgyegWYXg4zNFhXVxYJemmY',
          balance: bigNumber("31.31659632")
        }
      };
      coins = ['eth', 'btc', 'ltc'];
      checkBalance = function(coin, callback){
        var acc, provider;
        acc = accs[coin];
        provider = main.balance[coin];
        return provider(acc.address, function(balance){
          expect(balance.equals(acc.balance)).toBe(true, "real balance " + balance.toString() + " is not expected " + acc.balance.toString() + " for " + coin);
          callback(balance);
        });
      };
      checkBalances = function(coins, callback){
        var head, tail;
        head = coins[0], tail = slice$.call(coins, 1);
        return checkBalance(head, function(){
          if (tail.length > 0) {
            checkBalances(tail, callback);
          } else {
            callback();
          }
        });
      };
      return checkBalances(coins, done);
    });
    return it('rates', function(done){
      var coins, checkRate, checkRates;
      this.timeout(5000);
      coins = ['eth', 'btc', 'ltc'];
      checkRate = function(coin, callback){
        var provider;
        provider = main.rate[coin];
        return provider(function(rate){
          expect(rate).toBeA('number');
          callback(rate);
        });
      };
      checkRates = function(coins, callback){
        var head, tail;
        head = coins[0], tail = slice$.call(coins, 1);
        return checkRate(head, function(){
          if (tail.length === 0) {
            return callback();
          }
          checkRates(tail, callback);
        });
      };
      return checkRates(coins, done);
    });
  });
}).call(this);
