import { SettingsIconMinimal,UserIcon,HomeIcon,BarChartIcon } from "../Icons/SVG";
export default function Navigation(){
   return(
        <div className="side-bar">
            <div className="side-upper">
                <div>
                    <UserIcon size={35} color={'#d7fefa'}/>
                </div>

                <nav className="nav-btn">
                    <a href="/machining-checklist/home"><HomeIcon color={'currentColor'}/></a>
                    <a href="/machining-checklist/measure"><BarChartIcon color={'currentColor'}/></a>
                </nav>
            </div>
            <div className="side-lower">
                <nav>
                    <a href="/machining-checklist/settings"><SettingsIconMinimal size={25} color={'currentColor'}/></a>
                </nav>
            </div>
        </div>
   )
}
