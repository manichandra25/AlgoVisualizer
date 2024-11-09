var s=100,n,lis=[],f=0,x;
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

    async function quick() 
    {
        var arr = document.getElementById("arr");
        n=arr.rows[1].cells.length;
        var a=[];
        for (var k = 0; k < n; k++) {
            arr.rows[1].cells[k].classList.remove("comp");
            lis.push(arr.rows[1].cells[k].innerHTML);
            a.push(parseInt(arr.rows[1].cells[k].innerHTML));
        }
        await quickSort(a,0,n-1);
        document.getElementById("pause").innerHTML="Pause";
        restart();
    }
    async function quickSort(a,l,h)
    {
        var arr = document.getElementById("arr");
        x=document.getElementById("msgs");
        var i,j,p,t;
        if (cancelRequested) return;
        if(l<h)
        {
            i=l;j=h;
            p=parseInt(arr.rows[1].cells[l].innerHTML);
            arr.rows[0].cells[l].classList.add("swp");
            arr.rows[0].cells[l].innerHTML="P";
            if (cancelRequested) return;
            while(i<j)
            {
                if (paused) {
                    while (paused) {
                        await delay(100);
                    }
                }
                arr.rows[2].cells[i].innerHTML="i";
                arr.rows[2].cells[j].innerHTML="j";
                while(i<h && a[i]<=p)
                {
                    x.rows[0].cells[0].style.background="red";
                    arr.rows[1].cells[i].classList.add("comp");
                    await delay(s*10);
                    if (cancelRequested) return;
                    if (paused) {
                        while (paused) {
                            await delay(100);
                        }
                    }
                    arr.rows[1].cells[i].classList.remove("comp");
                    arr.rows[1].cells[j].classList.remove("comp");
                    arr.rows[2].cells[i].innerHTML=""; 
                    i++;
                    if(i<=h)
                    arr.rows[2].cells[i].innerHTML="i";
                    x.rows[0].cells[0].style.background="";
                }
                
                while(j>0 && a[j]>p)
                {
                    x.rows[1].cells[0].style.background="red";
                    arr.rows[1].cells[j].classList.add("comp");
                    if (cancelRequested) return;
                    if (paused) {
                        while (paused) {
                            await delay(100);
                        }
                    }
                    arr.rows[1].cells[i].classList.add("comp");
                    arr.rows[1].cells[j].classList.add("comp");
                    await delay(s*10);
                    if (cancelRequested) return;
                    if (paused) {
                        while (paused) {
                            await delay(100);
                        }
                    }
                    arr.rows[1].cells[i].classList.remove("comp");
                    arr.rows[1].cells[j].classList.remove("comp");
                    arr.rows[2].cells[j].innerHTML="";
                    j--;
                    if(j>=0)
                    arr.rows[2].cells[j].innerHTML="j";
                    x.rows[1].cells[0].style.background="";
                }
                if(i<j)
                {
                    x.rows[2].cells[0].style.background="red";
                    if (cancelRequested) return;
                    if (paused) {
                        while (paused) {
                            await delay(100);
                        }
                    }
                    arr.rows[1].cells[i].classList.add("swp");
                    arr.rows[1].cells[j].classList.add("swp");
                    await delay(10*s);
                    if (cancelRequested) return;
                    if (paused) {
                        while (paused) {
                            await delay(100);
                        }
                    }
                    var temp=a[i];
                    a[i]=a[j];
                    a[j]=temp;
                    arr.rows[1].cells[i].innerHTML=a[i];
                    arr.rows[1].cells[j].innerHTML=a[j];
                    arr.rows[1].cells[i].classList.remove("swp");
                    arr.rows[1].cells[j].classList.remove("swp");
                    x.rows[2].cells[0].style.background="";
                }
            }
            x.rows[3].cells[0].style.background="red";
            arr.rows[1].cells[l].classList.add("swp");
            arr.rows[1].cells[j].classList.add("swp");
            await delay(10*s);
            if (cancelRequested) return;
            if (paused) {
                while (paused) {
                    await delay(100);
                }
            }
            var temp1=a[l];
            a[l]=a[j];
            a[j]=temp1;
            arr.rows[1].cells[l].innerHTML=a[l];
            arr.rows[1].cells[j].innerHTML=a[j];
            arr.rows[1].cells[j].classList.add("sorted");
            arr.rows[1].cells[l].classList.remove("swp");
            arr.rows[1].cells[j].classList.remove("swp");
            arr.rows[0].cells[l].classList.remove("swp");
            arr.rows[0].cells[l].innerHTML="";
            arr.rows[2].cells[i].innerHTML="";
            arr.rows[2].cells[j].innerHTML="";
            x.rows[3].cells[0].style.background="";
            await quickSort(a,l,j-1);
            await quickSort(a,j+1,h);
        }
        else if(l==h)
        {
            arr.rows[1].cells[l].classList.add("sorted");
        }
        if (paused) {
            while (paused) {
                await delay(100);
            }
        }
        
    }

    function toggleSort() {
        if (!running) {
            running = true;
            paused = false;
            cancelRequested = false;
            document.getElementById("strt").style.cursor="not-allowed";
            quick(); 
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
        document.getElementById("expla").innerHTML="";
        for (var k = 0; k < n; k++)
        {
            arr.rows[1].cells[k].innerHTML=lis[k];
            arr.rows[1].cells[k].classList.remove("sorted");
            arr.rows[1].cells[k].classList.remove("swp");
            arr.rows[1].cells[k].classList.remove("comp");
            arr.rows[0].cells[k].classList.remove("swp");
            arr.rows[0].cells[k].innerHTML="";
            arr.rows[2].cells[k].innerHTML="";
        }
        restart();
    }

    function restart()
    {
        running = false;
        paused = false;
        f=0;
        cancelRequested = true;
        document.getElementById("strt").style.cursor="pointer";
        document.getElementById("pause").innerHTML="Pause";
        for(var k=0;k<4;k++)
            x.rows[k].cells[0].style.background="";
        for (var k = 0; k < n; k++)
        {
            arr.rows[1].cells[k].classList.remove("sorted");
            arr.rows[1].cells[k].classList.remove("swp");
            arr.rows[1].cells[k].classList.remove("comp");
            arr.rows[0].cells[k].classList.remove("swp");
            arr.rows[0].cells[k].innerHTML="";
            arr.rows[2].cells[k].innerHTML="";
        }
    }

    function newArray()
    {
        running = false;
        paused = false;
        cancelRequested = true;
        n=parseInt(document.getElementById("find").value);
        document.getElementById("arr").innerHTML="";
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

async function updateArray(newArray) {
    var arr = document.getElementById("arr");
    inp=document.getElementById("cust").innerHTML;
    arr.innerHTML="";
    n=newArray.length;
    await delay(50);
    let x="<caption style='font-size: 25;color: aqua;'> <u>Algorithm Visualization </u></caption><tr>";
    for(var k=0;k<n-1;k++)
    {
        x+="<td></td>";
    }
    x+="</tr><tr id='ele'>";
    for(var k=0;k<n-1;k++)
    {
        x+=`<td>${newArray[k]}</td>`;
    }
    x+="</tr><tr>";
    for(var k=0;k<n-1;k++)
    {
        x+="<td></td>";
    }
    
    x+="</tr></table>"
    document.getElementById("arr").innerHTML=x;
    var c=newArray[n-1];
    var msg;
    switch (parseInt(c)) {
        case 1:
            msg = "<div style='font-size:25px'><h3>Worst Case Example</h3><h4 style='color:orange'>In this case the Pivot is selected"+
                " will be the smallest or the largest element so the elements are arranged in sorted order either in ascending or descending</h4></div>";
            break;
        case 2:
            msg = "<div style='font-size:25px'><h3>Average case  Example</h3><h4 style='color:orange'>In this case the elements are in Random Order </h4></div>";
            break;
        case 3:
            msg = "<div style='font-size:25px'><h3>Best Case Example</h3><h4 style='color:orange'>In this case the Pivot selected  should be the middle element</h4></div>";
            f=1;
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