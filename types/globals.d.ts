//  CSS modules
declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}

// Declare other asset types like images if you import them
declare module "*.png" {
  const value: string;
  export default value;
}

declare module "*.jpg" {
  const value: string;
  export default value;
}
