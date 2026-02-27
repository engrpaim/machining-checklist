import MainLayout from "../Layouts/MainLayout";

export default function Measure(){
    return(
        <div>
            <h1>Machining Checklist Data</h1>
        </div>
    )
}

Measure.layout = page => <MainLayout>{page}</MainLayout>
