(function ($) {
    $.extend($, {
        aeei: (function () {
            /**
             * @param {String} msg
             */
            function log(msg) {
                console.log(msg);
            }
            /**
             * @param {*...} args
             * @returns {Array}
             */
            function toArray(args) {
                return [].slice.call(args);
            }
            /**
             * 원시 값 비교 (string, number, boolean, null, undefined)
             * 넘어온 인자의 모든 값을 비교, 인자가 2개 미만일 때, false 반환
             * @returns {Boolean}
             */
            function equal() {
                if (arguments.length < 2) {
                    log("The length of the arguments cannot be less than 2."); // 구글 번역기 POWER!
                    return false;
                } else {
                    var rtn = 0;
                    var arr = toArray(arguments);
                    var len = arr.length;

                    while (--len) {
                        // TODO: Compare object
                        if (arr[len] instanceof Object && arr[len - 1] instanceof Object) {
                            if (JSON.stringify(arr[len]) !== JSON.stringify(arr[len - 1])) rtn++;
                        } else {
                            if (arr[len] != arr[len - 1]) rtn++;
                        }
                    }

                    return !rtn;
                }
            }
            return {
                log: log,
                toArray: toArray,
                equal: equal
            };
        })() // close IIFE
    }); // close $.extend
})(jQuery);
