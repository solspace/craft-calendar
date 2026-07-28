import { Flex } from "@cal/styles/components";
import styled from "styled-components";

export const PopoverCreateEventWrapper = styled.div`
  padding: 15px;

  hr {
    margin: 15px 0;
  }
`;

export const FlexTitle = styled(Flex)`
  align-items: center;

  padding-bottom: 15px;

  .field {
    flex: 1;
  }

  input.text {
    width: 100%;
  }
`;

export const Fields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  .field {
    margin-block: 0;
  }

  hr {
    margin: 3px 0;
  }
`;

export const AllDayRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const AllDayLabel = styled.label`
  font-weight: 600;
  cursor: pointer;
`;
