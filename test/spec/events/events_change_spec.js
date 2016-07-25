/* eslint-disable import/no-unresolved */
import addListener from 'src/_events/addlistener';
import delegateListener from 'src/_events/delegatelistener';
import undelegateListener from 'src/_events/undelegatelistener';
import removeListener from 'src/_events/removelistener';
import makeObject from '../../lib/makeobject';
import createSpy from '../../lib/createspy';

describe('Change event (simple and delegated)', () => {
    let handler;

    beforeEach(() => {
        handler = createSpy();
    });

    it('fires simple', () => {
        const obj = { x: 1 };

        addListener(obj, 'change:x', handler);
        obj.x = 2;
        expect(handler).toHaveBeenCalled();
    });

    it('fires (delegated, a.x)', () => {
        const obj = makeObject('a.x', 1);

        delegateListener(obj, 'a', 'change:x', handler);
        obj.a.x = 2;
        expect(handler).toHaveBeenCalled();
    });

    it('fires (delegated, a.b.x)', () => {
        const obj = makeObject('a.b.x', 1);

        delegateListener(obj, 'a.b', 'change:x', handler);
        obj.a.b.x = 2;
        expect(handler).toHaveBeenCalled();
    });

    it('removes simple', () => {
        const obj = { x: 1 };

        addListener(obj, 'change:x', handler);
        removeListener(obj, 'change:x', handler);
        obj.x = 2;
        expect(handler).not.toHaveBeenCalled();
    });

    it('removes (delegated, a.x)', () => {
        const obj = makeObject('a.x', 1);

        delegateListener(obj, 'a', 'change:x', handler);
        undelegateListener(obj, 'a', 'change:x', handler);
        obj.a.x = 2;
        expect(handler).not.toHaveBeenCalled();
    });

    it('removes (delegated, a.b.x)', () => {
        const obj = makeObject('a.b.x', 1);

        delegateListener(obj, 'a.b', 'change:x', handler);
        undelegateListener(obj, 'a.b', 'change:x', handler);
        obj.a.b.x = 2;
        expect(handler).not.toHaveBeenCalled();
    });

    /*eslint-disable */
    xit('fires (delegated, a.b.x)', () => {
        const obj = makeObject('a.b.x', 1);

        delegateListener(obj, 'a.b', 'change:x', handler);
        obj.a.b.x = 2;
        expect(handler).toHaveBeenCalled();
    });


    xit('fires when delegated target is reassigned (a.b.c.x, reassign a)', () => {
        const obj = makeObject('a.b.c.x', 1);

        delegateListener(obj, 'a.b.c', 'change:x', handler);
        obj.a = makeObject('b.c.x', 2);
        expect(handler).toHaveBeenCalled();
    });

    xit('fires when delegated target is reassigned (a.b.c.x, reassign b)', () => {
        let obj = {
                a: {
                    b: {
                        c: {
                            x: 1
                        }
                    }
                }
            },
            bool = false;

        magic._delegateListener(obj, 'a.b.c', 'change:x', evt => bool = true);
        obj.a.b = {
            c: {
                x: 2
            }
        };

        expect(bool).toBe(true);
    });

    xit('fires when delegated target is reassigned (a.b.c.x, reassign c)', () => {
        let obj = {
                a: {
                    b: {
                        c: {
                            x: 1
                        }
                    }
                }
            },
            bool = false;

        magic._delegateListener(obj, 'a.b.c', 'change:x', evt => bool = true);
        obj.a.b.c = {
            x: 2
        };

        expect(bool).toBe(true);
    });

    xit('avoids conflicts', () => {
        let obj = {
                a: {
                    b: {
                        c: {
                            x: 1
                        }
                    }
                }
            },
            i = 0;

        magic._delegateListener(obj, 'a', 'change:b', evt => i += 1e11);
        magic._delegateListener(obj, 'a.b', 'change:c', evt => i += 1e10);
        magic._delegateListener(obj, 'a.b', 'change:c', evt => i += 1e9);
        magic._delegateListener(obj, 'a.b', 'change:c', evt => i += 1e8);
        magic._delegateListener(obj, 'a.b.c', 'change:x', evt => i += 1e7);
        magic._delegateListener(obj, 'a.b.c', 'change:x', evt => i += 1e6);
        magic._delegateListener(obj, 'a.b.c', 'change:x', evt => i += 1e5);
        magic._delegateListener(obj, 'a', 'change:b', evt => i += 1e4);
        magic._delegateListener(obj, 'a', 'change:b', evt => i += 1e3);
        magic._delegateListener(obj, 'a', 'change:b', evt => i += 1e2);
        magic._delegateListener(obj, 'a', 'change:b', evt => i += 1e1);
        magic._delegateListener(obj, 'a', 'change:b', evt => i += 1e0);
        obj.a = {
            b: {
                c: {
                    x: 2
                }
            }
        };
        expect(i).toEqual(111111111111);
    });

    xit('accepts null target (a.b.c, reassign b)', () => {
        let obj = {
                a: {
                    b: {
                        c: {
                            x: 1
                        }
                    }
                }
            },
            bool = false;

        magic._delegateListener(obj, 'a.b.c', 'someevent', evt => bool = true);

        obj.a.b = null;

        expect(bool).toBe(false);
    });
    /*eslint-enable */
});
