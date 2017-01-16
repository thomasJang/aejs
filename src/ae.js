(function () {
    var root = this;
    root["ae"] = (function () {
        /**
         * 기본 값, 원시 값
         * @type {[*]}
         */
        const PRIMITIVE_VALUES = ["[object String]", "[object Number]", "[object Boolean]", "[object Null]", "[object Undefined]"];
        /**
         * @type {string}
         */
        const LESS_MESSAGE = "The length of the arguments cannot be less than 2.";
        /**
         * console log
         * @param {String} msg
         */
        var log = function (msg) {
            console.log(msg);
        };
        /**
         * console log
         * @param {String} msg
         */
        var error = function (msg) {
            throw new Error(msg);
        };
        /**
         * detect object class
         * @param {Object} obj
         * @returns {String}
         */
        var toString = function (obj) {
            ({}).toString.call(obj);
        };
        var keys = function (obj) {
            Object.keys(obj);
        }
        /**
         * 객체의 클래스가 원시 값인지 찬반형 결과를 반환
         * @param obj
         * @returns {boolean}
         */
        var isPrimitive = function (obj) {
            return PRIMITIVE_VALUES.indexOf(toString(obj)) > -1;
        }
        var isArray = function (obj) {
            return toString(obj) === "[object Array]";
        }
        var isObject = function (obj) {
            return toString(obj) === "[object Object]";
        }

        /**
         * 원시 값 비교 (string, number, boolean, null, undefined)
         * 넘어온 인자의 모든 값을 비교, 인자가 2개 미만일 때, false 반환
         * @returns {Boolean}
         */
        function equalAll() {
            if (arguments.length < 2) {
                log(LESS_MESSAGE); // 구글 번역기 POWER!
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
                return LESS_MESSAGE;
            } else {
                var rtn = [];
                var arr = [].slice.call(arguments);
                var len = arr.length;

                while (--len) { // arr.length - 1 만큼 비교
                    if (arr[0] !== arr[arr.length - len]) rtn.push("arg[" + (arr.length - len) + "]");
                }
                return rtn.join(', ') ? rtn.join(', ') + " do not match " + arr[0] : "" ;
            }
        }
        return {
            equalAll: equalAllRtnMsg
        };
    })(); // end IIFE ae
}).call(this);