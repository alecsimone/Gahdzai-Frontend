"use client";

import styled from "styled-components";
import { coolGrey, white } from "@/styles/constants/colors";
import { bigText } from "@/styles/constants/fontSizes";
import { setAlpha } from "@/styles/functions/modifyColorFunctions";

const StyledHeader = styled.header`
  border-bottom: 2px solid ${setAlpha(white, 0.1)};
  padding: 0.75rem;
  display: flex;
  align-items: center;
`;

export default StyledHeader;
