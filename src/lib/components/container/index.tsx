import { ReactNode } from "react";
import Navigation from "../navigation";

function MainContainer({ children }: { children: ReactNode }) {
    return (
        <div className="w-full h-full flex">
            <Navigation.Full onButton="home" />
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

function WideContainer({ children }: { children: ReactNode }) {
    return (
        <div className="w-full h-screen flex">
            <Navigation.Short onButton="home" />
            <div className="px-10 py-12 w-full h-full">
                {children}
            </div>
        </div>
    );
}

const Container = {
    MainContainer,
    LogInContainer,
    WideContainer
}

export default Container;