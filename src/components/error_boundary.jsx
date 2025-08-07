import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import React from "react";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <Container
          maxWidth="sm"
          sx={{
            mt: 6,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}>
          <Alert severity="error">
            <Typography variant="h6" gutterBottom>
              Oops! Something went wrong.
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              {this.state.error?.message}
            </Typography>
            <Button variant="contained" onClick={this.handleReset}>
              Reload
            </Button>
          </Alert>
        </Container>
      );
    }
    return this.props.children;
  }
}