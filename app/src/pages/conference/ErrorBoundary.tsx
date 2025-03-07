import React from 'react';

interface Props {
  children: React.ReactNode
}

interface State {
  hasError: boolean
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.log(error, errorInfo.componentStack)
  }

  render() {
    if(this.state.hasError) {
      return <h1>something went wrong.</h1>
    }

    return this.props.children;
  }
}

export default ErrorBoundary;