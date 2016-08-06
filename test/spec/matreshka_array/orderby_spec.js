/* eslint-disable import/no-unresolved */
import MatreshkaArray from 'src/array';

describe('Matreshka.Array orderBy method', () => {
    const objects = [
       { 'a': 'x', 'b': 3 },
       { 'a': 'y', 'b': 4 },
       { 'a': 'x', 'b': 1 },
       { 'a': 'y', 'b': 2 }
   ];

   xit('should sort by a single property by a specified order', () => {
       const arr = new MatreshkaArray(...objects).

       expect(
           arr.orderBy('a', 'desc').toArray()
       ).toEqual([
           objects[1],
           objects[3],
           objects[0],
           objects[2]
       ]);
   });

   xit('should sort by multiple properties by specified orders', () => {
       let actual = new MK.Array().recreate(objects).orderBy(['a', 'b'], ['desc', 'asc']).toArray();
       expect(actual).toEqual([objects[3], objects[1], objects[2], objects[0]]);
   });

   xit('should sort by a property in ascending order when its order is not specified', () => {
       let falsey = [, '', 0, false, NaN, null, undefined],

           expected = [objects[2], objects[0], objects[3], objects[1]],
           actual = new MK.Array().recreate(objects).orderBy(['a', 'b']).toArray();

       expect(actual).toEqual(expected);

       falsey.forEach(function(order, index) {
           actual = new MK.Array().recreate(objects).orderBy(['a', 'b'], index ? ['desc', order] : ['desc']).toArray();
           expected = [objects[3], objects[1], objects[2], objects[0]];
           expect(actual).toEqual(expected);
       });

   });

   xit('should work with `orders` specified as string objects', () => {
       let actual = new MK.Array().recreate(objects).orderBy(['a'], [Object('desc')]).toArray();
       expect(actual).toEqual([objects[1], objects[3], objects[0], objects[2]]);
   });


});
