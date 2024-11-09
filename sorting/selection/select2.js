var s=100,n,lis=[];
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
document.addEventListener('DOMContentLoaded',function(){
    
    const sortingController = SortingController();

    document.getElementById("rsrt").addEventListener("click", sortingController.restartSorting);
    document.getElementById("strt").addEventListener("click", sortingController.toggleSort);
    document.getElementById("pause").addEventListener("click", sortingController.togglePause);
    document.getElementById("newA").addEventListener("click",sortingController.newArray);
    document.getElementById("c").style.display = "block";
    document.getElementById("wc").addEventListener("click", sortingController.restart);
    document.getElementById("bc").addEventListener("click", sortingController.restart);
    document.getElementById("ac").addEventListener("click", sortingController.restart);
    
    (document.getElementsByClassName("proglang"))[0].classList.add("active");
});

function SortingController() 
{
    let running = false; 
    let paused = false; 
    let cancelRequested = false; 

    s = 100; 

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function SelectionSort() 
    {
        if (cancelRequested) return;
        const arr = document.getElementById("arr");
        n = arr.rows[1].cells.length;
        for (var k = 0; k < n; k++) {
            arr.rows[1].cells[k].classList.remove("comp");
            lis.push(arr.rows[2].cells[k].innerHTML);
        }
        for (let i = 0; i < n; i++) 
        {
            if (cancelRequested) return;
            let min=i;
            arr.rows[1].cells[i].classList.add("swp");
            arr.rows[0].cells[i].innerHTML="Min";
            arr.rows[2].cells[i].style.background="blue";
            if (paused) {
                while (paused) {
                    await delay(100);
                }
            }
            arr.rows[1].cells[i].innerHTML=arr.rows[2].cells[i].innerHTML;
            for (let j = i+1; j < n; j++) 
            {
                if (cancelRequested) return;
                var a=parseInt(arr.rows[2].cells[j].innerHTML);
                arr.rows[2].cells[j].classList.add("comp");
                await delay(3*s);
                if (parseInt(a) < parseInt(arr.rows[1].cells[min].innerHTML)) {
                    arr.rows[1].cells[min].classList.remove("swp");
                    arr.rows[1].cells[min].innerHTML="";
                    arr.rows[0].cells[min].innerHTML="";
                    if (paused) {
                        while (paused) {
                            await delay(100);
                        }
                    }
                    await delay(4*s);
                    min=j;
                    if (paused) {
                        while (paused) {
                            await delay(100);
                        }
                    }
                    arr.rows[1].cells[j].classList.add("swp");
                    arr.rows[0].cells[j].innerHTML="Min";
                    arr.rows[1].cells[j].innerHTML=arr.rows[2].cells[j].innerHTML;
                }
                else{
                    await delay(3*s);
                }
                
                if (paused) {
                    while (paused) {
                        await delay(100);
                    }
                }
                arr.rows[2].cells[j].classList.remove("comp");
            } 
            if (cancelRequested) return;
            document.getElementById("msg").style.borderColor="red";
            document.getElementById("msg").innerHTML="Minimum is : "+arr.rows[2].cells[min].innerHTML+"<br>Swap it with "+i+"th position element";
            if (paused) {
                while (paused) {
                    await delay(100);
                }
            }
            await delay(s*10);
            if (paused) {
                while (paused) {
                    await delay(100);
                }
            }
            arr.rows[1].cells[min].classList.remove("swp");
            document.getElementById("msg").innerHTML="";
            document.getElementById("msg").style.borderColor="black";
            arr.rows[2].cells[min].innerHTML=arr.rows[2].cells[i].innerHTML;
            arr.rows[2].cells[i].innerHTML=arr.rows[1].cells[min].innerHTML;
            arr.rows[0].cells[min].innerHTML="";
            arr.rows[1].cells[min].innerHTML="";
            s2=i+1;
            if (paused) {
                while (paused) {
                    await delay(100);
                }
            }
            arr.rows[2].cells[i].style.background="";
            arr.rows[2].cells[i].classList.add("sorted");
        }
        restart();
    }

    function toggleSort() {
        if (!running) {
            running = true;
            paused = false;
            cancelRequested = false;
            document.getElementById("strt").style.cursor="not-allowed";
            SelectionSort(); 
        } else {
            paused = false; 
        }
    }

    function togglePause() {
        if (running) {
            if(!paused)
                document.getElementById("pause").innerHTML="Resume";
            else
                document.getElementById("pause").innerHTML="Pause";
            paused=!paused;
             
        }
    }

    function restartSorting() {
        running = false;
        paused = false;
        cancelRequested = true;
        document.getElementById("pause").innerHTML="Pause";
        document.getElementById("strt").style.cursor="pointer";
        document.getElementById("msg").innerHTML="";
        document.getElementById("expla").innerHTML="";
        document.getElementById("msg").style.borderColor="black";
        for (var k = 0; k < n; k++)
        {
            arr.rows[2].cells[k].innerHTML=lis[k];
            arr.rows[2].cells[k].classList.remove("sorted");
            arr.rows[2].cells[k].classList.remove("swp");
            arr.rows[2].cells[k].classList.remove("comp");
            arr.rows[1].cells[k].classList.remove("sorted");
            arr.rows[1].cells[k].classList.remove("swp");
            arr.rows[1].cells[k].innerHTML="";
            arr.rows[2].cells[k].style.background="";
            arr.rows[0].cells[k].innerHTML="";
        }
    }

    function restart()
    {
        running = false;
        paused = false;
        cancelRequested = true;
        document.getElementById("msg").innerHTML="";
        document.getElementById("strt").style.cursor="pointer";
        document.getElementById("pause").innerHTML="Pause";
        document.getElementById("msg").style.borderColor="black";
        for (var k = 0; k < n; k++)
        {
            arr.rows[2].cells[k].classList.remove("sorted");
            arr.rows[2].cells[k].classList.remove("swp");
            arr.rows[2].cells[k].classList.remove("comp");
            arr.rows[1].cells[k].classList.remove("sorted");
            arr.rows[1].cells[k].classList.remove("swp");
            arr.rows[1].cells[k].innerHTML="";
            arr.rows[2].cells[k].style.background="";
            arr.rows[0].cells[k].innerHTML="";
        }
    }

    function newArray()
    {
        running = false;
        paused = false;
        cancelRequested = true;
        document.getElementById("msg").innerHTML="";
        document.getElementById("msg").style.borderColor="black";
        n=parseInt(document.getElementById("find").value);
        document.getElementById("arr").innerHTML="";
        document.getElementById("expla").innerHTML="";
        let randomNumbers = Array.from({length: n}, () => Math.floor(Math.random() * 100) + 1);
        let x="<caption style='font-size: 25;color: aqua;'> <u>Algorithm Visualization </u></caption><tr>";
        for(var k=0;k<n;k++)
        {
            x+="<td></td>";
        }
        x+="</tr><tr>";
        for(var k=0;k<n;k++)
        {
            x+="<td></td>";
        }
        x+="</tr><tr id='ele'>";
        for(var k=0;k<n;k++)
        {
            x+=`<td>${randomNumbers[k]}</td>`;
        }
        x+="</tr></table>"
        document.getElementById("arr").innerHTML=x;
    }
    return {
        toggleSort,
        togglePause,
        restartSorting,
        newArray,
        restart,
    };
}

async function updateArray(newArray) {
    var arr = document.getElementById("arr");
    inp=document.getElementById("cust").innerHTML;
    arr.innerHTML="";
    await delay(50);
    let x="<caption style='font-size: 25;color: aqua;'> <u>Algorithm Visualization </u></caption><tr>";
    for(var k=0;k<8;k++)
    {
        x+="<td></td>";
    }
    x+="</tr><tr>";
    for(var k=0;k<8;k++)
    {
        x+="<td></td>";
    }
    x+="</tr><tr id='ele'>";
    for(var k=0;k<8;k++)
    {
        x+=`<td>${newArray[k]}</td>`;
    }
    x+="</tr></table>"
    document.getElementById("arr").innerHTML=x;
    var c=newArray[8];
    var msg;
    switch (parseInt(c)) {
        case 1:
            msg = "<div style='font-size:25px'><h3>Worst Case Example</h3><h4 style='color:orange'>In this case the elements are in Reverse Sorted Order</h4></div>";
            break;
        case 2:
            msg = "<div style='font-size:25px'><h3>Average case  Example</h3><h4 style='color:orange'>In this case the elements are in Random Order</h4></div>";
            break;
        case 3:
            msg = "<div style='font-size:25px'><h3>Best Case Example</h3><h4 style='color:orange'>In this case the elements are in Sorted Order</h4></div>";
            break;
    }
    document.getElementById("expla").innerHTML = msg;
}

function smapcode(eve,langg)
{
    var tbs=document.getElementsByClassName("cntnt");
    for(var x=0;x<tbs.length;x++)
    {
        tbs[x].style.display="none";
    }
    var tablnk=document.getElementsByClassName("proglang");
    for(var x=0;x<tablnk.length;x++)
    {
        tablnk[x].classList.remove("active");
    }
    document.getElementById(langg).style.display="block";
    eve.currentTarget.classList.add("active");
}

function setSpeed()
{
    s=document.getElementById("speed").value;
}