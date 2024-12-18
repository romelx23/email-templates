import Link from "next/link"
// import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, X } from 'lucide-react'
import { HomeLayout } from "@/components/home/home-layout"
import { ButtonPricing } from "@/components/home/button-pricing"
import { tiers } from "@/helpers/tiers"

// const tiers = [
//     {
//         name: "Básico",
//         price: "9.99€",
//         description: "Perfecto para pequeños negocios y emprendedores",
//         features: [
//             "Hasta 1,000 suscriptores",
//             "Plantillas de email básicas",
//             "Análisis de campañas",
//             "Soporte por email",
//         ],
//         limitations: [
//             "Sin acceso a herramientas de AI",
//             "Sin integraciones avanzadas",
//         ],
//     },
//     {
//         name: "Pro",
//         price: "29.99€",
//         description: "Ideal para negocios en crecimiento",
//         features: [
//             "Hasta 10,000 suscriptores",
//             "Plantillas de email personalizables",
//             "Análisis avanzado de campañas",
//             "Herramientas de AI para generación de contenido",
//             "Integraciones con CRM populares",
//             "Soporte prioritario",
//         ],
//         limitations: [
//             "Límite en pruebas A/B",
//         ],
//     },
//     {
//         name: "Empresarial",
//         price: "Personalizado",
//         description: "Solución a medida para grandes empresas",
//         features: [
//             "Suscriptores ilimitados",
//             "Plantillas de email totalmente personalizables",
//             "Análisis predictivo con AI",
//             "Integraciones personalizadas",
//             "Gestor de cuenta dedicado",
//             "SLA garantizado",
//         ],
//         limitations: [],
//     },
// ]

export default function PricingPage() {
    return (
        <HomeLayout>
            <div className="bg-black py-16 sm:py-24">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-4xl text-center">
                        <h2 className="text-base font-semibold leading-7 text-gray-200">Precios</h2>
                        <p className="mt-2 text-4xl font-bold tracking-tight text-gray-300 sm:text-5xl">
                            Planes que se adaptan a tu negocio
                        </p>
                    </div>
                    <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-300">
                        Elige el plan perfecto para tus necesidades de email marketing. Todos los planes incluyen actualizaciones gratuitas.
                    </p>
                    <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {tiers.map((tier) => (
                            <Card key={tier.name} className="flex flex-col justify-between">
                                <CardHeader>
                                    <CardTitle>{tier.name}</CardTitle>
                                    <CardDescription>{tier.description}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-4xl font-bold">{tier.price}</p>
                                    <p className="text-sm text-gray-500">/mes</p>
                                    <ul className="mt-6 space-y-4">
                                        {tier.features.map((feature) => (
                                            <li key={feature} className="flex items-center">
                                                <Check className="h-5 w-5 text-green-500 mr-2" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                        {tier.limitations.map((limitation) => (
                                            <li key={limitation} className="flex items-center text-gray-500">
                                                <X className="h-5 w-5 text-red-500 mr-2" />
                                                <span>{limitation}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                                <CardFooter>
                                    {/* <Button className="w-full" variant={tier.name === "Pro" ? "default" : "outline"}>
                                        {tier.name === "Empresarial" ? "Contactar ventas" : "Comenzar"}
                                    </Button> */}
                                    <ButtonPricing
                                        tier={tier}
                                    />
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
                <div className="mt-16 text-center">
                    <p className="text-base font-semibold text-gray-600">
                        ¿Tienes preguntas sobre nuestros planes?
                    </p>
                    <Link href="#" className="text-primary hover:underline">
                        Contacta con nuestro equipo de ventas
                    </Link>
                </div>
            </div>
        </HomeLayout>
    )
}

