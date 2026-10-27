//return lowercase no spaces , no special characters
import ExcelJS from 'exceljs';
const removeUnwanted = (data) => {
    const removeWhites = data.replace(/\s+/g, "_").toLowerCase();
    const removeSpecialCharacters = removeWhites.replace(/[.~!@#$%^&*()/]/g, "_");
    return removeSpecialCharacters;
}

const emptyCount = (data) => {
    console.log('counting data: ', data)
    let currentEmpty = 0;
    if (!data) return 0
    Object.entries(data).map(([key, value]) => {
        if (value === '' || value === null) {
            currentEmpty += 1
        }
    })

    return currentEmpty;
}

const handleKeyDown = (e) => {
    if (e.key === "Enter") {
        e.preventDefault();

        const inputs = document.querySelectorAll("input");
        const arr = Array.from(inputs);
        let index = arr.indexOf(e.target);

        let next = index + 1;

        while (arr[next] && arr[next].disabled) {
            next++;
        }

        if (arr[next]) {
            arr[next].focus();
        }
    }
};



const resetData = (data) => {
    if (!data) return;
}

const barellingJudgement =(barelling_data,model)=>{
    console.log('Judgement Result: ',barelling_data , model);
    if(Object.keys(barelling_data).length <= 0) return;
    const results = []
    const targetValue = model.barelling_target ? Number(model.barelling_target) : 0;
    const targetMax = model.barelling_max ? Number(model.barelling_max) : 0;
    const targetMin = model.barelling_min ? Number(model.barelling_min) : 0;

    let allResult = {}
    console.log('Barelling Target: ' , targetValue, targetMax,targetMin);
    Object.entries(barelling_data).map(([key,values])=>{
        console.log('Barelling results:' , key , values);
       

        let max = 0;
        let min = 0;
        let count = 0 ;
        let average = 0;
        Object.entries(values).map(([key2,values])=>{
            console.log('magnets points: ',key2,values);

            if(values  <= 0) return;
            count += 1;
            average += Number(values) ;
            console.log('Averagexxx: ',values , average , count);
            const reultAverage = average / count;
            min = min === 0 ? values: values !== 0 && values < min ? values:min
            max = max === 0 ? values: values !== 0 && values > max ? values:max
            const minDif = Math.abs(targetValue - Number(min)) ?? 0 
            const maxDif = Math.abs(targetValue - Number(max)) ?? 0
            const worstValue = Math.abs(minDif)  > Math.abs(maxDif) ? min : max
            const subMax = minDif > maxDif ? minDif: maxDif
            const subMin = minDif < maxDif ? minDif: maxDif
            
            console.log('Current Min: ' , min);
            console.log('Current Max: ' , max);
            console.log('Worst: ' , targetValue - Number(min) , targetValue - Number(max) , worstValue);

            allResult = {
                            ...allResult , 
                            [key]: { 
                                        min: min, 
                                        max: max, 
                                        worst:worstValue, 
                                        max_diff:subMax >0 ? Number((subMax).toFixed(3)):subMax, 
                                        min_diff:subMin >0? Number((subMin).toFixed(3)):subMin, 
                                        average: reultAverage >0 ? Number((reultAverage).toFixed(3)) :reultAverage
                                    }
                        } 
        })
        console.log('Min Max Result: ',allResult);
    });
    return allResult;
}
const judgementResult = (value ,max, min )=>{
    const minData = min ? Number(min):0;
    const maxData = max ? Number(max):0;
    const judgement =   value < minData || value > maxData ?  'Reject'
                        :value <= maxData &&  value >= maxData - 0.01  || value >= minData &&  value <= minData + 0.01  ?  'Adjust'
                        :'Good'
        console.log('judgenment average: ' , value , minData ,maxData , judgement);
    return judgement;

}
const chamferValueComputed =(type ,value , details , number)=>{
    console.log('CHAMFER PROCESSING:',type , value,details,number);
    const cahmferType = type ?? 0;
    const dataValue = value ?Number(value) :0;
    const suffix =  number === '2'? number:'';
    const chamfermax = Number(details['chamfer_barelling_max' + suffix]);
    const chamfermin = Number(details['chamfer_barelling_min' + suffix]) + 0.001;
    const chamferResult = (cahmferType - dataValue) * cahmferType;
    console.log('Result chamfer: ',chamferResult,chamfermin,dataValue , details , number);

    if(chamferResult === 0) return '?';
    if(chamferResult < chamfermin ) return 'ADJUST';
    if(chamferResult > chamfermax  ) return 'REJECT';
    return 'GOOD';
}

const checkFormat = (data, process) => {
    console.log('checekk:', process, data);
    switch (process) {
        case 'barelling':
            
            const time1 = (data['timer'].timer_1 ? Number(data['timer'].timer_1) : 0) + (data['timer'].addition_timer_1 ? Number(data['timer'].addition_timer_1) : 0);
            const time2 = (data['timer'].timer_2 ? Number(data['timer'].timer_2) : 0) + (data['timer'].addition_timer_2 ? Number(data['timer'].addition_timer_2) : 0);
            const time3 = (data['timer'].timer_3 ? Number(data['timer'].timer_3) : 0) + (data['timer'].addition_timer_3 ? Number(data['timer'].addition_timer_3) : 0);

            const rotation_1 = data['timer'].rotation_1 ? Number(data['timer'].rotation_1) : 0 + data['timer'].addition_rotation_1 ? Number(data['timer'].addition_rotation_1) : 0;
            const rotation_2 = data['timer'].rotation_2 ? Number(data['timer'].rotation_2) : 0 + data['timer'].addition_rotation_2 ? Number(data['timer'].addition_rotation_2) : 0;
            const rotation_3 = data['timer'].rotation_3 ? Number(data['timer'].rotation_3) : 0 + data['timer'].addition_rotation_3 ? Number(data['timer'].addition_rotation_3) : 0;

            const machine = data['magnet']['chamfer1']['machine'] ? data['magnet']['chamfer1']['machine'] : data['magnet']['chamfer2']['machine'] ? data['magnet']['chamfer2']['machine'] : 'Not Found'
            const chamferValue = {
                                        'R- CHAMFER': 2.415,
                                        'C - Chamfer': 1.414,
                                        'REF. VAL.': 0.207
                                    }
            
            const chamferType = data["model"]["chamfer_type"];
            
            const chamferResult = chamferValue[chamferType];
            const chamfer1 = data['magnet']['chamfer1'] ? ['Point A:', data['magnet']['chamfer1']['m1'], data['magnet']['chamfer1']['m2'], data['magnet']['chamfer1']['m3'], data['magnet']['chamfer1']['m4'], data['magnet']['chamfer1']['m5'],chamferValueComputed(chamferResult, data['magnet']['chamfer1']['m1'],data["model"],'1'),chamferValueComputed(chamferResult, data['magnet']['chamfer1']['m2'],data["model"],'1'),chamferValueComputed(chamferResult, data['magnet']['chamfer1']['m3'],data["model"],'1'),chamferValueComputed(chamferResult, data['magnet']['chamfer1']['m4'],data["model"],'1'),chamferValueComputed(chamferResult, data['magnet']['chamfer1']['m5'],data["model"],'1')] : null
            const chamfer2 = data['magnet']['chamfer2'] ? ['Point B:', data['magnet']['chamfer2']['m1'], data['magnet']['chamfer2']['m2'], data['magnet']['chamfer2']['m3'], data['magnet']['chamfer2']['m4'], data['magnet']['chamfer2']['m5'],chamferValueComputed(chamferResult, data['magnet']['chamfer2']['m1'],data["model"],'1'),chamferValueComputed(chamferResult, data['magnet']['chamfer2']['m2'],data["model"],'1'),chamferValueComputed(chamferResult, data['magnet']['chamfer2']['m3'],data["model"],'2'),chamferValueComputed(chamferResult, data['magnet']['chamfer2']['m4'],data["model"],'2'),chamferValueComputed(chamferResult, data['magnet']['chamfer2']['m5'],data["model"],'2')] : null
            
            const barellingResult = barellingJudgement(data['magnet'],data['model']);
           
            console.log('Computation Barelling Result: ' ,barellingResult);
            
            return [
                ['Model:', data['model']['model']],
                [''],
                ['Processing Details'],
                ['Date', data['common']['date'], 'Shift', data['common']['shift'], 'Operator:', data['common']['operator_name']],
                [''],
                ['Barelling Details'],
                ['Lot Number:', data['barelling'].datalist_lot_number, 'Media Size:', data['barelling'].media_size, 'GC Powder:', data['barelling'].gc_powder],
                ['Total Batch/Lot:', data['barelling'].total_qty_lot, 'Media Weight:', data['barelling'].media_weight, 'Chamfertype:', data['barelling'].chamfertype, 'Contracer serial #:', data['barelling'].contracer_serial],
                ['Total Qty/Batch:', data['barelling'].total_qty_batch, 'Coolant Level:', data['barelling'].coolant_level, 'Magnet wt/pc.:', data['barelling'].magnet_wt_pc_, 'Micrometer serial #:', data['barelling'].micrometer_serial],
                ['Total Wt/Batch:', data['barelling'].total_wt_batch, 'Styrene Powder:', data['barelling'].styrene_powder, 'Chamfer jig serial #:', data['barelling'].chamfer_jig_serial],
                [''],
                ['Barelling Time'],
                ['T1', 'Time:', time1, 'Rotation:', rotation_1],
                ['T2', 'Time:', time2, 'Rotation:', rotation_2],
                ['T3', 'Time:', time3, 'Rotation:', rotation_3],
                [''],
                ['Chamfering'],
                [''],
                ['Machine:', machine],
                ['Point', 'Magnet 1', 'Magnet 2', 'Magnet 3', 'Magnet 4', 'Magnet 5','Magnet 1', 'Magnet 2', 'Magnet 3', 'Magnet 4', 'Magnet 5'],
                chamfer1, chamfer2,
                [''],
                ['Barelling Thickness' ,'Minimum:' +  data['model']['barelling_min'], 'Target:'+ data['model']['barelling_target'] ?? '?', , 'Maximum:' + data['model']['barelling_max']],
                ['Actual Dimension'],
                ['No', 'Pt .1', 'Pt .2', 'Pt .3', 'Pt .4', 'Pt .5','Worst' ,'Maximum', 'Minimum' , 'Target' , ' Max Diff' ,'Min Diff' ,'Average' , 'Judegement'],
                ['1', data['magnet']['magnet_1']['p1'] ?? 0, data['magnet']['magnet_1']['p2'] ?? 0, data['magnet']['magnet_1']['p3'] ?? 0, data['magnet']['magnet_1']['p4'] ?? 0, data['magnet']['magnet_1']['p5'] ?? 0, barellingResult['magnet_1']['worst'] ?? '?', barellingResult['magnet_1']['max'] ?? '?', barellingResult['magnet_1']['min'] ?? '?', data['model']['barelling_target'] ?? '?', barellingResult['magnet_1']['max_diff'] ?? '?', barellingResult['magnet_1']['min_diff']?? '?', barellingResult['magnet_1']['average'], judgementResult(barellingResult['magnet_1']['average'],data['model']['barelling_max'],data['model']['barelling_min'])],
                ['2', data['magnet']['magnet_2']['p1'] ?? 0, data['magnet']['magnet_2']['p2'] ?? 0, data['magnet']['magnet_2']['p3'] ?? 0, data['magnet']['magnet_2']['p4'] ?? 0, data['magnet']['magnet_2']['p5'] ?? 0, barellingResult['magnet_2']['worst'] ?? '?', barellingResult['magnet_2']['max'] ?? '?', barellingResult['magnet_2']['min'] ?? '?', data['model']['barelling_target'] ?? '?', barellingResult['magnet_2']['max_diff'] ?? '?', barellingResult['magnet_2']['min_diff']?? '?', barellingResult['magnet_2']['average'], judgementResult(barellingResult['magnet_2']['average'],data['model']['barelling_max'],data['model']['barelling_min'])],
                ['3', data['magnet']['magnet_3']['p1'] ?? 0, data['magnet']['magnet_3']['p2'] ?? 0, data['magnet']['magnet_3']['p3'] ?? 0, data['magnet']['magnet_3']['p4'] ?? 0, data['magnet']['magnet_3']['p5'] ?? 0, barellingResult['magnet_3']['worst'] ?? '?', barellingResult['magnet_3']['max'] ?? '?', barellingResult['magnet_3']['min'] ?? '?', data['model']['barelling_target'] ?? '?', barellingResult['magnet_3']['max_diff'] ?? '?', barellingResult['magnet_3']['min_diff']?? '?', barellingResult['magnet_3']['average'], judgementResult(barellingResult['magnet_3']['average'],data['model']['barelling_max'],data['model']['barelling_min'])],
                ['4', data['magnet']['magnet_4']['p1'] ?? 0, data['magnet']['magnet_4']['p2'] ?? 0, data['magnet']['magnet_4']['p3'] ?? 0, data['magnet']['magnet_4']['p4'] ?? 0, data['magnet']['magnet_4']['p5'] ?? 0, barellingResult['magnet_4']['worst'] ?? '?', barellingResult['magnet_4']['max'] ?? '?', barellingResult['magnet_4']['min'] ?? '?', data['model']['barelling_target'] ?? '?', barellingResult['magnet_4']['max_diff'] ?? '?', barellingResult['magnet_4']['min_diff']?? '?', barellingResult['magnet_4']['average'], judgementResult(barellingResult['magnet_4']['average'],data['model']['barelling_max'],data['model']['barelling_min'])],
                ['5', data['magnet']['magnet_5']['p1'] ?? 0, data['magnet']['magnet_5']['p2'] ?? 0, data['magnet']['magnet_5']['p3'] ?? 0, data['magnet']['magnet_5']['p4'] ?? 0, data['magnet']['magnet_5']['p5'] ?? 0, barellingResult['magnet_5']['worst'] ?? '?', barellingResult['magnet_5']['max'] ?? '?', barellingResult['magnet_5']['min'] ?? '?', data['model']['barelling_target'] ?? '?', barellingResult['magnet_5']['max_diff'] ?? '?', barellingResult['magnet_5']['min_diff']?? '?', barellingResult['magnet_5']['average'], judgementResult(barellingResult['magnet_5']['average'],data['model']['barelling_max'],data['model']['barelling_min'])]
            ]
            break;
        default:
            break;
    }
}

const bankCells = (process) => {
    switch (process) {
        case 'barelling':
            return [
                {
                    cell: ['A'],
                    start: 1,
                    end: 6
                },
                {
                    cell: ['A', 'C', 'E', 'G'],
                    start: 4,
                    end: 10
                },
                {
                    cell: ['A'],
                    start: 12,
                    end: 12
                },
                {
                    cell: ['A', 'B', 'D'],
                    start: 13,
                    end: 15
                },
                {
                    cell: ['A'],
                    start: 17,
                    end: 22
                },
                {
                    cell: ['A', 'B', 'C', 'D', 'E', 'F','G' , 'H','I', 'J','K'],
                    start: 19,
                    end: 20
                },
                {
                    cell: ['A', 'B', 'C', 'D', 'E', 'F','G','H','I','J','K','L','M','N'],
                    start: 24,
                    end: 26
                },
                {
                    cell: ['A'],
                    start: 27,
                    end: 30
                },
            ]
        default:
            return false;
    }
}

const handleDownloadAll = async (data, process) => {
    console.log('SAVE:', data, checkFormat(data, process));
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Users List');


    const dataSave = checkFormat(data, process);
    if (dataSave.length <= 0) return;


    const colorCell = bankCells(process);

    let allCells = [];

    colorCell.map((items) => {
        console.log('stylexx: ', items);
        if (!items || Object.keys(items).length === 0) return;
        const arrayHead = items.cell;
        const startCell = items.start ?? 1;
        const endCell = items.end ?? 1;
        const countCells = (endCell - startCell) + 1;
        arrayHead.map((cell) => {
            console.log('coordinate: ', cell, 'Count: ', countCells);
            Array.from({ length: countCells }, (_, index) => {
                console.log(cell + index + 1);
                const cellNumber = index + startCell
                allCells.push(cell + cellNumber)
            })
        })

    })

    console.log(allCells);

    worksheet.columns = [
        { width: 15 },
        { width: 15 },
        { width: 15 },
        { width: 15 },
        { width: 15 },
        { width: 15 },
        { width: 15 },
        { width: 15 },
        { width: 15 },
        { width: 15 },
        { width: 15 },
        { width: 15 },
        { width: 15 },
        { width: 15 },
    ];

    dataSave.forEach((rowArray) => {
        worksheet.addRow(rowArray);
    });
    allCells.forEach((coordinate) => {
        console.log('Coordinate: ', coordinate);
        const cell = worksheet.getCell(coordinate);
        cell.font = {
            bold: true
        };
    })


    const filename = `${process}.xlsx`;

    const buffer = await workbook.xlsx.writeBuffer();

    const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });


    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = filename;

    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    window.URL.revokeObjectURL(url);

};

export { removeUnwanted, emptyCount, handleKeyDown, handleDownloadAll }
