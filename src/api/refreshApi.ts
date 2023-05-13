import { createRefresh } from 'react-auth-kit';
import axios from 'axios';

const refreshApi = createRefresh({

    interval: 15, // minutes
    refreshApiCallback: async ({ refreshToken }) => {
        console.log(refreshToken);
        try {
            const res = await axios.post('http://localhost:5000/auth/refresh-token', { refreshToken });
            console.log('refreshing');

            return {
                isSuccess: true,
                newAuthToken: res.data.accessToken,
                newAuthTokenExpireIn: 15, // minutes
                newRefreshTokenExpiresIn: 43200 // minutes
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