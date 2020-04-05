import React from "react";
import styled from "styled-components";

import logo from "../logo.svg";

const Wrapper = styled.a.attrs({
  className: "navbar-brand"
})``;

export default function Logo() {
  return (
    <Wrapper href="https://sambarros.com">
      <img src={logo} alt="sambarros.com" width="50" height="50" />
    </Wrapper>
  );
}
