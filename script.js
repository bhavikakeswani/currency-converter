const BASE_URL='https://latest.currency-api.pages.dev/v1/currencies/'

const dropdowns=document.querySelectorAll('.dropdown select');
const btn=document.querySelector('form button');
const fromCurrency=document.querySelector('.from select');
const toCurrency=document.querySelector('.to select');
const msg=document.querySelector('.msg');

const updateExchangeRate = async () => {
    let amount=document.querySelector('.amount input');
    let amtVal=amount.value;
    if (amtVal==='' || amtVal<1){
        amtVal=1
        amount.value='1';
    }
    
    const URL= `${BASE_URL}${fromCurrency.value.toLowerCase()}.json`;

    let response= await fetch(URL);
    // console.log(response);
    let data= await response.json();
    // console.log(data);
    let exchangeRate=data[fromCurrency.value.toLowerCase()].inr
    // console.log(exchangeRate);
    let finalAmt=(amtVal*exchangeRate).toFixed(2);
    msg.innerText=`${amtVal} ${fromCurrency.value} = ${finalAmt} ${toCurrency.value}`;
}

const updateFlag = (element) => {
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    element.parentElement.querySelector('img').src=newSrc;
}

document.addEventListener('DOMContentLoaded',()=>{
    updateExchangeRate();
});

for (let select of dropdowns){
    for (Currcode in countryList){
        let newOption=document.createElement('option');
        newOption.innerText=Currcode;
        newOption.value=Currcode;
        if (select.name=='from' && Currcode=='USD'){
            newOption.selected=true;
        }
        else if (select.name=='to' && Currcode=='INR'){
            newOption.selected=true;
        }
        select.append(newOption);
    }  

    select.addEventListener('change',(evt)=>{
        updateFlag(evt.target);   
    });
}

btn.addEventListener('click', (e)=>{
    e.preventDefault(); //default behaviour of form is to reload the page on submit
    updateExchangeRate();
});