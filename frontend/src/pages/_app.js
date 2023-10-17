import '../../scss/global.scss';
import AuthProvider from '@/providers/authProvider';
import { UserProvider } from '@/hooks/UserContext';
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }) {
    return (
        <AuthProvider>
            <UserProvider>
                <Component {...pageProps} />
                <Toaster
                    position="bottom-right"
                    reverseOrder={false}
                />
            </UserProvider>
        </AuthProvider>
    )
}
export default MyApp