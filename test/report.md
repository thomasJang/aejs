# Compare string
```js
// 170115
String("abc") === new String("abc")
false  

_.isEqual(String("abc"), new String("abc"))
true  

typeof String("abc")
"string"  

typeof new String("abc")
"object"  

$.aeei.equal(String("abc"), new String("abc"))
true
```