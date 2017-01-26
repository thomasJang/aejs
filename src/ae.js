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
            "LENGTH": "Key length mismatch.",
            "CLASS": "Class type mismatch.",
            "VALUE": "Value mismatch."
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
        var isContains = function(obj, arr){
            return arr.indexOf(obj) > -1;
        }
        var isArray = function (obj) {
            return toString(obj) === "[object Array]";
        };
        var isObject = function (obj) {
            return toString(obj) === "[object Object]";
        };
        var enQ = function (a, b, Q) {
            Q.push(JSON.stringify(a) + ", " + JSON.stringify(b));
            console.log(Q[Q.length - 1]);
            return Q[0];
        };

        var isEqual = function (a, b) {
            var stackA = []; // 비교할 a값이 저장될 스택
            var stackB = []; // 비교할 b값이 저장될 스택
            var currA;  // stackA의 TOP
            var currB;  // stackB의 TOP

            stackA.push(a);
            stackB.push(b);

            while (stackA.length) {
                currA = stackA.pop();
                currB = stackB.pop();

                // 클래스 타입이 다를 경우 false 반환
                var str = toString(currA);
                if (str !== toString(currB)) return false;

                // 비교 값들이 원시 값일 경우 비교 후 결과 반환
                if (isContains(str, PRIMITIVE_VALUES)){
                    if (currA !== currB) return false;
                }
                // 원시 값이 아닌 다른 클래스를 가질 경우
                else {
                    // 오브젝트 키 길이를 비교 (Array, Object)
                    var len = keys(currA).length;
                    if (len !== keys(currB).length) {
                        return false;   // 키 길이가 다를 경우 false 반환
                    }
                    else {
                        // 비교 값이 배열일 경우
                        if (str === "[object Array]") {
                            while (len--) {
                                stackA.push(currA[len]);
                                stackB.push(currB[len]);
                            }
                        }// end isArray
                        // 비교 값이 배열 외의 오브젝트일 경우 "[object Object]"
                        else {
                            while (len--) {
                                var key = keys(currA)[len];
                                if (currB.hasOwnProperty(key)) {
                                    stackA.push(currA[key]);
                                    stackB.push(currB[key]);
                                }
                                else {
                                    return false;
                                }
                            }
                        }// end isObject
                    }// end else
                }
            }// end while

            stackA = null;
            stackB = null;
            currA = null;
            currB = null;
            return true;
        };

        var isEqualRecusive = function (a, b) {
            // 클래스를 비교, 클래스 문자열 저장
            var str = toString(a);
            if (str !== toString(b)) return false;

            // 비교 값들이 원시 값일 경우 비교 후 결과 반환
            if (isContains(str, PRIMITIVE_VALUES)) return a === b;

            // 원시 값이 아닌 다른 클래스를 가질 경우 오브젝트 키 길이를 비교 (Array, Object)
            var len = keys(a).length;
            if (len !== keys(b).length) return false;


            // 비교 값이 배열일 경우
            if (str === "[object Array]") {
                while (len--) {
                    if (!isEqualRecusive(a[len], b[len])) return false;
                }
                // 비교 값이 배열 외의 오브젝트일 경우 "[object Object]"
            } else {
                while (len--) {
                    var key = keys(a)[len];
                    if (!(b.hasOwnProperty(key) && isEqualRecusive(a[key], b[key]))) return false;
                }
            }
            return true;
        };

        var equal = function (a, b, Q) {
            Q = Q || [];
            // 클래스를 비교, 클래스 문자열 저장
            var str = toString(a);
            if (str !== toString(b)) return enQ(a, b, Q);

            // 비교 값들이 원시 값일 경우 비교 후 결과 반환
            if (isContains(str, PRIMITIVE_VALUES)) return a === b ? "" : enQ(a, b, Q);

            // 원시 값이 아닌 다른 클래스를 가질 경우 오브젝트 키 길이를 비교 (Array, Object)
            var len = keys(a).length;
            if (len !== keys(b).length) return enQ(a, b, Q);

            // 비교 값이 배열일 경우
            if (str === "[object Array]") {
                while (len--) {
                    if (equal(a[len], b[len], Q)) return enQ(a, b, Q);
                }
                // 비교 값이 배열 외의 오브젝트일 경우 "[object Object]"
            } else {
                while (len--) {
                    var key = keys(a)[len];
                    if (!(b.hasOwnProperty(key) && !equal(a[key], b[key], Q))) return enQ(a, b, Q);
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
