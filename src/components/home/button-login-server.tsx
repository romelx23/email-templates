"use client"
// import apiClient from "@/api/apiClient";
import useAuthStore from "@/features/home/store/auth";
import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";

interface IButtonLoginServerProps {
    loginServer: (accessToken: string) => Promise<{
        access_token: string;
        user: {
            name: string;
            role: string;
            email: string;
            picture: string;
            status: boolean;
        };
        credits: {
            amount: number;
        };
    }>;
}

export const ButtonLoginServer: React.FC<IButtonLoginServerProps> = ({ loginServer }) => {


    const { login } = useAuthStore();
    const router = useRouter();

    const onSuccess = async (credentials: any) => {
        try {
            // call the api to login
            const accessToken = credentials.credential;
            console.log({ accessToken });

            // Send the access token to your backend for verification
            // const response = await apiClient.post("/auth/google",
            //     {
            //         "id_token": accessToken,
            //     },
            //     {
            //         headers: {
            //             "Content-Type": "application/json",
            //         },
            //     });
            const data = await loginServer(accessToken);

            console.log("Login successful:", data);

            localStorage.setItem("x-token", data.access_token);

            login({
                name: data.user.name,
                role: data.user.role,
                email: data.user.email,
                picture: data.user.picture,
                status: data.user.status,
                amount: data.credits.amount
            });

            // localStorage.setItem("x-token", data.access_token);

            // // Redirect or handle post-login actions
            router.push("/dashboard");

        } catch (error) {
            console.error("Login error:", error);
            // setLoginError((error as Error).message || "An unknown error occurred");
        }
    }

    const onError = () => {
        console.error("Google Sign-In Error:");
        // setLoginError("Google Sign-In failed");
    }

    return (
        <div className="flex justify-center">
            {/* <Button
                onClick={() => login()}
                variant="outline" className="w-full">
                <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                    <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                </svg>
                Ingresa con Google
            </Button>
            {loginError && <p className="text-red-500 mt-2">{loginError}</p>} */}
            <GoogleLogin
                onSuccess={onSuccess}
                onError={onError}
            />
        </div>
    )
}

