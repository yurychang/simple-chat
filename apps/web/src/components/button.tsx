export function Button({ className, ...props }: any) {
  return (
    <button
      className={
        'px-3 ml-5 leading-7 text-white rounded cursor-pointer bg-neutral-400 ' +
        className
      }
      {...props}
    />
  );
}
