"use client";

import { getAutomation } from "@/features/home/helpers/email";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import { formatDistance, parseISO } from 'date-fns';

export interface IAutomation {
    id: number;
    templateId: number;
    recipientsCount: number;
    userId: number;
    scheduleDate: Date;
    scheduleTime: string;
    status: string;
    user: User;
}

export interface IAutomationUpdate {
    id: number;
    templateId: number;
    recipients: UserWithoutId[];
    userId: number;
    scheduleDate: Date;
    scheduleTime: string;
    status: string;
    user: User;
}

export interface User {
    id: number;
    name: string;
    email: string;
}

export type UserWithoutId = Omit<User, "id">;


export const ListAutomation = () => {

    const timeRemaining = (date: Date) => {
        const now = new Date();
        if (date <= now) return "Ejecutada";
        return `Faltan ${ formatDistance(date, now, { addSuffix: true }) }`;
    };

    const { data: automation, isLoading } = useQuery<IAutomation[]>({
        queryKey: ["automation"],
        queryFn: getAutomation,
        staleTime: 1000 * 60 * 5, // Cache por 5 minutos
    });

    if (isLoading) {
        return <PlaceHolder />;
    }

    return (
        <div className="w-full flex flex-row flex-wrap gap-4 rounded-lg bg-black shadow pt-4">
            {automation && automation.length === 0 && (
                <div className="w-full text-center text-white p-4">
                    No hay Automatizaciones para mostrar
                </div>
            )}
            {automation &&
                automation.map((auto) => {
                    // const scheduleDate = parseISO(auto.scheduleDate.toString());

                    const scheduleDateTimeString = `${ auto.scheduleDate }T${ auto.scheduleTime }`;
                    // Parsear la fecha y hora combinadas
                    const scheduleDateTime = parseISO(scheduleDateTimeString);

                    const now = new Date();
                    // const isExecuted = scheduleDate <= now;
                    const isExecuted = scheduleDateTime <= now;

                    const timeRemaining = isExecuted
                        ? "Ejecutada"
                        : `Faltan ${ formatDistance(scheduleDateTime, now, { addSuffix: true }) }`;

                    return (
                        <div
                            key={auto.id}
                            className={`flex flex-col gap-3 w-72 md:w-64 p-4 rounded-lg shadow-sm ${ isExecuted ? "bg-green-700" : "bg-gray-800"
                                } hover:shadow-md transition-shadow`}
                        >
                            <div className="flex justify-between">
                                <div className="flex flex-col">
                                    <h3 className="text-lg font-semibold text-white truncate">
                                        {scheduleDateTime.toLocaleDateString()}
                                    </h3>
                                    <h3 className="text-lg font-semibold text-white truncate">
                                        {auto.scheduleTime}
                                    </h3>
                                </div>
                                <Link href={`/dashboard/automatization/${ auto.id }`} passHref>
                                    <ArrowRight className="h-6 w-6 text-primary cursor-pointer text-white" />
                                </Link>
                            </div>

                            <p className="text-sm text-gray-200">
                                Hay un total de: {auto.recipientsCount}
                            </p>
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-gray-200">{auto.status}</p>
                                <span
                                    className={`px-2 py-1 rounded text-xs font-bold ${ isExecuted ? "bg-green-500 text-white" : "bg-blue-500 text-white"
                                        }`}
                                >
                                    {timeRemaining}
                                </span>
                            </div>
                        </div>
                    );
                })}
        </div>
    );
};

const PlaceHolder = () => {
    const placeholderArray = Array.from({ length: 4 });

    return (
        <div className="w-full flex flex-wrap gap-4 p-6 rounded-lg bg-black shadow">
            {placeholderArray.map((_, index) => (
                <div
                    key={index}
                    className="flex flex-col gap-3 w-64 p-4 rounded-lg shadow-sm bg-gray-700 animate-pulse"
                >
                    <div className="h-6 bg-gray-800 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-800 rounded w-5/6"></div>
                    <div className="h-4 bg-gray-800 rounded w-full"></div>
                    <div className="h-40 bg-gray-800 rounded-lg"></div>
                </div>
            ))}
        </div>
    );
};