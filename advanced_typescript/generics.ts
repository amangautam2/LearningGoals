function indentify<Type>(arg: Type): Type {
	return arg;
}

let output1 = identify<string>("myString");
//here type of output will be string
// output1: string


let output2 = identify("myString");
//here type of output will also be string but set automatically by the compiler
// output2: string


fuction identity2<Type>(arg: Type): <Type> {
	console.log(arg.length);// this will give error as no length property exist on type 'Type'
	return arg;
}

fuction identity3<Type>(arg: Type[]): <Type[]> {
	console.log(arg.length);// this will work on array of Type
	return arg;
}

// function declaration with generic types
function identity4<Type>(arg: Type): Type {
  return arg;
}
 
let myIdentity: <Type>(arg: Type) => Type = identity4;

//we can also declare fuctions with different name for the generic type
function identity5<Type>(arg: Type): Type {
  return arg;
}
 
let myIdentity2: <Input>(arg: Input) => Input = identity5;



//using generics with interfaces
interface GenericIdentityFn {
  <Type>(arg: Type): Type;
}

function identity5<Type>(arg: Type): Type {
  return arg;
}

let myIdentity3: GenericIdentityFn = identity5;




//using generics in classes

class GenericNumber<NumType> {
  zeroValue: NumType;
  add: (x: NumType, y: NumType) => NumType;
}
 
let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) {
  return x + y;
};

//using a different type
let stringNumeric = new GenericNumber<string>();
stringNumeric.zeroValue = "";
stringNumeric.add = function (x, y) {
  return x + y;
};
 
console.log(stringNumeric.add(stringNumeric.zeroValue, "test"));




interface Lengthwise {
  length: number;
}
 
function loggingIdentity<Type extends Lengthwise>(arg: Type): Type {
  console.log(arg.length); // Now we know it has a .length property, so no more error
  return arg;
}

loggingIdentity(3); // will give error as it does not cover the interface Lengthwise properties

loggingIdentity({
	length: 10,
	value: 4
}); // we need to pass in values whose type has all the required properties



//using type parameters in generic constraints

function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key];
}
 
let x = { a: 1, b: 2, c: 3, d: 4 };
 
getProperty(x, "a");
getProperty(x, "m");// give error as argument of type '"m"' is not assignable to parameter of type '"a" | "b" | "c" | "d"'



//class example with generics types
// @strict: false
class BeeKeeper {
  hasMask: boolean = true;
}

class ZooKeeper {
  nametag: string = "Mikle";
}

class Animal {
  numLegs: number = 4;
}

class Bee extends Animal {
  keeper: BeeKeeper = new BeeKeeper();
}

class Lion extends Animal {
  keeper: ZooKeeper = new ZooKeeper();
}

function createInstance<A extends Animal>(c: new () => A): A {
  return new c();
}

createInstance(Lion).keeper.nametag;
createInstance(Bee).keeper.hasMask; 


