import { Toast } from '@/lib/toastify';
import { Component } from 'react';

const BugIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C10.9 2 10 2.9 10 4V5H8C6.9 5 6 5.9 6 7V9H4V11H6V13H4V15H6V17C6 18.1 6.9 19 8 19H10V20C10 21.1 10.9 22 12 22C13.1 22 14 21.1 14 20V19H16C17.1 19 18 18.1 18 17V15H20V13H18V11H20V9H18V7C18 5.9 17.1 5 16 5H14V4C14 2.9 13.1 2 12 2ZM12 4C12.55 4 13 4.45 13 5H11C11 4.45 11.45 4 12 4ZM8 7H16V17H8V7ZM10 9V15H14V9H10Z" fill="currentColor" />
    </svg>
);

const RefreshIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.5 10C17.5 14.1421 14.1421 17.5 10 17.5C5.85786 17.5 2.5 14.1421 2.5 10C2.5 5.85786 5.85786 2.5 10 2.5C11.5 2.5 12.9 2.95 14 3.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M10 6L14 2L10 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const HomeIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 10L10 3L17 10V17C17 17.5304 16.7893 18.0391 16.4142 18.4142C16.0391 18.7893 15.5304 19 15 19H5C4.46957 19 3.96086 18.7893 3.58579 18.4142C3.21071 18.0391 3 17.5304 3 17V10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 19V12H12V19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null,
            errorId: null
        };
    }

    static getDerivedStateFromError(error) {
        return {
            hasError: true,
            errorId: `ERR-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
        };
    }

    componentDidCatch(error, errorInfo) {
        const isDev = import.meta.env.DEV;

        this.setState({
            error,
            errorInfo
        });

        Toast.error('Error Boundary Caught:', {
            error,
            errorInfo,
            errorId: this.state.errorId,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            url: window.location.href
        });

        if (!isDev) {
            this.logErrorToService(error, errorInfo);
        }
    }

    logErrorToService = (error, errorInfo) => {
        // fetch('/api/log-error', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({
        //         message: error.toString(),
        //         stack: error.stack,
        //         componentStack: errorInfo?.componentStack,
        //         errorId: this.state.errorId,
        //         timestamp: new Date().toISOString(),
        //         url: window.location.href,
        //         userAgent: navigator.userAgent
        //     })
        // }).catch(err => Toast.error('Failed to log error:', err));
    };

    handleReset = () => {
        this.setState({
            hasError: false,
            error: null,
            errorInfo: null,
            errorId: null
        });
    };

    handleRefresh = () => {
        window.location.reload();
    };

    handleGoHome = () => {
        window.location.href = '/';
    };

    render() {
        if (this.state.hasError) {
            const isDev = import.meta.env.DEV;
            const { error, errorInfo, errorId } = this.state;

            return (
                <div className="flex my-5 items-center justify-center p-4">
                    {/* Main Content */}
                    <div className="max-w-3xl w-full relative z-10">
                        <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-slate-700/50">

                            {/* Header */}
                            <div className="relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-orange-500 to-pink-500 opacity-90"></div>
                                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
                                <div className="relative p-8 text-white">
                                    <div className="flex flex-col items-center text-center">
                                        <h1 className="text-3xl mb-3 font-bold tracking-tight">
                                            {isDev ? 'Development Error Detected' : 'Oops! Something Went Wrong'}
                                        </h1>
                                        <p className="text-white/90 text-base max-w-2xl">
                                            {isDev
                                                ? 'An error occurred during development. Details below will help you debug.'
                                                : "We're sorry for the inconvenience. Our team has been automatically notified."}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8">
                                {isDev ? (
                                    // DEV MODE
                                    <div className="space-y-6">
                                        <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-2xl p-6 border border-red-500/30 shadow-lg backdrop-blur-sm">
                                            <div className="flex items-start gap-4">
                                                <div className="p-3 bg-red-500/20 rounded-xl flex-shrink-0 border border-red-500/30">
                                                    <BugIcon />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-bold text-red-300 mb-3 text-lg">Error Message</h3>
                                                    <p className="text-red-200 font-mono text-sm break-words bg-slate-900/50 p-4 rounded-xl border border-red-500/20">
                                                        {error?.toString()}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {error?.stack && (
                                            <details className="group bg-slate-700/30 rounded-2xl overflow-hidden border border-slate-600/50 backdrop-blur-sm">
                                                <summary className="cursor-pointer p-6 font-semibold text-slate-200 hover:bg-slate-700/50 transition-colors flex items-center justify-between">
                                                    <span>Stack Trace</span>
                                                    <span className="text-slate-400 group-open:rotate-90 transition-transform">▶</span>
                                                </summary>
                                                <div className="px-6 pb-6">
                                                    <pre className="p-4 text-xs overflow-x-auto bg-slate-900/80 text-green-300 rounded-xl whitespace-pre-wrap break-words font-mono border border-slate-700">
                                                        {error.stack}
                                                    </pre>
                                                </div>
                                            </details>
                                        )}

                                        {errorInfo?.componentStack && (
                                            <details className="group bg-slate-700/30 rounded-2xl overflow-hidden border border-slate-600/50 backdrop-blur-sm">
                                                <summary className="cursor-pointer p-6 font-semibold text-slate-200 hover:bg-slate-700/50 transition-colors flex items-center justify-between">
                                                    <span>Component Stack</span>
                                                    <span className="text-slate-400 group-open:rotate-90 transition-transform">▶</span>
                                                </summary>
                                                <div className="px-6 pb-6">
                                                    <pre className="p-4 text-xs overflow-x-auto bg-slate-900/80 text-blue-300 rounded-xl whitespace-pre-wrap break-words font-mono border border-slate-700">
                                                        {errorInfo.componentStack}
                                                    </pre>
                                                </div>
                                            </details>
                                        )}
                                    </div>
                                ) : (
                                    // PROD MODE
                                    <div className="space-y-6">
                                        <div className="bg-gradient-to-br from-slate-700/30 to-slate-800/30 rounded-2xl p-6 border border-slate-600/50 backdrop-blur-sm">
                                            <div className="grid gap-4">
                                                {[
                                                    { icon: '🔄', text: 'Refresh the page and try again' },
                                                    { icon: '🧹', text: 'Clear your browser cache' },
                                                    { icon: '🏠', text: 'Return to the home page' }
                                                ].map((item, i) => (
                                                    <div key={i} className="flex items-center gap-4 bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 hover:border-slate-600 transition-colors">
                                                        <span className="text-2xl">{item.icon}</span>
                                                        <span className="text-slate-200 font-medium">{item.text}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl p-6 text-center border border-purple-500/30 backdrop-blur-sm">
                                            <p className="text-slate-300 mb-4">
                                                If the problem persists, contact support with error ID:
                                            </p>
                                            <div className="inline-block bg-slate-800/80 px-6 py-3 rounded-full border border-purple-500/30">
                                                <code className="text-purple-300 font-mono font-bold tracking-wide">{errorId}</code>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Buttons */}
                                <div className="flex flex-wrap gap-4 mt-8 pt-8 border-t border-slate-700/50">
                                    {isDev && (
                                        <button
                                            onClick={this.handleReset}
                                            className="flex-1 min-w-[140px] bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:shadow-blue-500/20 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
                                        >
                                            <RefreshIcon />
                                            Try Again
                                        </button>
                                    )}
                                    <button
                                        onClick={this.handleRefresh}
                                        className="flex-1 min-w-[140px] bg-gradient-to-r from-slate-600 to-slate-700 text-white px-6 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:shadow-slate-500/20 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
                                    >
                                        <RefreshIcon />
                                        Reload Page
                                    </button>
                                    <button
                                        onClick={this.handleGoHome}
                                        className="flex-1 min-w-[140px] bg-gradient-to-r from-orange-500 to-pink-600 text-white px-6 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:shadow-orange-500/20 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
                                    >
                                        <HomeIcon />
                                        Go Home
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;