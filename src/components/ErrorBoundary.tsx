import React, { Component, ReactNode, ErrorInfo } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  errorMessage: string;
}

export class ErrorBoundary extends Component<Props, State> {
  override state: State = {
    hasError: false,
    errorMessage: '',
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, errorMessage: error.message || 'Unknown error' };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Lifvox App Error:', error, errorInfo);
  }

  public override render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen w-full flex items-center justify-center p-6 bg-gray-50 text-gray-900 font-sans">
          <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-gray-200 shadow-xl text-center">
            <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4 font-bold text-xl">
              ⚠️
            </div>
            <h2 className="text-xl font-extrabold text-gray-900 mb-2">Something went wrong</h2>
            <p className="text-xs text-gray-500 mb-6 leading-relaxed">
              {this.state.errorMessage || 'An error occurred while rendering the page.'}
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false, errorMessage: '' });
                window.location.reload();
              }}
              className="w-full py-3 bg-[#00A651] hover:bg-[#009247] text-white font-bold text-xs rounded-xl shadow-sm transition-all"
            >
              Reload Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
