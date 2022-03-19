import { toast } from "react-toastify";
import { ERROR_NOTIFY_CONFIG } from "../common/constants";

/**
 * Handler for errors
 * Notify the user via the UI which error occured
 * Log the error to the remote (TODO)
 * @param userErrorMessage
 * @param error
 */
export const handleError = (userErrorMessage: string, error: any) => {
  toast.error(userErrorMessage, {
    ...ERROR_NOTIFY_CONFIG,
  });
  console.error(error);
};
