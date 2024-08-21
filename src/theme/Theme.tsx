import React from "react";
import styled from "styled-components";

const ThemedDiv = styled.div`
  font-family: "Times New Roman", Times, serif;

  a {
    color: blue;
  }
`;

export default function Theme({ children }: { children: React.ReactNode }) {
  return <ThemedDiv>{children}</ThemedDiv>;
}
