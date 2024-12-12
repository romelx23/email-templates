"use client";

import { getEmails } from "@/features/home/helpers/email";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export interface IEmail {
    id: number;
    title: string;
    subject: string;
    content: string;
    url: string;
}

export const ListEmails = () => {
    const { data: emails, isLoading } = useQuery<IEmail[]>({
        queryKey: ["emails"],
        queryFn: getEmails,
        staleTime: 1000 * 60 * 5, // Cache por 5 minutos
    });

    if (isLoading) {
        return <PlaceHolder />;
    }

    return (
        <div className="w-full flex flex-row flex-wrap gap-4 rounded-lg bg-black shadow pt-4">
            {
                emails &&
                emails.length === 0 && (
                    <div className="w-full text-center text-white p-4">
                        No hay emails para mostrar
                    </div>
                )
            }
            {
                emails &&
                emails.map((email) => (
                    <div
                        key={email.id}
                        className="flex flex-col gap-3 w-72 md:w-64 p-4 rounded-lg shadow-sm bg-gray-800 hover:shadow-md transition-shadow"
                    >
                        <div className="flex justify-between">
                            <h3 className="text-lg font-semibold text-white truncate">
                                {email.title}
                            </h3>
                            <Link
                                href={`/dashboard/campaign/${ email.id }`}
                                passHref
                            >
                                <ArrowRight className="h-6 w-6 text-primary cursor-pointer text-white" />
                            </Link>
                        </div>
                        <p className="text-sm text-gray-200">{email.subject}</p>
                        <p className="text-sm text-gray-300 truncate">{email.content}</p>
                        <img
                            src={email.url}
                            alt={email.title}
                            className="w-full h-40 object-cover rounded-lg"
                        />
                    </div>
                ))}
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