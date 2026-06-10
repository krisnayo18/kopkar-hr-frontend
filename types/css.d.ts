// declare module '*.css';
declare module '*.css' {
  const styles: { [className: string]: string };
  export default styles;
}
