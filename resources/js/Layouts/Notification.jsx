export default function Notification({message , theme}){
    return(
        <div className='notif-container' style={{ background:theme === 'success-container' ? 'green':'red' }}>
            <div className="notification-message">
                <p>{message}</p>
            </div>
        </div>
    )
}
