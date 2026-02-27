import Navigation from "../Components/Navigation";
import '../../css/app.css';
import "@fontsource/poppins/400.css";
import { Children } from "react";
export default function MainLayout({children}){

    const currentDate = new Date();
    const day = currentDate.getDate();
    const dayChar = currentDate.toLocaleDateString('en-US',{weekday:"long"})
    const month = currentDate.toLocaleDateString('en-US',{month:"long"});
    const formattedDate = `${dayChar}, ${day} ${month}`;
    return(
            <div className="main-layout">
                 <Navigation />
                <main className="page-content">
                    <div className="current-time">
                        {formattedDate}
                    </div>
                    {children}
                </main>
            </div>
    )
}
