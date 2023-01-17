"use client";
import React from "react";
import { useRouter } from "next/navigation";


export default function Page() {
    const router = useRouter();
    return (
        <div className="flex flex-col items-center justify-center min-w-[100vw] min-h-screen py-2">
            <button
                className=" outline p-4 rounded-xl"
                onClick={() => {
                    router.push("/login");
                }}
            >
                Login
            </button>
        </div>
    );
}
