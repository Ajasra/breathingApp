import { toast } from "react-toastify";

export const withToast = (promise) => {
  toast.promise(
    promise,
    {
      pending: {
        render() {
          return (
            <div>
              <p>Your transaction is being processed.</p>
              <p>Hang tight... Just few more moments.</p>
            </div>
          );
        },
        type: "info",
      },
      success: {
        render({ data }) {
          return (
            <div>
              Saved
            </div>
          );
        },
        // other options
        icon: "🟢",
      },
      error: {
        render({ data }) {
          // When the promise reject, data will contain the error
          return (
            <div>
              <p>Transaction has failed</p>
            </div>
          );
        },
      },
    },
    {
      closeButton: true,
      autoClose: 15000,
    }
  );
};
