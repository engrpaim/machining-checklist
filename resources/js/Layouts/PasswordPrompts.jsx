import { CrossIcon } from '../Icons/SVG';
export default function PasswordPrompts({detailsLot,setPasswordContainer,handlePICAllow,passwordContainer,handleClose}){

    return(
        <div className='pic-password'>
            <div className='enter-password'>
            <button onClick={(e)=>handleClose()}><CrossIcon color={'red'}/></button>
                <h4>NOTICE</h4>
                <p>{detailsLot.model}&nbsp;Lot No.&nbsp;<strong>{detailsLot.lot}</strong>&nbsp;already&nbsp;exist&nbsp;update data!</p>
                <div className='password-container'>
                <input type="password"  placeholder='Enter password' className='admin-pic' onKeyDown={(e)=> e.key === "Enter" && handlePICAllow(e.target.value.toUpperCase())} onChange={(e)=>setPasswordContainer('password',e.target.value)}></input>
                <button onClick={()=>{handlePICAllow(passwordContainer.password)}} >ENTER</button>
                </div>
                <p className='error-theme' style={{ fontStyle:'italic', fontWeight:'bold' }}>{passwordContainer.isCorrect}</p>
            </div>
        </div>
    )
}
