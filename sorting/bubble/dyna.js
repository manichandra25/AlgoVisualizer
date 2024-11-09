var s=100,n,lis=[];
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
document.addEventListener('DOMContentLoaded', function() {
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

function SortingController() {
    let running = false; 
    let paused = false; 
    let cancelRequested = false; 

    s = 100; 
    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function bubbleSort() {
        const arr = document.getElementById("arr");
         n = arr.rows[1].cells.length;
        for(var x=0;x<n;x++)
        {
            lis.push(arr.rows[1].cells[x].innerHTML);
        }
        document.getElementById("msg").style.borderColor="red";
        for (var k = 0; k < n; k++) {
            arr.rows[1].cells[k].classList.remove("comp");
        }
        for (let i = 0; i < n - 1; i++) 
        {
            if (cancelRequested) return;

            for (let j = 0; j < n - i - 1; j++) {
                if (cancelRequested) return;
                var a=parseInt(arr.rows[1].cells[j].innerHTML);
                var b=parseInt(arr.rows[1].cells[j+1].innerHTML);
                arr.rows[1].cells[j].classList.add("comp");
                arr.rows[1].cells[j + 1].classList.add("comp");
                if (paused) {
                    while (paused) {
                        await delay(100);
                    }
                }
                if (a>b) {
                    arr.rows[1].cells[j].classList.add("swp");
                    arr.rows[1].cells[j + 1].classList.add("swp");
                    document.getElementById("msg").innerHTML=a+" > "+b+" so <br> Swap ("+a+" , "+b +") positions";
                    if (paused) {
                        while (paused) {
                            await delay(100);
                        }
                    }
                    await delay(s*2);
                    arr.rows[0].cells[j].innerHTML=a;
                    arr.rows[2].cells[j+1].innerHTML=b;
                    await delay(s*2);
                    if (paused) {
                        while (paused) {
                            await delay(100);
                        }
                    }
                    arr.rows[0].cells[j].innerHTML="";
                    arr.rows[2].cells[j+1].innerHTML="";
                    if (paused) {
                        while (paused) {
                            await delay(100);
                        }
                    }
                    await delay(s*2);
                    arr.rows[1].cells[j].innerHTML=b;
                    arr.rows[1].cells[j+1].innerHTML=a;
                    await delay(s);
                    if (paused) {
                        while (paused) {
                            await delay(100);
                        }
                    }
                    arr.rows[1].cells[j].classList.remove("swp");
                    arr.rows[1].cells[j + 1].classList.remove("swp");
                    if (paused) {
                        while (paused) {
                            await delay(100);
                        }
                    }
                }
                else {
                    document.getElementById("msg").innerHTML = `${a} < ${b} so <br>No Swap`;
                    await delay(s * 9);
                }
                if (paused) {
                    while (paused) {
                        await delay(100);
                    }
                }
                arr.rows[1].cells[j].classList.remove("comp");
                arr.rows[1].cells[j + 1].classList.remove("comp");

                if (paused) {
                    while (paused) {
                        await delay(100); 
                    }
                }
            }
            if (cancelRequested) return;
            arr.rows[1].cells[n-i-1].classList.add("sorted");
        }
        document.getElementById("pause").innerHTML="Pause";
        restart();
    }

    function toggleSort() {
        if (!running) {
            running = true;
            paused = false;
            cancelRequested = false;
            document.getElementById("strt").style.cursor="not-allowed";
            bubbleSort(); 
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
        document.getElementById("strt").style.cursor="pointer";
        document.getElementById("msg").innerHTML="";
        document.getElementById("msg").style.borderColor="black";
        document.getElementById("pause").innerHTML="Pause";
        for (var k = 0; k < n; k++)
        {
            arr.rows[1].cells[k].innerHTML=lis[k];
            arr.rows[1].cells[k].classList.remove("sorted");
            arr.rows[1].cells[k].classList.remove("swp");
            arr.rows[1].cells[k].classList.remove("comp");
            arr.rows[0].cells[k].innerHTML="";
            arr.rows[2].cells[k].innerHTML="";
        }
    }

    function restart()
    {
        running = false;
        paused = false;
        cancelRequested = true;
        document.getElementById("msg").innerHTML="";
        document.getElementById("strt").style.cursor="pointer";
        document.getElementById("msg").style.borderColor="black";
        document.getElementById("pause").innerHTML="Pause";
        for (var k = 0; k < n; k++)
        {
            arr.rows[1].cells[k].classList.remove("swp");
            arr.rows[1].cells[k].classList.remove("comp");
            arr.rows[0].cells[k].innerHTML="";
            arr.rows[2].cells[k].innerHTML="";
            arr.rows[1].cells[k].classList.remove("sorted");
        }
    }

    async function newArray()
    {
        running = false;
        paused = false;
        cancelRequested = true;
        document.getElementById("msg").innerHTML="";
        document.getElementById("msg").style.borderColor="black";
        n=parseInt(document.getElementById("find").value);
        document.getElementById("arr").innerHTML="";
        await delay(50);
        document.getElementById("expla").innerHTML="";
        let randomNumbers = Array.from({length: n}, () => Math.floor(Math.random() * 100) + 1);
        let x="<caption style='font-size: 25;color: aqua;'> <u>Algorithm Visualization </u></caption><tr>";
        for(var k=0;k<n;k++)
        {
            x+="<td></td>";
        }
        x+="</tr><tr id='ele'>";
        for(var k=0;k<n;k++)
        {
            x+=`<td>${randomNumbers[k]}</td>`;
        }
        x+="</tr><tr>";
        for(var k=0;k<n;k++)
        {
            x+="<td></td>";
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

async function updateArray(newArray) {
    var arr = document.getElementById("arr");
    arr.innerHTML="";
    await delay(50);
    let x="<caption style='font-size: 25;color: aqua;'> <u>Algorithm Visualization </u></caption><tr>";
    for(var k=0;k<8;k++)
    {
        x+="<td></td>";
    }
    x+="</tr><tr id='ele'>";
    for(var k=0;k<8;k++)
    {
        x+=`<td>${newArray[k]}</td>`;
    }
    x+="</tr><tr>";
    for(var k=0;k<8;k++)
    {
        x+="<td></td>";
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

function setSpeed()
{
    s=document.getElementById("speed").value;
}
