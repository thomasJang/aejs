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
             * 넘어온 인자의 모든 값을 비교(동등연산자 "==" 사용) 인자가 2개 미만일 때, false 반환
             * @returns {Boolean}
             */
            function equal() {
                if (arguments.length < 2) {
                    log("The length of the arguments cannot be less than 2."); // 구글 번역기 POWER!
                    return false;
                } else {
                    var rtn = 0;

                    [].reduce.call(arguments, function (a, b) {
                        if (a != b) rtn++;
                        return b;
                    });

                    return !rtn;
                }
            }

            /**
             * 넘어온 인자의 모든 값을 비교(일치연산자 "===" 사용) 인자가 2개 미만일 때, false 반환
             * @returns {Boolean}
             */
            function same() {
                if (arguments.length < 2) {
                    log("The length of the arguments cannot be less than 2."); // 구글 번역기 POWER!
                    return false;
                } else {
                    var rtn = 0;

                    [].reduce.call(arguments, function (a, b) {
                        if (a !== b) rtn++;
                        return b;
                    });

                    return !rtn;
                }
            }

            return {
                log: log,
                equal: equal,
                same: same
            };
        })() // close IIFE
    }); // close $.extend
})(jQuery);
