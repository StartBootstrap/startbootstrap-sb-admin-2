/*
 * lzwCompress.js
 *
 * Copyright (c) 2012-2016 floydpink
 * Licensed under the MIT license.
 *
 * The MIT License (MIT)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

'use strict';

(function () {
  var root = this;

  var lzwCompress = (function (Array, JSON, undefined) {
    var _self = {},
        _lzwLoggingEnabled = false,
        _lzwLog = function (message) {
          try {
            console.log('lzwCompress: ' +
              (new Date()).toISOString() + ' : ' + (typeof(message) === 'object' ? JSON.stringify(message) : message));
          } catch (e) {
          }
        };

    // KeyOptimize
    // http://stackoverflow.com/questions/4433402/replace-keys-json-in-javascript
    (function (self, Array, JSON) {

      var _keys = [],
          comparer = function (key) {
            return function (e) {
              return e === key;
            };
          },
          inArray = function (array,comparer) {
            for (var i = 0; i < array.length; i++) {
              if (comparer(array[i])) {
                return true;
              }
            }
            return false;
          },
          pushNew = function (array,element, comparer) {
            if (!inArray(array,comparer)) {
              array.push(element);
            }
          },
          _extractKeys = function (obj) {
            if (typeof obj === 'object') {
              for (var key in obj) {
                if (!Array.isArray(obj)) {
                  pushNew(_keys,key, comparer(key));
                }
                _extractKeys(obj[key]);
              }
            }
          },
          _encode = function (obj) {
            if (typeof obj !== 'object') {
              return obj;
            }
            for (var prop in obj) {
              if (!Array.isArray(obj)) {
                if (obj.hasOwnProperty(prop)) {
                  obj[_keys.indexOf(prop)] = _encode(obj[prop]);
                  delete obj[prop];
                }
              } else {
                obj[prop] = _encode(obj[prop]);
              }
            }
            return obj;
          },
          _decode = function (obj) {
            if (typeof obj !== 'object') {
              return obj;
            }
            for (var prop in obj) {
              if (!Array.isArray(obj)) {
                if (obj.hasOwnProperty(prop) && _keys[prop]) {
                  obj[_keys[prop]] = _decode(obj[prop]);
                  delete obj[prop];
                }
              } else {
                obj[prop] = _decode(obj[prop]);
              }
            }
            return obj;
          },
          compress = function (json) {
            _keys = [];
            var jsonObj = JSON.parse(json);
            _extractKeys(jsonObj);
            _lzwLoggingEnabled && _lzwLog('keys length : ' + _keys.length);
            _lzwLoggingEnabled && _lzwLog('keys        : ' + _keys);
            return JSON.stringify({ __k : _keys, __v : _encode(jsonObj) });
          },
          decompress = function (minifiedJson) {
            var obj = minifiedJson;
            if (typeof(obj) !== 'object') {
              return minifiedJson;
            }
            if (!obj.hasOwnProperty('__k')) {
              return JSON.stringify(obj);
            }
            _keys = obj.__k;
            return _decode(obj.__v);
          };

      self.KeyOptimize = {
        pack   : compress,
        unpack : decompress
      };
    }(_self, Array, JSON));

    // LZWCompress
    // http://stackoverflow.com/a/2252533/218882
    // http://rosettacode.org/wiki/LZW_compression#JavaScript
    (function (self, Array) {
      var compress = function (uncompressed) {
            if (typeof(uncompressed) !== 'string') {
              return uncompressed;
            }
            var i,
                dictionary = {},
                c,
                wc,
                w = '',
                result = [],
                dictSize = 256;
            for (i = 0; i < 256; i += 1) {
              dictionary[String.fromCharCode(i)] = i;
            }
            for (i = 0; i < uncompressed.length; i += 1) {
              c = uncompressed.charAt(i);
              wc = w + c;
              if (dictionary[wc]) {
                w = wc;
              } else {
                if (dictionary[w] === undefined) {
                  return uncompressed;
                }
                result.push(dictionary[w]);
                dictionary[wc] = dictSize++;
                w = String(c);
              }
            }
            if (w !== '') {
              result.push(dictionary[w]);
            }
            return result;
          },
          decompress = function (compressed) {
            if (!Array.isArray(compressed)) {
              return compressed;
            }
            var i,
                dictionary = [],
                w,
                result,
                k,
                entry = '',
                dictSize = 256;
            for (i = 0; i < 256; i += 1) {
              dictionary[i] = String.fromCharCode(i);
            }
            w = String.fromCharCode(compressed[0]);
            result = w;
            for (i = 1; i < compressed.length; i += 1) {
              k = compressed[i];
              if (dictionary[k]) {
                entry = dictionary[k];
              } else {
                if (k === dictSize) {
                  entry = w + w.charAt(0);
                } else {
                  return null;
                }
              }
              result += entry;
              dictionary[dictSize++] = w + entry.charAt(0);
              w = entry;
            }
            return result;
          };

      self.LZWCompress = {
        pack   : compress,
        unpack : decompress
      };
    }(_self, Array));

    var _compress = function (obj) {
          _lzwLoggingEnabled && _lzwLog('original (uncompressed) : ' + obj);
          if (!obj || obj === true || obj instanceof Date) {
            return obj;
          }
          var result = obj;
          if (typeof obj === 'object') {
            result = _self.KeyOptimize.pack(JSON.stringify(obj));
            _lzwLoggingEnabled && _lzwLog('key optimized: ' + result);
          }
          var packedObj = _self.LZWCompress.pack(result);
          _lzwLoggingEnabled && _lzwLog('packed   (compressed)   : ' + packedObj);
          return packedObj;
        },
        _decompress = function (compressedObj) {
          _lzwLoggingEnabled && _lzwLog('original (compressed)   : ' + compressedObj);
          if (!compressedObj || compressedObj === true || compressedObj instanceof Date) {
            return compressedObj;
          }
          var probableJSON, result = _self.LZWCompress.unpack(compressedObj);
          try {
            probableJSON = JSON.parse(result);
          } catch (e) {
            _lzwLoggingEnabled && _lzwLog('unpacked (uncompressed) : ' + result);
            return result;
          }
          if (typeof probableJSON === 'object') {
            result = _self.KeyOptimize.unpack(probableJSON);
          }
          _lzwLoggingEnabled && _lzwLog('unpacked (uncompressed) : ' + result);
          return result;
        },
        _enableLogging = function (enable) {
          _lzwLoggingEnabled = enable;
        };

    return {
      pack          : _compress,
      unpack        : _decompress,
      enableLogging : _enableLogging
    };

  })(Array, JSON);

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = lzwCompress;
  }
  else {
    root.lzwCompress = lzwCompress;
  }

}).call(this);
