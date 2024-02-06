"use client";
import { Provider as ReduxProvider } from 'react-redux';
import store from '@/store';
import { useTheme } from '@/hooks/theme';
import React, { HTMLProps, useEffect, useMemo, useState } from 'react'
import { FeedbackProvider } from '@/context';
import Surface from '@/components/Surface';
import Stack from '@/components/Stack';
import Logo from '@/components/Logo';
import Typography from '@/components/Typography';
import { useAuthSelector } from '@/hooks/store';
import { usePathname, useRouter } from 'next/navigation';
import { useBreakpointMatch } from '@/hooks/useBreakpointMatch';
import SessionService from '@/services/SessionService';
import { appRoutes } from '@/routes';
import { DM_Sans as dmSansFont } from 'next/font/google'

/** Loading messages */
const messages = {
    /** Initial state */
    start: 'Hold on',
    /** Session token loaded and verified */
    sessionLoad: 'Logged in!',
    /** Invalid or no token present, final state */
    finish: 'Finishing up',
};

function Container({ children }: Readonly<HTMLProps<HTMLDivElement>>) {
    const {
        colors,
        dimensions: { sidebar, headerMobile },
    } = useTheme();
    const auth = useAuthSelector();
    const router = useRouter();
    const pathname = usePathname();
    const [loading, setLoading] = useState<boolean>();
    const [message, setMessage] = useState(messages.start);
    const isMd = useBreakpointMatch('md');

    // Load session
    useEffect(() => {
        if (auth.user || loading) return;
        setLoading(true);
        SessionService.load()
            .then(() => setMessage(messages.sessionLoad))
            .catch(() => setMessage(messages.finish))
            .finally(() => setLoading(false));
    }, [auth, loading]);

    return (
        <MainWrapper>
            <Surface>{children}</Surface>
        </MainWrapper>
    );
}

const MainWrapper = (props: HTMLProps<HTMLElement>) => {
    const { isDark } = useTheme();
    const [classNames, setClassNames] = useState('');

    useEffect(() => {
        if (isDark) setClassNames('dark');
        else setClassNames('');
    }, [isDark]);

    return (
        <main className={classNames}>
            <FeedbackProvider>{props.children}</FeedbackProvider>
        </main>
    );
};

const dmSans = dmSansFont({ subsets: ['latin'] })

export default function Layout(props: Readonly<HTMLProps<HTMLDivElement>>) {
    return (
        <ReduxProvider store={store}>
            <Container {...props} />
        </ReduxProvider>
    )
}

