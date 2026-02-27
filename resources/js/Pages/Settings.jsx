import MainLayout from "../Layouts/MainLayout";

export default function SettingsIcon(){
    return(
        <div>
            <h1>Settings</h1>
        </div>
    )
}
SettingsIcon.layout = page => <MainLayout>{page}</MainLayout>
