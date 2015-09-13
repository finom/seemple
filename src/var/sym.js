define(['matreshka_dir/util/common'], function(util) {
    return typeof Symbol == 'undefined' ? 'mk-' + util.randomString() : Symbol('matreshka');
});
