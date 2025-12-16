import React from "react";
type providerProps = {
  children: React.ReactNode;
};
function Provider({ children }: providerProps) {
  return <div>{children}</div>;
}

export default Provider;
