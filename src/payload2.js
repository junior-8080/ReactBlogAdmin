export const props3 = [

    {

        type:'text',
        label:'',
        placeholder: 'Customer Name',
        name:'name',
        required:true
       
    },
    {
        type:"email",
        name: "email",
        placeholder: "Email",
        label:'',
        required: true,
        isEmailError: 'Not and Email Adress',
    },
    {

        type:'number',
        label:'',
        placeholder: 'Amount',
        name:'amount',
        required:true 
       
    },
    {
        type: "option",
        label:'',
        keywords:[{label:'CEDIS',keyword:'cedis'},{label:'USD',keyword:'usd'},{label:'POUNDS',keyword:'pounds'}],
        name: "currency",
        required:true,
        placeholder: "Currency",


    },{
        type: "option",
        label:'',
        keywords: [{label:'Insyt',keyword:'insty'},{label:'Dfs',keyword:'dfs'}],
        name: "source",
        required:true,
        placeholder: "Source"
       

    },
    {
        type:"date",
        label:'',
        name:'invoice_date',
        required:true,
        placeholder:'Invoice Date'

    },
    {
        type: "option",
        placeholder: "Status", 
        label:'',
        keywords: [{label:'Paid',keyword:'paid'},{label:'Pending',keyword:'pending'},{label:'Processing',keyword:'processing'}],
        value:"processing",
        name: "status",
        disabled: true,
       

    }

]


export const formLayout = {
    labelSpan: 1,
    inputSpan: 24
    
}

