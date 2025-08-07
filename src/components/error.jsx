import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";

const Text = styled(Typography)(({ theme }) => ({
    backgroundColor: theme.palette.error.light,
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.error.contrastText,
    width: "60%",
    margin: "auto",
}));

function ErrorMessage({ message }) {
    return (
        <Text
            color="error"
            variant="h6"
            align="center"

        >
            Oops! {message || "An unexpected error occurred."}
        </Text>
    );
}

export default ErrorMessage;