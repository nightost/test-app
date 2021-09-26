interface LenghtWise {
  length: number;
}

export default function logginTd<T extends LenghtWise>(args:T):T{
  console.log(args.length)
  return args
}