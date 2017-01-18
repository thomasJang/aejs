(function () {
    var root = this;
    root["ae"] = (function () {
        // TODO: symbol(???)
        const PRIMITIVE_VALUES = [
            "[object Null]",
            "[object Undefined]",
            "[object String]",
            "[object Number]",
            "[object Boolean]"
        ];
        const RETURN_MESSAGES = {
            "LENGTH"    : "The key lengths do not match.",
            "CLASS"     : "The classes do not match.",
            "VALUE"     : {
                "PRIMITIVE" : "The primitive values do not match",
                "ARRAY"     : "The Array values do not match",
                "OBJECT"    : "The Object values do not match"
            }
        };
        var log = function (msg) {
            console.log(msg);
        };
        var error = function (msg) {
            throw Error(msg);
        };
        var toString = function (obj) {
            return ({}).toString.call(obj);
        };
        var toArray = function (arg) {
            return [].slice.call(arg);
        };
        var keys = function (obj) {
            return Object.keys(obj);
        };
        var values = function (obj) {
            return keys(obj).map(function (k) {
                return obj[k];
            });
        };
        var isPrimitive = function (obj) {
            return PRIMITIVE_VALUES.indexOf(toString(obj)) > -1;
        };
        var isArray = function (obj) {
            return toString(obj) === "[object Array]";
        };
        var isObject = function (obj) {
            return toString(obj) === "[object Object]";
        };
        var passMessage = function(que, msg){
            que.push(msg);
            return que[0]; // 맨 처음의 에러 메시지를 출력
        };
        var isEqual = function (a, b) {
            // 클래스를 비교, 클래스 문자열 저장
            var str = toString(a);
            if (str !== toString(b)) {
                return false;
            } // log(LOG_MESSAGE.CLASS)

            // 비교 값들이 원시 값일 경우 비교 후 결과 반환
            if (PRIMITIVE_VALUES.indexOf(str) > -1) return a === b;

            // 원시 값이 아닌 다른 클래스를 가질 경우 오브젝트 키 길이를 비교 (Array, Object)
            var len = keys(a).length;
            if (len !== keys(b).length) return false; // log(LOG_MESSAGE.LENGTH)

            // 비교 값이 배열일 경우
            if (str === "[object Array]") {
                while (len--) {
                    if (!isEqual(a[len], b[len])) return false;
                }
                // 비교 값이 배열 외의 오브젝트일 경우 "[object Object]"
            } else {
                while (len--) {
                    var key = keys(a)[len];
                    if (!(b.hasOwnProperty(key) && isEqual(a[key], b[key]))) return false;
                }
            }
            return true;
        };
        var equal = function (a, b, que) {
            que = que || [];
            // 클래스를 비교, 클래스 문자열 저장
            var str = toString(a);
            if (str !== toString(b)) return passMessage(que, RETURN_MESSAGES.CLASS);

            // 비교 값들이 원시 값일 경우 비교 후 결과 반환
            if (PRIMITIVE_VALUES.indexOf(str) > -1) return a === b ? "" : passMessage(que, RETURN_MESSAGES.VALUE.PRIMITIVE);

            // 원시 값이 아닌 다른 클래스를 가질 경우 오브젝트 키 길이를 비교 (Array, Object)
            var len = keys(a).length;
            if (len !== keys(b).length) return passMessage(que, RETURN_MESSAGES.LENGTH);

            // 비교 값이 배열일 경우
            if (str === "[object Array]") {
                while (len--) {
                    if (equal(a[len], b[len], que)) return passMessage(que, RETURN_MESSAGES.VALUE.ARRAY);
                }
                // 비교 값이 배열 외의 오브젝트일 경우 "[object Object]"
            } else {
                while (len--) {
                    var key = keys(a)[len];
                    if (!(b.hasOwnProperty(key) && !equal(a[key], b[key], que))) return passMessage(que, RETURN_MESSAGES.VALUE.OBJECT);
                }
            }
            return "";
        };

        function isEqualAll() {
            var arr = toArray(arguments);
            var len = arr.length;

            while (--len) {
                if (!isEqual(arr[len], arr[len - 1])) return false;
            }
            return true;
        }
        function equalAll() {
            var arr = toArray(arguments);
            var len = arr.length;
            var msg = "";

            while (--len) {
                if (msg = equal(arr[len], arr[len - 1])) return msg;
            }

            return msg;
        }

        return {
            isEqualAll: isEqualAll, // @returns {Boolean}
            equalAll: equalAll      // @returns {String}
        };
    })(); // end IIFE ae
}).call(this);
