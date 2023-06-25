import { Component, ReactNode } from 'react';

interface IProps {
    children: ReactNode;
    mode: 'full' | 'message';
}

interface IState {
    hasError: boolean;
}

class ErrorBoundary extends Component<IProps, IState> {
    state: IState = {
        hasError: false
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static getDerivedStateFromError(err: any) {
        return { hasError: true };
    }

    componentDidCatch(err: any, info: any) {
        console.log(err, info);
    }

    render() {
        if (this.state.hasError) {
            if (this.props.mode === 'full') {
                // return something to show the error
            } else {
                // return something to show a message
            }
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
