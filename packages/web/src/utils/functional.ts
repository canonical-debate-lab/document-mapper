export const pipe = (...fns: { (str: any): any; (str: any): any }[]) => (
  x: any
) => fns.reduce((v, f) => f(v), x);

export const resolve = p => p.then(r => [null, r]).catch(e => [e]);

export const compose = (...fns: any[]) => (x: any) =>
  fns.reduceRight((v, f) => f(v), x);

export const trimStr = (str: { trim: () => void }) => str.trim();

export const replaceSpace = (str: {
  replace: (arg0: RegExp, arg1: string) => void;
}) => str.replace(/ /g, "+");

export const cleanQueryParam = pipe(
  trimStr,
  replaceSpace
);
