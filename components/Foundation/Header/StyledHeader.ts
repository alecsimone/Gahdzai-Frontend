"use client";

import styled from "styled-components";
import { coolGrey, white } from "@/styles/constants/colors";
import { bigText } from "@/styles/constants/fontSizes";
import { setAlpha } from "@/styles/functions/modifyColorFunctions";

const StyledHeader = styled.header`
  border-bottom: 2px solid ${setAlpha(white, 0.1)};
  padding: 0.75rem;
  display: flex;
  justify-content: flex-end;
  svg.defaultAvatar {
    height: ${bigText};
    opacity: 0.4;
    &:hover {
      opacity: 0.8;
    }
    rect {
      fill: none;
    }
    path,
    circle {
      fill: ${coolGrey};
    }
  }
`;

export default StyledHeader;
