"use client"
import useAuthStore from '@/features/home/store/auth'
import { Info, Plus } from 'lucide-react';
import Link from 'next/link';

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import React, { useState } from 'react'
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

export const Credits = () => {

    const { user } = useAuthStore();
    const router = useRouter();
    const [isAddingCredits, setIsAddingCredits] = useState(false)

    return (
        <>
            <div className="flex flex-row items-center gap-2 bg-slate-900 p-2 rounded-md"
                onClick={() => setIsAddingCredits(true)}
            >
                <span className="text-sm text-muted-foreground">Créditos:</span>
                <span className="text-sm font-bold">{user?.amount}</span>

                <Info className="h-4 w-4 text-gray-700" />
                {/* <Link
                href="/pricing"
                className="text-sm text-primary"
            >
                <Info className="h-4 w-4 text-gray-700" />
            </Link> */}
            </div>
            <Dialog open={isAddingCredits} onOpenChange={setIsAddingCredits}>
                {/* <DialogTrigger asChild> */}
                {/* <Plus className=" h-4 w-4" /> */}
                {/* </DialogTrigger> */}
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle
                            className="text-black"
                        >
                            Add Credits
                        </DialogTitle>
                        {/* <DialogDescription>
                        Enter the amount of credits {`you'd`} like to add to your account.
                    </DialogDescription> */}
                        <DialogDescription>
                            {/* You {`don't`} have enough credits to save this email. Please add more credits to your account. */}
                            If you want to save this email, you need to add more credits to your account.
                        </DialogDescription>
                    </DialogHeader>
                    {/* <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="credits" className="text-right">
                            Credits
                        </Label>
                        <Input
                            id="credits"
                            type="number"
                            className="col-span-3"
                            placeholder="Enter amount"
                        />
                    </div>
                </div> */}
                    <DialogFooter>
                        <Button onClick={() => {
                            router.push('/pricing');
                        }}>
                            Add Credits
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
