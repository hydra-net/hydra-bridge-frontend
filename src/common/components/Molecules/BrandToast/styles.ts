import styled from "styled-components";
import { ToastContainer } from "react-toastify";
import { stakenetTheme as theme } from "../../../../shell/theme/stakenetTheme";

export const StyledToastContainer = styled(ToastContainer)`
  .toast {
    font-size: ${theme.paragraph.md};
    color: ${theme.colors.white};
    background-color: ${theme.colors.blue.darkest};
    border: 1px solid ${theme.colors.gray["medium-dark"]};
    border-radius: 0.8rem;
  }
`;

export const StyledUserNotifyToastContainer = styled(StyledToastContainer)`
    top: 3rem;
    right: 3rem;
    .Toastify {
      &__close-button {
        color: ${theme.colors.white};
        opacity: 0.8;
        &:hover {
          opacity: 1;
        }
        svg {
          height: 1.8rem;
          width: 1.8rem;
        }
      }
    }
  }
`;
