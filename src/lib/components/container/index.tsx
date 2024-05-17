import { ReactNode } from "react";
import Navigation from "../navigation";

function MainContainer({ children }: { children: ReactNode }) {
    return (
        <div className="w-full h-full flex">
            <Navigation onButton="home" />
            <div className="px-16 py-12 w-full h-full">
                {children}
            </div>
        </div>
    );
}

function LogInContainer({ children }: { children: ReactNode }) {
    return (
        <div className="w-full h-full flex">
            {children}
        </div>
    );
}

const Container = {
    MainContainer,
    LogInContainer,
}

export default Container;