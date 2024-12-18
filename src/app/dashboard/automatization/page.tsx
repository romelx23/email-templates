import { ListAutomation } from '@/components/dashboard/list-automation';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const AutomatizationPage: React.FC = () => {
    const automationList = [
        { id: 1, name: 'Automation 1', description: 'Description for automation 1' },
        { id: 2, name: 'Automation 2', description: 'Description for automation 2' },
        { id: 3, name: 'Automation 3', description: 'Description for automation 3' },
    ];

    return (
        <div className="p-6 min-h-screen">

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold ">Automatization Dashboard</h1>
                <Link
                    href="/dashboard/automatization/add"
                    className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-md"
                >
                    Create Automation
                    <ArrowRight className="h-4 w-4 mr-2" />
                </Link>
            </div>
            <ListAutomation />
        </div>
    );
};

export default AutomatizationPage;