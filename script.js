const form = document.getElementById("form");
const textInput=document.getElementById("textInput");
const typeInput=document.getElementById("typeInput");
const numberInput=document.getElementById("numberInput");
const msg=document.getElementById("msg");
const card=document.getElementById("card");
const add= document.getElementById("add");
const disp=document.getElementById("disp");

let remaining=0;
let inc=0;
let exp=0;
let data=[{}];


// const green= [#41CC71];
// const red= [#f7261f];

const color=()=>{
    item.type =="Income"? border-["#41CC71"]:border-["#f7261f"];
}

const formValid=()=>{
    if(textInput.value==="" ||typeInput.value==="" || numberInput.value==="" )
    {
       msg.innerHTML=`<h1>Please enter the values before submit😉</h1>`
    }
    else{
        msg.innerHTML="";
        storage();
        // total();
        add.setAttribute("data-bs-dismiss","modal");
        add.click();
        (()=>{
            add.setAttribute("data-bs-dismiss","")
        })();
    }
}

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    formValid();

})



//storing the vlue in local storage

const storage =()=>{
    data.push({
       text:textInput.value,
       number:numberInput.value,
       type:typeInput.value
    });

    localStorage.setItem("data", JSON.stringify(data))
    // console.log("get",data)
    createCard();

}

//new card

const createCard=()=>{
    calc();
    card.innerHTML="";
    data.map((item,index)=>{
        return(
            card.innerHTML +=`
         <div id=${index} class=  "flex  justify-between items-center gap-2 bg-black rounded-lg text-white p-4 mb-4 min-h-8 break-words text-xs border-l-8  border-[#41CC71]" >
            <div>
            <p>${item.type}</p>
            <p class="text-center"> $ ${item.number}</p>
           </div>
           <div>
            <p >${item.text} </p>
           </div>
            <div class="flex gap-4 pr-2">
            <i class="fa-regular fa-pen-to-square"></i>
            <i class="fa-solid fa-trash"></i>
            </div>
        </div> 
        `

        )
    })
      reset();
}



// reseting the form 
const reset=()=>{
    textInput.value="",
    numberInput.value=""
};


const calc=()=>{

    data.map((ele) => {
        ele.type === "INCOME" ? (inc = inc +parseInt(ele.number)) : (exp = exp +parseInt(ele.number)); 
    })
     remaining= inc - exp;   
      console.log(remaining);
      console.log(inc);
      console.log(exp);
}



// calculating the values income and expense 


const total=()=>{
    console.log(exp,inc,remaining)

    disp.innerHTML=`<div  class=" flex flex-start items-center text-[20px] " >
                <i class="fa-solid fa-wallet text-[#3d7a5f] "></i>
             <p class="text-[#41CC71] font-medium px-2 "> $${remaining}</p>
            </div>
            <div  class="bg-black flex  justify-center text-white  p-2   rounded-md">
              <div class="border-dotted border-r-[1px] px-4">
                <p>INCOME</p>
                 <p class="text-[#41CC71] ">$${inc}</p>
            </div>
            <div class="px-4">
                <P>EXPENSE</P>
                 <p class="text-[#F73E34]">$${exp}</p>
            </div>   
            </div>`

}


// to display immediately

(()=>{
    data = JSON.parse(localStorage.getItem("data")) || [];
    createCard();
    total();
})();







