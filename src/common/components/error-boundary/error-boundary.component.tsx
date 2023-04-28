import React from 'react';
import { GeneralErrorPage } from '@pages/error/general-error/general-error.page';

interface IErrorBoundaryProp {
  children: React.ReactNode;
}

interface IErrorBoundaryState {
  error: Error | undefined;
}

class ErrorBoundary extends React.Component<
  IErrorBoundaryProp,
  IErrorBoundaryState
> {
  constructor(props: IErrorBoundaryProp) {
    super(props);

    this.state = {
      error: undefined,
    };
  }

  static getDerivedStateFromError(error: Error): IErrorBoundaryState {
    return {
      error,
    };
  }

  public render() {
    const { error } = this.state;
    const { children } = this.props;

    if (error) {
      return <GeneralErrorPage />;
    }

    return children;
  }
}

export default ErrorBoundary;
