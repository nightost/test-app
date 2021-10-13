interface LenghtWise {
  length: number;
}

export default function logginTd<T extends LenghtWise>(args:T):T{
  console.log(args.length)
  return args
}

function loggingIdentity<T>(arg: Array<T>): Array<T> {
  console.log(arg.length); // Array has a .length, so no more error
  return arg;
}
// 隐式
loggingIdentity(['asd'])
// 显式
loggingIdentity<Number>([1])

interface TestConstructor<T> {
  new(): T
}

function create<T>(c: TestConstructor<T>): T {
  return new c();
}
create(Number)
create<String>(String)