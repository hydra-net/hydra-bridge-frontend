import styled from "styled-components";
import { stakenetTheme as theme } from "../../../../shell/theme/stakenetTheme";
import { devicesUp } from "../../../../media";
export const StyledBridgeRoute = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
  width: 100%;

  @media only screen and ${devicesUp.sm} {
    align-items: center;
  }
`;

export const StyledBridgeRouteAmount = styled.div<{ rtl?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: ${theme.paragraph.md};
  color: ${theme.colors.white};
  min-width: 25%;
  max-width: 25%;

  .amount {
    &__number {
      word-break: break-word;
      flex-grow: 1;
    }

    &__icon {
      margin-bottom: ${theme.margin.sm};
      transform: scale(0.8);
    }
  }

  @media only screen and ${devicesUp.sm} {
    .amount {
      &__icon {
        margin-bottom: ${theme.margin.md};
        transform: scale(1);
      }
    }
  }

  @media only screen and ${devicesUp.md} {
    flex-direction: ${(props) => (props.rtl ? "row-reverse" : "row")};
    align-items: center;

    .amount {
      &__number {
        font-size: ${theme.paragraph.lg};
        text-align: ${(props) => (props.rtl ? "right" : "left")};
        letter-spacing: 0.1rem;
      }
      &__icon {
        margin: 0 ${(props) => (props.rtl ? 0 : theme.margin.md)} 0
          ${(props) => (props.rtl ? theme.margin.md : 0)};
      }
    }
  }
`;

export const StyledBridgeArrow = styled.div`
  text-align: center;
  margin-bottom: ${theme.margin.sm};
  min-width: 10%;
  max-width: 10%;

  .arrow__icon {
    transform: scale(0.8);
  }
  @media only screen and ${devicesUp.sm} {
    margin-bottom: ${theme.margin.md};

    .arrow__icon {
      transform: scale(1);
    }
  }
  @media only screen and ${devicesUp.md} {
    margin-bottom: 0;
  }
`;

export const StyledBridgeNetwork = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 30%;
  max-width: 30%;

  .network {
    &__name {
      font-size: ${theme.paragraph.md};
      color: ${theme.colors.white};
      margin: 0;
    }
    &__icon {
      transform: scale(0.8);
      margin-bottom: ${theme.margin.sm};
      text-align: center;
    }
  }

  @media only screen and ${devicesUp.sm} {
    .network {
      &__icon {
        margin-bottom: ${theme.margin.md};
        transform: scale(1);
      }
    }
  }

  @media only screen and ${devicesUp.md} {
    flex-direction: row;
    justify-content: center;
    .network {
      &__name {
        font-size: ${theme.paragraph.lg};
        letter-spacing: 0.1rem;
        font-weight: ${theme.fontWeight.semibold};
      }
      &__icon {
        margin: 0 ${theme.margin.md} 0 0;
      }
    }
  }
`;
