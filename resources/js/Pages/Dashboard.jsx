import MainLayout from "../Layouts/MainLayout"

export default function Dashboard(){

    return(
          <div>
            <div>
                <h1>Dashboard - Machining Checklist</h1>
            </div>
          </div>
    )
}

Dashboard.layout = page => <MainLayout>{page}</MainLayout>
