"use client"
import apiClient from '@/api/apiClient';
import React, { useState } from 'react'
import { toast } from 'sonner';
import { Button } from '../ui/button';
import useAuthStore from '@/features/home/store/auth';
import { useRouter } from 'next/navigation';
import { tiers } from '@/helpers/tiers';

interface ITier {
    id: number;
    name: string;
    price: number;
    description: string;
    features: string[];
    tokens: number;
    limitations: string[];
}

interface ButtonPricingProps {
    // active: boolean;
    tier: ITier;
}

export const ButtonPricing: React.FC<ButtonPricingProps> = ({ tier }) => {

    const [isLoading, setIsLoading] = useState(false);
    const { user } = useAuthStore();
    const router = useRouter();

    const handlePurchase = async (planId: number) => {

        if (!user?.email) {
            toast.error("Debes iniciar sesión para continuar.");
            router.push("/auth/login");
            return;
        }

        const selectedPlan = tiers.find((plan) => plan.id === planId);

        if (!selectedPlan) {
            toast.error("El plan seleccionado no existe.");
            return;
        }

        setIsLoading(true);

        try {
            // Llama a la API para crear la preferencia de Mercado Pago
            const { data } = await apiClient.post("/mp/create-payment", {
                planId: selectedPlan.id,
                amount: selectedPlan.price,
                tokenReward: selectedPlan.tokens,
                planType: selectedPlan.name,
                paymentMethodId: "visa",
            });

            // Redirige al usuario a la URL de pago
            if (data.init_point) {
                window.location.href = data.init_point;
            } else {
                toast.error("Hubo un problema al redirigir a Mercado Pago.");
            }
        } catch (error) {
            console.error("Error al procesar el pago:", error);
            toast.error("No se pudo procesar el pago. Inténtalo nuevamente.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Button
            onClick={() => handlePurchase(tier.id)}
            disabled={isLoading}
            className="w-full" variant={"default"}>
            {
                isLoading ?
                    <>
                        <span className="mr-2">Procesando...</span>
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.001 8.001 0 0120 12H16c0 3.042-1.385 5.824-3.536 7.709l1.414 1.414C18.432 18.821 20 15.563 20 12H16v-.291l-2 2V17l-2 2v-4.709zM12 4V0H8v4h4z"></path>
                        </svg>
                    </>
                    :
                    <>
                        {tier.name === "Empresarial" ? "Contactar ventas" : "Comenzar"}
                    </>
            }
        </Button>
    )
}
