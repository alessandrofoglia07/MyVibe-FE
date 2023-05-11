import { createRefresh } from 'react-auth-kit';
import axios from 'axios';

const refreshApi = createRefresh({

    interval: 15, // minutes
    refreshApiCallback: async ({ refreshToken }) => {
        try {
            const res = await axios.post('http://localhost:5000/auth/refresh-token', { refreshToken });

            return {
                isSuccess: true,
                newAuthToken: res.data.accessToken,
                newAuthTokenExpireIn: 15,
            };
        } catch (err) {
            console.log(err);
            return {
                isSuccess: false,
                newAuthToken: '',
            };
        }
    }
});

export default refreshApi;