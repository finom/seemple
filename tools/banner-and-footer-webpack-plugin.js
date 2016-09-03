const ConcatSource = require('webpack-core/lib/ConcatSource');

const banner = '/* Matreshka 2 */\n\n';

// a hack to make 2nd global variable
const footer = 'if(typeof Matreshka === "function") this.MK = Matreshka;';

class BannerAndFooterWebpackPlugin {
    apply(compiler) {
        compiler.plugin('compilation', compilation => {
            compilation.plugin('optimize-chunk-assets', (chunks, callback) => {
                Object.keys(compilation.assets).forEach(file => {
                    const newSource = new ConcatSource(banner, compilation.assets[file], footer);
                    compilation.assets[file] = newSource;
                });

                callback();
            });
        });
    }
}

module.exports = BannerAndFooterWebpackPlugin;
