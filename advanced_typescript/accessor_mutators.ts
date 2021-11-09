class Thing {
  _size = 0;
 
  get size(): number {
    return this._size;
  }
 
  set size(value: string | number | boolean) {
    let num = Number(value);
 
    // Don't allow NaN, Infinity, etc
 
    if (!Number.isFinite(num)) {
      this._size = 0;
      return;
    }
 
    this._size = num;
  }
}

class Person {

  firstName;
  lastName;

  constructor(fn:string, ln:string) {

    this.firstName = fn;
    this.lastName = ln;
  }

//using this we cannot mutate the class property fullName
  get fullName() {

    return this.firstName + " " + this.lastName;
  }
}

let p1 = new Person("John", "Doe");
console.log(p1.fullName);


class Person2 {

  firstName;
  lastName;

  constructor(fn:string, ln:string) {

    this.firstName = fn;
    this.lastName = ln;
  }

  get fullName() {

    return this.firstName + " " + this.lastName;
  }

  set setLastName(newLastName) {

    this.lastName = newLastName;
  }
}

let p2 = new Person2("John", "Doe");

// mutate class property
p2.setLastName = "Porter";

console.log(p2.fullName);

