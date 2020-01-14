/* eslint-disable import/no-extraneous-dependencies, import/extensions */
import Class from 'src/class';
import SeempleArray from 'src/array';
import SeempleObject from 'src/object';

describe('Seemple.Array Model', () => {
    it('can use Model and Model gets correct arguments', (done) => {
        const item = {};

        const Model = Class({
            constructor(data, parent, index) {
                expect(data === item).toBeTruthy();
                expect(index).toEqual(0);
                setTimeout(() => {
                    expect(parent === arr).toBeTruthy(); // eslint-disable-line no-use-before-define
                    done();
                });
            }
        });

        const SeempleArrayChild = Class({
            extends: SeempleArray,
            get Model() {
                return Model;
            },
            constructor() {
                this.push(item);
            }
        });

        const arr = new SeempleArrayChild();

        expect(arr[0] instanceof Model).toBeTruthy();
    });

    it('allows to change Model dynamically', () => {
        const item = {};
        const arr = new Class({
            extends: SeempleArray,

            constructor() {
                this.push({});
            }
        });

        expect(arr[0]).toEqual(item);

        arr.Model = SeempleObject;

        expect(arr[0] instanceof SeempleObject).toBeTruthy();
    });

    it('throws error if Model has wront type', () => {
        expect(() => new Class({
            extends: SeempleArray,
            Model: undefined,
            constructor() {
                this.push({});
            }
        })).toThrow();

        expect(() => new Class({
            extends: SeempleArray,
            Model: {},
            constructor() {
                this.push({});
            }
        })).toThrow();
    });
});
