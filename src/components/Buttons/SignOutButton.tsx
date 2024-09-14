"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
    return (
        <button
            onClick={() => signOut()}
            className="border-4 p-2 border-red-600 bg-red-600 rounded-lg text-white hover:border-red-700 transition block"
        >
            ออกจากระบบ
        </button>
    );
}
