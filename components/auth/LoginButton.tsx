"use client";

import { useRouter } from "next/navigation";

interface Props{
    children: React.ReactNode;
    mode?: "modal" | "redirect";
    asChild?: boolean;
}

export const LoginButton = ({ children, asChild, mode = "redirect"} : Props) => {

    const {push} = useRouter();

    const onClick = () => {
        push("/")
    }

    if(mode === "modal"){
        return (
            <span>
                Todo
            </span>
        )
    }

  return (
    <span className="cursor-pointer" onClick={onClick}>
        {children}
    </span>
  )
}
