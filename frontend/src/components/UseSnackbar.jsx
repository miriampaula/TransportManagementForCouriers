import { useSnackbar } from "notistack";

export const VariantType = {
  DEFAULT: "default",
  ERROR: "error",
  SUCCESS: "success",
  WARNING: "warning",
  INFO: "info",
};

const EnqueueSnackBar = () => {
  const { enqueueSnackbar } = useSnackbar();
  const enqueueSnackbarFunc = (message, variant) => {
    enqueueSnackbar(message, {
      variant: variant,
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
      autoHideDuration: 2000,
    });
  };
  return enqueueSnackbarFunc;
};

export default EnqueueSnackBar;
