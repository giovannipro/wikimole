numbers = new Array("1","2","3","4","5","6"); 
letters = new Array("a","b","c","d","e","f"); 

var object1 = {
  banana: 200,
  durian: 100
};
var object2 = {
  banana: 100,
  cherry: 97
};
var object3 = [
  {title: "1"},
  {apple: 0,
    banana: 100,
    cherry: 97
  }
];

var merge1 = $.extend( true, object1, object2 );
var merge2 = $.merge( $.merge( object1,[] ), object2 );

myar = [];
myob = [];

function mapAr(a) {
  $.map(a, function (v) {
    myar.push(v + '.');
  });
}

function mapObj(o) {
  $.map(o, function (k,v) {
    myob.push(v + '.' + k);
  });
}

//merging two objects into new object
var new_object = $.extend({}, object3, object4);
//merge object2 into object1
var merged = $.extend(object3, object4);

console.log(new_object);
console.log(merged);


var res = object1.concat(object2); 
console.log(res);





mapAr(numbers);
mapAr(letters);

mapObj(object1);
mapObj(object2);

console.log(myar);
console.log(myob);

$('#one').html(myar);
$('#two').append(myob);

/*
Page transitions
http://alvarotrigo.com/fullPage/#secondPage/3
http://tympanus.net/Development/PageTransitions/#
*/