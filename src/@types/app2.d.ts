/// <reference types="react" />

// import { City } from "@src/store/types";
// https://stackoverflow.com/questions/39040108/import-class-in-definition-file-d-ts
type City = import('@src/store/types').City;

declare module "app2/Button" {
  const Button: React.ComponentType;

  export default Button;
}

declare module "app2/App" {
  const App: React.ComponentType<{city?: City} >;

  export default App;
}
