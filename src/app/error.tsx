'use client';

import React, { useEffect } from 'react';
import ErrorPage from '@/src/components/ErrorPage';

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log error to error reporting service
        console.error('Global error:', error);
        // TODO: Send to error tracking service (e.g., Sentry)
    }, [error]);

    return (
        <html>
            <body>
                <ErrorPage
                    type="server"
                    errorCode={error.digest || '500'}
                    onRetry={reset}
                    showHomeButton
                />
            </body>
        </html>
    );
}
