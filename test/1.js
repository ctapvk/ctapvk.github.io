
var str = '29-02-2017'; 
var re = /^(\d{2,2}-\d{2,2}-\d{4,4})$/i;
// var re = /^([1-31]-[1-12]-[1900-2020])$/i;
// var re = /^([1-31]-\d{2,2}-\d{4,4})$/i;

console.log(str.match(re));	