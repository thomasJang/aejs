describe('Test equal : compare all primitive value', function(){
    'use strict';

    it('Test number', function(done){
        if ($.aeei.equal(11, 11) && !$.aeei.equal(11, 21)) {
            done();
        } else {
            throw Error('Error : Test number');
        }
    });

    it('Test string', function(done){
        if ($.aeei.equal("11", '11') && !$.aeei.equal("11", "1 1")) {
            done();
        } else {
            throw Error('Error : Test string');
        }
    });

    it('Test boolean', function(done){
        if ($.aeei.equal(true, true) && !$.aeei.equal(true, false)) {
            done();
        } else {
            throw Error('Error : Test boolean');
        }
    });

    it('Test null', function(done){
        if ($.aeei.equal(null, null) && !$.aeei.equal(null, 'null')) {
            done();
        } else {
            throw Error('Error : Test null');
        }
    });

    it('Test undefined', function(done){
        if ($.aeei.equal(undefined, undefined) && !$.aeei.equal(undefined, 'undefined')) {
            done();
        } else {
            throw Error('Error : Test undefined');
        }
    });
});