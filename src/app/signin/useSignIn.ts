import apiInstance from "@/lib/axios";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AuthResponse, LoginForm } from "./validationSchema";
import { AxiosError } from "axios";

export function useLoginMutation(
  options?: UseMutationOptions<AuthResponse, AxiosError, LoginForm>
) {
  const mutation = useMutation({
    mutationFn: async (form: LoginForm) => {
      const res = await apiInstance.post<AuthResponse>("/auth/signIn", form);
      const data = res.data;

      await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accessToken: data.accessToken,
        }),
      });

      return data;
    },
    ...options,
  });

  return {
    ...mutation,
  };
}

interface OAuthLoginForm {
  redirectUri: string;
  token: string;
  provider: "google" | "kakao";
}

export function useOAuthLoginMutation(
  options?: UseMutationOptions<AuthResponse, AxiosError, OAuthLoginForm>
) {
  const mutation = useMutation({
    mutationFn: async ({ redirectUri, token, provider }: OAuthLoginForm) => {
      const res = await apiInstance.post<AuthResponse>(
        `/auth/signIn/${provider}`,
        {
          redirectUri,
          token,
        }
      );

      const data = res.data;

      await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accessToken: data.accessToken,
        }),
      });

      return data;
    },
    ...options,
  });

  return mutation;
}
