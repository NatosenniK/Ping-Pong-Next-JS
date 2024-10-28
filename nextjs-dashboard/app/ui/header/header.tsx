import NavLinks from "../dashboard/nav-links";
import PingPongLogo from "../ping-pong-logo";
import { MobileMenuButton } from "../players/buttons";
import ThemeSwitch from "../theme-switch";


export function HeaderElement() {

    return (
        <header>
            <nav className="bg-blue-600 border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-700">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">

                    <PingPongLogo />
                   
                    <div className="flex items-center lg:order-1">
                        <div className="xl:hidden">
                            <MobileMenuButton />
                        </div>
                        
                    </div>
                    <div className="hidden justify-between items-center w-full xl:flex xl:w-auto lg:order-2" id="mobile-menu-2">
                        <NavLinks />
                        <div className="pl-4">
                            <ThemeSwitch />
                        </div>
                        
                    </div>
                </div>
            </nav>
        </header>
    )
}