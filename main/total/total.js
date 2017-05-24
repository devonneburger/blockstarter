// Generated by LiveScript 1.5.0
(function(){
  var p, bigNumber, slice$ = [].slice;
  p = require('prelude-ls');
  bigNumber = require('big.js');
  module.exports = curry$(function(calc, rates){
    var zero, items, coins, startCollect, stopCollect, buildTotal, calcTotal, sum, renderTotal, totals;
    zero = function(){
      return bigNumber(0);
    };
    items = calc();
    coins = Object.keys(items);
    startCollect = function(){
      return p.each(function(it){
        return items[it].start();
      })(
      coins);
    };
    stopCollect = function(){
      return p.each(function(it){
        return items[it].stop();
      })(
      coins);
    };
    buildTotal = function(item, name){
      return {
        name: name,
        total: item.total()
      };
    };
    calcTotal = function(names, callback){
      var head, tail, total;
      head = names[0], tail = slice$.call(names, 1);
      if (head == null) {
        return callback([]);
      }
      total = items[head].total();
      return rates[head](function(usd){
        var item;
        item = {
          name: head,
          amount: total,
          amountUsd: bigNumber(usd).times(total),
          rate: usd
        };
        calcTotal(tail, function(rest){
          callback([item].concat(rest));
        });
      });
    };
    sum = function(first, second){
      return first.plus(second);
    };
    renderTotal = function(total){
      return {
        name: total.name,
        amount: total.amount.toString(),
        amountUsd: total.amountUsd.toString(),
        rate: total.rate
      };
    };
    totals = function(done){
      return calcTotal(coins, function(items){
        var totalUsd, result, this$ = this;
        totalUsd = p.foldl(sum, zero())(
        p.map(function(it){
          return it.amountUsd;
        })(
        items));
        result = {
          totalUsd: totalUsd.toString(),
          details: p.map(renderTotal)(
          items)
        };
        done(result);
      });
    };
    return {
      startCollect: startCollect,
      stopCollect: stopCollect,
      totals: totals,
      items: items
    };
  });
  function curry$(f, bound){
    var context,
    _curry = function(args) {
      return f.length > 1 ? function(){
        var params = args ? args.concat() : [];
        context = bound ? context || this : this;
        return params.push.apply(params, arguments) <
            f.length && arguments.length ?
          _curry.call(context, params) : f.apply(context, params);
      } : f;
    };
    return _curry();
  }
}).call(this);
