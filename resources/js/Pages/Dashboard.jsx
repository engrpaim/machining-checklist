import { usePage } from "@inertiajs/react"
import { useState } from "react"
import MainLayout from "../Layouts/MainLayout"
import AllProcess from "../Components/AllProcess"
import bgImage from '../Icons/BG-MACHINING-CHECKLIST.png';
import smpLogo from '../Icons/smp_logo.png';
import AELogo from '../Icons/AE2.png';
import devPic from '../Icons/dev.png';
export default function Dashboard(){
    const params = new URLSearchParams(window.location.search);
    const page = params.get('page');
    const {flash , allLot , ip_client ,modelsList} = usePage().props
    const [clientIp,setClientIp] = useState(ip_client);
    const [viewOption ,setViewOption] = useState(page ?'viewlist':'home');
  
    console.log(allLot,flash,'Modelx: ',modelsList,params);
    return(
        <>
        
        <main>
            <div>
                <h1>Dashboard - Machining Checklist</h1>
            </div>
            {
                viewOption === 'home'? 
                    <section className="home-bg">
                        <img src={bgImage} className="bg-image" alt="" />
                        <div className="home-option">
                            <div className="home-title">
                                <img src={smpLogo}/>
                            </div>
                            <div className="home-title">
                                <h1>Machining Checklist</h1>
                            </div>
                            <div style={{ display:'flex' , flexDirection:'row',gap:'1rem'  ,animation: 'fadeIn 0.2s ease-in-out' }}>
                                <div className="home-buttons">
                                    <button className="home-nav" onClick={(e)=>setViewOption('viewlist')}>View List</button>
                                </div>
                                <div className="home-buttons">
                                    <a href="/machining-checklist/measure">
                                        <button className="home-nav">Measure</button>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="footer-bg">
                            <div className="footer-col">
                                <img className="ae-logo"  src={AELogo}/> by Automation Engineering 
                            </div>
                            <p>&copy; 2026 Shin-Etsu Magnetics Philippines, Inc. All rights reserved.</p>
                        </div>
                    </section>:
                viewOption === 'viewlist'?
                    <section className="">
                        <div>
                            <AllProcess data={allLot} clientIp={clientIp} model={modelsList}/>
                        </div>
                    </section>
                :null
            }
          </main>
        </>
          
    )
}

Dashboard.layout = page => <MainLayout>{page}</MainLayout>
