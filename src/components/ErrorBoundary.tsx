'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import ErrorPage from './ErrorPage';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
}

/**
 * Simple Error Boundary for Tugo
 * 
 * Catches errors and shows a clean error page
 * 
 * @example
 * <ErrorBoundary>
 *   <MyComponent />
 * </ErrorBoundary>
 */
class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(): State {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Error caught:', error, errorInfo);
        // TODO: Send to error tracking service (Sentry, etc.)
    }

    handleReset = () => {
        this.setState({ hasError: false });
    };

    render() {
        if (this.state.hasError) {
            return (
                <ErrorPage
                    type="generic"
                    title="Something Went Wrong"
                    message="An unexpected error occurred. Please try again."
                    onRetry={this.handleReset}
                    showHomeButton
                />
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;