"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { Home, Mail, Settings, Plus, Bot, LinkIcon, BarChart2, Users, TrendingUp, TrendingDown } from 'lucide-react'
import { Credits } from "@/components/home/credits"

const performanceData = [
    { month: "Jan", value: 34 },
    { month: "Feb", value: 67 },
    { month: "Mar", value: 39 },
    { month: "Apr", value: 28 },
    { month: "May", value: 48 },
    { month: "Jun", value: 52 },
]

const stats = [
    {
        title: "Enviados",
        value: "42,642",
        change: "-0.02%",
        trend: "down",
    },
    {
        title: "Abiertos",
        value: "26,843",
        change: "-0.02%",
        trend: "down",
    },
    {
        title: "Clicks",
        value: "525,753",
        change: "+0.02%",
        trend: "up",
    },
    {
        title: "Suscriptores",
        value: "425",
        change: "+0.02%",
        trend: "up",
    },
]

export default function Dashboard() {

    return (
        <div className="flex min-h-screen">

            {/* Main Content */}
            <div className="flex-1 overflow-auto">
                <div className="h-full px-4 py-6 lg:px-8">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold">Dashboard</h1>
                            <p className="text-sm text-muted-foreground">
                                Bienvenido, veamos el rendimiento de tus campañas.
                            </p>
                        </div>
                        <div className="flex flex-col gap-2 items-end">
                            <Link
                                href="/dashboard/campaign"
                                className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-md"
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                Crear campaña
                            </Link>
                            <Credits />
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {stats.map((stat, i) => (
                            <Card key={i}>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                                    {stat.trend === "up" ? (
                                        <TrendingUp className="h-4 w-4 text-green-500" />
                                    ) : (
                                        <TrendingDown className="h-4 w-4 text-red-500" />
                                    )}
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{stat.value}</div>
                                    <p className={`text-xs ${ stat.trend === "up" ? "text-green-500" : "text-red-500"
                                        }`}>
                                        {stat.change} desde el último mes
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Charts */}
                    <div className="mt-8 grid gap-4 md:grid-cols-2">
                        {/* Gráfico */}
                        <Card className="max-w-full overflow-hidden">
                            <CardHeader>
                                <CardTitle>Rendimiento de Campaña</CardTitle>
                                <CardDescription>Tasa de apertura mensual</CardDescription>
                            </CardHeader>
                            <CardContent className="p-0 overflow-hidden">
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={performanceData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="month" />
                                        <YAxis />
                                        <ChartTooltip />
                                        <Bar
                                            dataKey="value"
                                            fill="hsl(var(--primary))"
                                            radius={[4, 4, 0, 0]}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>

                        {/* Calendario */}
                        <Card className="max-w-full overflow-hidden">
                            <CardHeader>
                                <CardTitle>Calendario de Campañas</CardTitle>
                                <CardDescription>Programa tus próximas campañas</CardDescription>
                            </CardHeader>
                            <CardContent className="p-0 overflow-hidden">
                                <Calendar />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
