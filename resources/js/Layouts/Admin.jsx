import { useState,useEffect   } from "react";
import { useForm } from "@inertiajs/react";
import Notification from "./Notification";
export default function Admin({ManagementContainer,setManagementContainer,ProcessMain,dataExist,availabilityCheck,setAvailabilityCheck}){
    const [notificationMessage,setNotificationMessage]=useState(null);
    const [updateData , setUpdateData ] = useState(null);
    const categories = {
                        'Model': [ "Model" , "Barelling" , "CGH(L)", "Lappingt" ,"Slicing", "Flatness Lapping","Parallelism Lapping" , "Height Lapping","Chamfer Barelling","Chamfer Type"],
                        'User' : ["Id Number","Name","Surname","I.P Address","Area", "Permission"],
                      }
    const specs = ["Target" , "Max" , "Min"];
    const singleUse = ["Flatness Lapping","Parallelism Lapping" , "Height Lapping","Model", "Name","Surname","I.P Address","Area","Id Number", "Permission","Chamfer Type"];
    const isNotNeeded = ["id", "proxy", "updated_at","password","created_at"];
    const chamfer = ['REF. VAL.', 'R- CHAMFER', 'C- CHAMFER'];

    useEffect(()=>{
        setTimeout(()=>{
            setNotificationMessage(null)
        },1000);
    },[notificationMessage]);
             console.log("Available Checking: ",availabilityCheck);
    const checkIfAllData=(data)=>{
        let countEmpty = 0;

        Object.entries(data).filter((items)=>!isNotNeeded.includes(items)).map(([key,value])=>{
            if(value === ''){
                countEmpty += 1;
            }
        });

        return countEmpty === 0;
    }

    const form = {
        Model:useForm({
            process:"",
            barelling_max: "",
            barelling_min: "",
            barelling_target: "",
            chamfer_barelling_max: "",
            chamfer_barelling_min: "",
            chamfer_barelling_target: "",
            cghl_max: "",
            cghl_min: "",
            cghl_target: "",
            flatness_lapping: "",
            height_lapping: "",
            lappingt_max: "",
            lappingt_min: "",
            lappingt_target: "",
            parallelism_lapping: "",
            slicing_max: "",
            slicing_min: "",
            slicing_target: "",
            chamfer_type:""
        }),
        User:useForm({
            process:"",
            area:"",
            ip_address:"",
            name:"",
            surname:"",
            permission:"normal",
            id_number:""
        })
    }


    useEffect(()=>{

        if (!dataExist) return;

        Object.entries(dataExist).map(([key,value])=>{
                console.log('data cchanges',dataExist,ManagementContainer);
            setUpdateData(key);
            if(!value)return;
            Object.entries(value).filter((items)=>!isNotNeeded.includes(items)).map(([keyInner,valueInner])=>{
                console.log('Notincluded:', key);
                form[key].setData(keyInner, valueInner);
            });
        });

    },[dataExist]);


    useEffect(()=>{
        if(!ManagementContainer.manage) return;
        form[ManagementContainer.manage].setData('process',ManagementContainer.manage);
        const accessUnique = ManagementContainer.manage === 'User' ? 'id_number':'model';
    },[ManagementContainer]);


    const onSubmit = (e,mainKey) => {
        e.preventDefault();
        console.log('hi',form["User"]["data"]);
        console.log(form["Model"]["data"]);

        if(!ManagementContainer.manage)return;
        console.log('Submitted' , form[ManagementContainer.manage]["data"]);

        let isCompleteData = 0;
        let countData = 0;
            Object.entries( form[ManagementContainer.manage].data).filter(([key,value])=>!isNotNeeded.includes(key)).map(([key,value])=>{
                countData += 1;
                if(isNotNeeded.includes(value)&& value === ''){
                    console.log('key',key,value);
                    isCompleteData += 1;
                }
            });

        if(isCompleteData === 0 ){
            console.log('heer one before posting!',isCompleteData);
            console.log('post data',form[ManagementContainer.manage].data);

            form[ManagementContainer.manage].post("/machining-checklist/user/create",  {
                preserveState: true,
                preserveScroll: true,
            });

        }else{
            setNotificationMessage({
                        title: 'hello',
                        message: `Please complete ${ManagementContainer.manage} all inputs required!`,
                    });
        }
    };



    const handleClick=(mainKey)=>{

        const clearInput = form[mainKey].data;
        setUpdateData(null);

        if(clearInput){

            Object.keys(clearInput).map((items)=>{
                console.log('items',items ,clearInput );
                items !== 'permission' ? form[mainKey].setData(items,'') : form[mainKey].setData(items,'normal');
            })
        }
        setTimeout (()=>{
            setManagementContainer('manage',mainKey);
        },200);

    }


    const handleUpdate=(mainKey)=>{
        console.log("----------------------------------------------------------------------");
        console.log(`-update-${mainKey}`,form[mainKey].data);
        if(!checkIfAllData(form[mainKey].data)) return;
        console.log("----------------------------------------------------------------------");
        console.log(checkIfAllData(form[mainKey].data));

        form[mainKey].put("/machining-checklist/user/update",{
            preserveScroll:true,preserveState:true, onSuccess: () =>
            {
                setNotificationMessage({
                    title: 'success-container',
                    message: `${mainKey} updated successfully!`,
                });
                setUpdateData(null);
                Object.keys( form[mainKey].data).filter((items)=> items !== 'process').map((items)=>{
                console.log('successss',items);
                items !== 'permission' ? form[mainKey].setData(items,'') : form[mainKey].setData(items,'normal');
                })
            },
            onError: (errors) => {
            console.log("Update errors:", errors);
        }})


    }

    const handleCheck=(mainKey)=>{
        console.log('Checkings: ',mainKey);

        if(!mainKey)return;
        form[mainKey].put('/machining-checklist/user/check',
                            {
                                preserveScroll:true,
                                preserveState:true,

                            });

    }

    const handleDelete=(mainKey)=>{
        if(!mainKey)return;

        form[mainKey].delete('/machining-checklist/user/delete',
                                {
                                    preserveScroll:true,
                                    preserveState:true,
                                    onSuccess: () =>
                                        {
                                            setNotificationMessage({
                                                title: 'success-container',
                                                message: `${mainKey} updated successfully!`,
                                            });
                                            setUpdateData(null);
                                            Object.keys( form[mainKey].data).filter((items)=> items !== 'process').map((items)=>{
                                            console.log('successss',items);
                                            items !== 'permission' ? form[mainKey].setData(items,'') : form[mainKey].setData(items,'normal');
                                            })
                                        },
                                });
    }
    return(

            <div className="inprocess-container">
                {
                    notificationMessage &&
                        <Notification message={notificationMessage.message} theme={notificationMessage.title}/>
                }
                {
                    Object.entries(categories).map(([mainKey,mainValue])=>{
                        console.log(ManagementContainer ,mainKey);
                        return(
                                <form id={mainKey} key={mainKey} onSubmit={onSubmit}>
                                    <div className="manage-container">
                                        <div className='inprocess-details'>
                                            <h1>{mainKey} Manager</h1>
                                            <input className="search-btn" placeholder={`Search ${mainKey} ...`} defaultValue={""}  disabled={mainKey !== ManagementContainer.manage}></input>
                                            <button type="button" className={mainKey === ManagementContainer.manage ? "add-btn" :"disabled-btn"}
                                                    onClick={(e)=>{
                                                        handleClick(mainKey);
                                                        setAvailabilityCheck(null);
                                                    }}
                                                    disabled={mainKey === ManagementContainer.manage}>  + Add {mainKey}</button>
                                        </div>
                                        <div className="manage-input">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        {
                                                            categories[mainKey]
                                                            .filter(items => singleUse.includes(items))
                                                            .map((items)=><th>{items}</th>)
                                                        }
                                                        {
                                                            categories[mainKey]
                                                            .filter(items => !singleUse.includes(items))
                                                            .map((items)=>
                                                                specs.map((specsData)=><th>{items}&nbsp;{specsData}</th>)
                                                            )
                                                        }
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        mainKey === ManagementContainer.manage ?
                                                        <tr>
                                                            {
                                                                categories[mainKey]
                                                                .filter(items => singleUse.includes(items))
                                                                .map((items)=>
                                                                    {
                                                                        const toId = items.toLocaleLowerCase();
                                                                        const replaceWhiteSpaces = toId.replace(/\s+/g,"_");
                                                                        const newId = replaceWhiteSpaces.replace(/[.~!@#$%^&*()]/g,"");
                                                                        const userDisplay = (!availabilityCheck && newId !== 'id_number');
                                                                        const modelDisplay = (!availabilityCheck && newId !== 'model');
                                                                        const dontDisabled =  newId === 'id_number' ?userDisplay : modelDisplay  ;
                                                                        console.log('Dispaly disabked: ',dontDisabled,items);
                                                                        return(
                                                                            <>
                                                                                {
                                                                                    items !== 'Permission' && items !== 'Chamfer Type' ?
                                                                                    <td><input
                                                                                        id={newId}
                                                                                        value={form[mainKey].data[newId]??""}
                                                                                        onChange={(e)=>form[mainKey].setData(newId,e.target.value)}
                                                                                        defaultValue={""}
                                                                                        className={newId === 'model' || newId === 'id_number' || availabilityCheck  ? "adding-input":"adding-disabled-input"}
                                                                                        disabled={(dontDisabled) }
                                                                                    /></td>:items === 'Chamfer Type' ?
                                                                                    <td>
                                                                                        <select
                                                                                            id={newId}
                                                                                            value={form[mainKey].data[newId]??""}
                                                                                            onChange={(e)=>form[mainKey].setData(newId,e.target.value)}
                                                                                            className={newId === 'model' || newId === 'id_number' || availabilityCheck  ? "adding-input":"adding-disabled-input"}
                                                                                            disabled={(dontDisabled) }
                                                                                        >
                                                                                            <option></option>
                                                                                            <option value="REF. VAL.">REF. VAL.</option>
                                                                                            <option value="R- CHAMFER">R- CHAMFER</option>
                                                                                            <option value="C- CHAMFER">C- CHAMFER</option>
                                                                                        </select>
                                                                                    </td>:
                                                                                    <td>
                                                                                        <select
                                                                                            className="adding-input"
                                                                                            id={newId} value={form[mainKey].data[newId]??""}
                                                                                            onChange={(e)=>form[mainKey].setData(newId,e.target.value)}
                                                                                            disabled={(dontDisabled) }>
                                                                                            <option value="normal" selected>Normal</option>
                                                                                            <option value="pic">PIC</option>
                                                                                            <option value="admin">Admin</option>
                                                                                            <option value="leader">Leader</option>
                                                                                            <option value="proxy">Proxy</option>
                                                                                        </select>
                                                                                    </td>
                                                                                }
                                                                            </>
                                                                        );

                                                                    })
                                                            }
                                                            {
                                                                categories[mainKey]
                                                                .filter(items => !singleUse.includes(items))
                                                                .map((items) => {
                                                                const toId = items.toLowerCase();
                                                                const replaceWhiteSpaces = toId.replace(/\s+/g,"_");
                                                                const newId = replaceWhiteSpaces.replace(/[()]/g, "");
                                                                    return specs.map((specsData) => {
                                                                        const combinedId = newId + "_" + specsData.toLowerCase();

                                                                        return (
                                                                            <td key={combinedId}>
                                                                                <input id={combinedId} value={form[mainKey].data[combinedId]??""} onChange={(e)=>form[mainKey].setData(combinedId,e.target.value)}  defaultValue={""} className={availabilityCheck || newId === 'model'  ? "adding-input":"adding-disabled-input"} disabled={(!availabilityCheck && newId !== 'model' )}/>
                                                                            </td>
                                                                        );
                                                                    });
                                                                })

                                                            }

                                                            <td>
                                                                {
                                                                    !availabilityCheck ?
                                                                        <button type="button" id="check" value={mainKey}  onClick={(e)=>handleCheck(mainKey)}  className="checking-input">Check</button>:
                                                                    mainKey !== updateData  ?
                                                                        <button type="submit" id="submit" value={mainKey} onSubmit={onSubmit} className="saving-input">Save</button>:
                                                                        <div className="button-container">
                                                                            <button type="button" id="update" value={mainKey} onClick={(e)=>handleUpdate(mainKey)} className="updating-input">Update</button>
                                                                            <button type="button" id="delete" value={mainKey} onClick={(e)=>handleDelete(mainKey)} className="deleting-input">Delete</button>
                                                                        </div>

                                                                }
                                                            </td>

                                                        </tr>:
                                                        <tr>

                                                            {
                                                                categories[mainKey]
                                                                .filter(items => singleUse.includes(items))
                                                                .map((items)=><td><input disabled={true} defaultValue={""} className="adding-disabled-input"/></td>)
                                                            }
                                                            {
                                                                categories[mainKey]
                                                                .filter(items => !singleUse.includes(items))
                                                                .map((items)=>
                                                                    specs.map((specsData)=><td ><input disabled={true}  defaultValue={""} className="adding-disabled-input" /></td>)
                                                                )
                                                            }
                                                            <td></td>
                                                        </tr>
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </form>
                        )
                    })
                }
            </div>

    );
}
