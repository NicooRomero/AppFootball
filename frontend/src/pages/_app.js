import '../../scss/global.scss';
import AuthProvider from '@/providers/authProvider';
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }) {
    return (
        <AuthProvider>
            <Component {...pageProps} />
            <Toaster
                    position="bottom-right"
                    reverseOrder={false}
                />
        </AuthProvider>
    )
}
export default MyApp