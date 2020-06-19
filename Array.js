Array.prototype.map = function (callback) {
  var v, ar, r;

  if (this == null) {
    throw new TypeError("null/undefined value");
  }

  var O = Object(this);

  var len = O.length >>> 0;

  if (typeof callback !== "function") {
    throw new TypeError(callback + " must be a function");
  }

  if (arguments.length > 1) {
    v = arguments[1];
  }

  ar = new Array(len);

  r = 0;

  while (r < len) {
    var kv, mappedValue;

    if (r in O) {
      kv = O[r];

      mappedValue = callback.call(v, kv, r, O);
      ar[r] = mappedValue;
    }
    r++;
  }

  return ar;
};

Array.prototype.filter = function (func, thisArg) {
  "use strict";
  if (!((typeof func === "Function" || typeof func === "function") && this))
    throw new TypeError();

  var size = this.length >>> 0,
    res = new Array(size),
    t = this,
    c = 0,
    i = -1;

  var kv;
  if (thisArg === undefined) {
    while (++i !== size) {
      if (i in this) {
        kv = t[i];
        if (func(t[i], i, t)) {
          res[c++] = kv;
        }
      }
    }
  } else {
    while (++i !== size) {
      if (i in this) {
        kv = t[i];
        if (func.call(thisArg, t[i], i, t)) {
          res[c++] = kv;
        }
      }
    }
  }

  res.length = c;
  return res;
};

Object.defineProperty(Array.prototype, "reduce", {
  value: function (callback) {
    if (this === null) {
      throw new TypeError("Array.prototype.reduce " + "undefined/null");
    }
    if (typeof callback !== "function") {
      throw new TypeError(callback + " must be function");
    }

    var o = Object(this);

    var len = o.length >>> 0;

    var k = 0;
    var value;

    if (arguments.length >= 2) {
      value = arguments[1];
    } else {
      while (k < len && !(k in o)) {
        k++;
      }

      if (k >= len) {
        throw new TypeError("with no inital value ");
      }
      value = o[k++];
    }

    while (k < len) {
      if (k in o) {
        value = callback(value, o[k], k, o);
      }

      k++;
    }

    return value;
  },
});
