import React from "react";
import Alert from "../ui/Alert";

export class QueryErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
  }

  render() {
    if (this.state.hasError) {
      return (
        <Alert message={'Something went wrong with data loading.'} onClick={window.location.reload()} />
      );
    }

    return this.props.children;
  }
}
