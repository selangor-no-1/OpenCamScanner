"use client";

import { useState } from "react"
import Link from "next/link"
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardDescription, CardTitle } from '@/components/ui/card'

const flavours = ["Vanilla", "Chocolate", "Durian"] as const
type IceCream = (typeof flavours)[number]

const LoginWithIceCream = () => {
    const [state, setState] = useState<IceCream>("Vanilla")

    return (
        // <div className="border-2 border-gray-300 hover:border-green-500 flex flex-col rounded-lg items-center justify-center max-w-sm space-y-3 p-8">
        <Card>
            <CardHeader>
                <CardTitle className="text-xl font-bold leading-tight tracking-tight">Sign In</CardTitle>
                <CardDescription>You chose: {state}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    {flavours.map((flavour) => (
                        <div
                        key = {flavour}
                        onClick = {() => setState(flavour)}
                        className="border border-gray-500 p-2 rounded-lg flex items-center space-x-3"
                        >
                            <input
                            type="radio"
                            checked={state === flavour}
                            value={flavour}
                            onChange={(e) => setState(e.target.value as IceCream)}
                            title="flavour"
                            />
                            <label>
                            {flavour}
                            </label>
                        </div>
                    ))}
                </div>

                <Link
                prefetch={false}
                href={`/login?state=${state}`}
                className={`${ buttonVariants({ variant: "outline", size:"lg" }) } mt-5`}
                >
                    Login with <span className="text-red-500 ml-2">SingPass</span>
                </Link>

            </CardContent>
        </Card>
    )
}

export default LoginWithIceCream
