describe('Test equal : compare all primitive value', function () {
    'use strict';

    it('Test number', function (done) {
        done(ae.equalAll(11, 11));
    });

    it('Test string', function (done) {
        done(ae.equalAll("11", '11'));
    });

    it('Test boolean', function (done) {
        done(ae.equalAll(true, true));
    });

    it('Test null', function (done) {
        done(ae.equalAll(null, null));
    });

    it('Test undefined', function (done) {
        done(ae.equalAll(undefined, undefined));
    });
});