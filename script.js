const tipCalculator = () =>{
    const btns = document.querySelectorAll(".selection .tip-select");
    const billEl = document.querySelector("#bill");
    const numPeopleEl = document.querySelector("#people");
    const inputSelect = document.querySelector("input.tip-select");
    const resetBtn = document.querySelector(".btn.reset");
    const tipEl = document.querySelector(".final-amount__result-tip");
    const totalEl = document.querySelector(".final-amount__result-total");


    inputSelect.addEventListener("change", function (){
        removeClickedClass();
        inputSelect.classList.add("clicked");
        calcTip();
    })

    if(btns){
        btns.forEach(btn =>{
            btn.addEventListener('click', function() {
                removeClickedClass();
                btn.classList.add("clicked");
                calcTip();
            });
        })
    }
    if(billEl){
        billEl.addEventListener("change", function(){
            calcTip();
        })
    }
    if(numPeopleEl){
        numPeopleEl.addEventListener("change", function(){
            calcTip();
        })
    }
    if(resetBtn){
        resetBtn.addEventListener("click", function (){
            billEl.value = "";
            numPeopleEl.value = "";
            inputSelect.value = "";
            removeClickedClass();

            if(tipEl){
                tipEl.innerText = "$0.00";
            }
            if(totalEl){
                totalEl.innerText = "$0.00"
            }
        })
    }
    function removeClickedClass(){
        if(btns){
            btns.forEach(item =>{
                if(item.classList.contains("clicked")){
                    item.classList.remove("clicked");
                }
            })
        }
    }

    function calcTip(){
        const bill = document.querySelector("#bill").value;
        const tipBtn = document.querySelector(".tip-select.btn.clicked");
        const numPeople = document.querySelector("#people").value;
        const numPeopleHeading = document.querySelector(".h4-people");

        if(bill && numPeople){
            
            if(tipBtn){
                calcFromBtn()
            } else{
                calcFromInput()
            }
            
            function calcFromInput () {
                const tipBtn = document.querySelector(".tip-select.clicked");
                const numPeople = document.querySelector("#people").value;
                let tipBtnValue = tipBtn.value

                if(numPeople > 0){
                    const tipFinal = tipBtnValue / 100;
                    const totalBill = bill / numPeople;
                    const totalTip = totalBill * tipFinal;
                    const totalAmount = totalTip + totalBill;

                    displayResults(totalTip, totalAmount)

                } else {

                    if(numPeopleHeading){
                        numPeopleHeading.classList.add("alert")
                    }
                }
            }

            function calcFromBtn () {
                const tipBtn = document.querySelector(".tip-select.btn.clicked");
                const numPeople = document.querySelector("#people").value;
                let tipBtnValue = tipBtn.innerText

                if(numPeople > 0){
                    const matches = tipBtnValue.match(/(\d+)/);
                    const tipFinal = matches[0] / 100;
                    const totalBill = bill / numPeople;
                    const totalTip = totalBill * tipFinal;
                    const totalAmount = totalTip + totalBill;

                    displayResults(totalTip, totalAmount)

                } else {

                    if(numPeopleHeading){
                        numPeopleHeading.classList.add("alert")
                    }
                }
            }

            function displayResults(totalTip, totalAmount) {
                if (numPeopleHeading.classList.contains("alert")){
                    numPeopleHeading.classList.remove("alert");
                }
                if(tipEl){
                    tipEl.innerText = `$${totalTip.toFixed(2) }`;
                }
                if(totalEl){
                    totalEl.innerText = `$${totalAmount.toFixed(2) }`
                }
            }
        }
    }
}

tipCalculator();