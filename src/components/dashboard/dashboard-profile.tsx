"use client"

import * as React from "react"
import { CreditCard, Plus } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import useAuthStore from "@/features/home/store/auth"

export default function DashboardProfile() {

    const { user } = useAuthStore();
    const router = useRouter();
    const { toast } = useToast()
    const [credits, setCredits] = React.useState(user?.amount || 0)
    const [isAddingCredits, setIsAddingCredits] = React.useState(false)

    const handleAddCredits = (amount: number) => {
        setCredits(credits + amount)
        setIsAddingCredits(false)
        toast({
            title: "Credits Added",
            description: `${ amount } credits have been added to your account.`,
        })
        // router.push('/pricing');
    }

    return (
        <Card className="w-full max-w-3xl mx-auto">
            <CardHeader>
                <CardTitle>User Profile</CardTitle>
                <CardDescription>Manage your account and credits</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                    <Avatar className="h-20 w-20">
                        <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                        <AvatarFallback>
                            {user?.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <h2 className="text-2xl font-bold">
                            {user?.name}
                        </h2>
                        <p className="text-muted-foreground">
                            {
                                user?.email
                            }
                        </p>
                    </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div className="flex items-center space-x-2">
                        <CreditCard className="h-6 w-6" />
                        <span className="text-lg font-semibold">Available Credits</span>
                    </div>
                    <span className="text-2xl font-bold">{credits}</span>
                </div>
            </CardContent>
            <CardFooter>
                {/* <Dialog open={isAddingCredits} onOpenChange={setIsAddingCredits}>
                    <DialogTrigger asChild>
                        <Button className="w-full">
                            <Plus className="mr-2 h-4 w-4" /> Add More Credits
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle
                                className="text-black"
                            >Add Credits</DialogTitle>
                            <DialogDescription>
                                Enter the amount of credits {`you'd`} like to add to your account.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
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
                        </div>
                        <DialogFooter>
                            <Button onClick={() => handleAddCredits(100)}>Add Credits</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog> */}
                <Button
                    className="w-full"
                    onClick={() => {
                        router.push('/pricing');
                    }}
                >
                    <Plus className="mr-2 h-4 w-4" /> Add More Credits
                </Button>
            </CardFooter>
        </Card>
    )
}

