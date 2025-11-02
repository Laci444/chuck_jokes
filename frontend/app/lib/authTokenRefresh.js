import { auth } from "../services/auth";


export const refresh = {
    interval: 4 * 60 * 1000,
    refreshApiCallback: async (param) => {
        try {
            const response = await auth.refreshAccessToken(param.refreshToken ?? "");
            return {
                isSuccess: true,
                newAuthToken: response.access,
            };
        } catch (error) {
            return {
                isSuccess: false,
            };
        }
    },
};
