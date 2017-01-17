(function () {
    var root = this;
    root["ae"] = (function () {

        const PRIMITIVE_VALUES = [
            "[object Null]",
            "[object Undefined]",
            "[object String]",
            "[object Number]",
            "[object Boolean]"
        ];
        const LOG_MESSAGE = {
            "LESS": "The length of the arguments cannot be less than 2.",
            "LENGTH": "Lengths do not match.",
            "CLASS": "The classes do not match.",
            "KEY": "The Keys do not match."
        };

        var log = function (msg) {
            console.log(msg);
        };
        var error = function (msg) {
            throw new Error(msg);
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

        /*var isEq = function (a, b) {
            // 클래스를 비교 후 클래스 문자열 저장
            var classString = toString(a);
            if (classString !== toString(b)) { return false; } // return LOG_MESSAGE.CLASS

            // 비교 값들이 원시 값일 경우 비교 후 찬반형 값 반환
            if (PRIMITIVE_VALUES.indexOf(classString) > -1) { return a === b; }

            // 원시 값이 아닌 다른 클래스를 가질 경우 오브젝트 키 길이를 비교 (배열, 오브젝트)
            var keyLength = keys(a).length;
            if (keyLength !== keys(b).length) { return false; } // return LOG_MESSAGE.LENGTH

            // R E C U R S I V E
            // 비교 값이 배열일 경우
            if (classString === "[object Array]") {
                while(keyLength--) {
                    if (!isEq(a[keyLength], b[keyLength])) { return false; }
                }
            // 비교 값이 배열 외의 오브젝트일 경우
            } else { // "[object Object]"
                while(keyLength--) {
                    var key = keys(a)[keyLength];
                    if (!b.hasOwnProperty(key) && ) { return false; }
                }
            }
            return true;
        };*/

        function isEqualAll(a, b) {
            return isEq(a, b);
        }

        /**
         * 원시 값 비교 (string, number, boolean, null, undefined)
         * 넘어온 인자의 모든 값을 비교, 인자가 2개 미만일 때, false 반환
         * @returns {Boolean}
         */
        function equalAll() {
            if (arguments.length < 2) {
                log(LOG_MESSAGE.LESS); // 구글 번역기 POWER!
                return false;
            } else {
                var rtn = 0;
                var arr = [].slice.call(arguments);
                var len = arr.length;

                while (--len) { // arr.length - 1 만큼 비교
                    // TODO: Compare object
                    if (!isPrimitive[arr[len]] && !isPrimitive[arr[len - 1]]) {
                        if (JSON.stringify(arr[len]) !== JSON.stringify(arr[len - 1])) rtn++;
                    } else {
                        if (arr[len] != arr[len - 1]) rtn++;
                    }
                }
                return !rtn;
            }
        }

        /**
         * 원시 값 비교 (string, number, boolean, null, undefined)
         * 넘어온 인자의 모든 값을 비교, 인자가 2개 미만일 때, LESS_MESSAGE 반환
         * 비교 대상을 첫 번째 인자로 설정!
         * @returns {String}
         */
        function equalAllRtnMsg() {
            if (arguments.length < 2) {
                return LOG_MESSAGE.LESS;
            } else {
                var rtn = [];
                var arr = [].slice.call(arguments);
                var len = arr.length;

                while (--len) { // arr.length - 1 만큼 비교
                    if (arr[0] !== arr[arr.length - len]) rtn.push("arg[" + (arr.length - len) + "]");
                }
                return rtn.join(', ') ? rtn.join(', ') + " do not match " + arr[0] : "";
            }
        }

        return {
            isEqualAll: isEqualAll,
            equalAll: equalAllRtnMsg
        };
    })(); // end IIFE ae
}).call(this);
