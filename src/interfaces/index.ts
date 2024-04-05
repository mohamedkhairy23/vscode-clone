export interface IFile {
  name: string;
  isFolder: boolean;
  children?: IFile[] | undefined;
  content?: string;
}

/** Recursion methods **/

// ** 5 => 5 * 4 * 3 * 2 * 1 ==> 125

function factorial(n: number): number {
  // ** Base case
  if (n <= 1) return 1;

  return n * factorial(n - 1);
}

console.log(factorial(5));
