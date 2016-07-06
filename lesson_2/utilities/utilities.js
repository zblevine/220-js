(function() {
  var _ = function(element) {
    var u = {
      first: function() {
        return element[0];
      },
      last: function() {
        return element[element.length - 1];
      },
      without: function() {
        var filtered = element.slice();
        var args = Array.from(arguments);
        args.forEach(function(arg) {
          filtered = filtered.filter(function(value) {
            return value !== arg;
          });
        });

        return filtered;
      },
      lastIndexOf: function(val) {
        for(var d = element.length - 1; d >= 0; d--) {
          if(element[d] === val) {
            return d;
          }
        }

        return -1;
      },
      sample: function(num) {
        var randInt = function(ceil) {
          return Math.floor(Math.random()*ceil);
        };

        if (num === undefined) {
          return element[randInt(element.length)];
        } else {
          var indices = _.range.call(u, element.length);
          var sampled = [];
          for (var i = 0; i < num; i++) {
            var idx = randInt(indices.length);
            sampled.push(element[indices[idx]]);
            indices.splice(idx, 1);
          }

          return sampled;
        }
      },

      findWhere: function(obj) {
        var allPropsMatch = function(param, ele) {
          for (var prop in param) {
            if (param[prop] !== ele[prop]) {
              return false;
            }
          }

          return true;
        };

        for (var i = 0, len = element.length; i < len; i++) {
          var curr = element[i];
          if (allPropsMatch(obj, curr)) {
            return curr;
          }
        }
      },
      where: function(obj) {
        var allPropsMatch = function(param, ele) {
          for (var prop in param) {
            if(Object.prototype.hasOwnProperty.call(param, prop)) {
              if (param[prop] !== ele[prop]) {
                return false;
              }
            }
          }

          return true;
        };
        var matched = [];

        for (var i = 0, len = element.length; i < len; i++) {
          var curr = element[i];
          if (allPropsMatch(obj, curr)) {
            matched.push(curr);
          }
        }

        return matched;
      },
      pluck: function(key) {
        var values = [];

        for (var i = 0, len = element.length; i < len; i++) {
          var curr = element[i];
          if(curr[key]) {
            values.push(curr[key]);
          }
        }

        return values;
      },
      keys: function() {
        var key_arr = [];
        for (var prop in element) {
          if(Object.prototype.hasOwnProperty.call(element, prop)) {
            key_arr.push(prop);
          }
        }

        return key_arr;
      },
      values: function() {
        var value_arr = [];
        for (var prop in element) {
          if(Object.prototype.hasOwnProperty.call(element, prop)) {
            value_arr.push(element[prop]);
          }
        }

        return value_arr;
      },
      pick: function() {
        var picked = {};
        for (var i = 0, len = arguments.length; i < len; i++) {
          var prop = arguments[i];
          if(Object.prototype.hasOwnProperty.call(element, prop)) {
            picked[prop] = element[prop];
          }
        }

        return picked;
      },
      omit: function() {
        var omitted = Object.assign({}, element);
        for (var i = 0, len = arguments.length; i < len; i++) {
          var prop = arguments[i];
          if(Object.prototype.hasOwnProperty.call(element, prop)) {
            delete omitted[prop];
          }
        }

        return omitted;
      },
      has: function(prop) {
        return Object.prototype.hasOwnProperty.call(element, prop);
      }
    };

    (function() {
      var methods = ["isElement", "isArray", "isObject", "isFunction", "isBoolean", "isString", "isNumber"];
      methods.forEach(function(method) {
        u[method] = function(obj) {
          return _[method].call(u, obj);
        }
      });
    })();

    return u;
  };

  _.range = function(start, end) {
    var range_obj = [];
    if (end === undefined) {
      for (var i = 0; i < start; i++) {
        range_obj.push(i);
      }
    } else {
      for (var i = start; i < end; i++) {
        range_obj.push(i);
      }
    }

    return range_obj;
  };  

  _.extend = function() {
    var extended = arguments[0];
    for (var i = 1, len = arguments.length; i < len; i++) {
      var curr = arguments[i];
      for(var prop in curr) {
        if(Object.prototype.hasOwnProperty.call(curr, prop)) {
          extended[prop] = curr[prop];
        }
      }
    }

    return extended;
  };

  _.isElement = function(obj) {
    return obj && obj.nodeType === 1;
  };
  _.isArray = function(obj) {
    return obj instanceof Array;
  };
  _.isObject = function(obj) {
    return obj instanceof Object;
  };
  _.isFunction = function(obj) {
    return obj instanceof Function;
  };
  _.isBoolean = function(obj) {
    return typeof obj === "boolean" || obj instanceof Boolean;
  };
  _.isString = function(obj) {
    return typeof obj === "string" || obj instanceof String;
  };
  _.isNumber = function(obj) {
    return typeof obj === "number" || obj instanceof Number;
  };


  window._ = _;
})();