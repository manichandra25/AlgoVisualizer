var s=100,n;
const lis=0;
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
document.addEventListener('DOMContentLoaded', function() {
    const sortingController = SortingController();

    document.getElementById("rsrt").addEventListener("click", sortingController.restart);
    document.getElementById("strt").addEventListener("click", sortingController.toggleSort);
    document.getElementById("pause").addEventListener("click", sortingController.togglePause);
    document.getElementById("c").style.display = "block";
    document.getElementById("wc").addEventListener("click", sortingController.restart);
    document.getElementById("bc").addEventListener("click", sortingController.restart);
    document.getElementById("ac").addEventListener("click", sortingController.restart);
    document.getElementById("find").addEventListener("input", sortingController.restart);
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

    async function tersrch() {
        const arr = document.getElementById("arr");
         n = arr.rows[1].cells.length;
        document.getElementById("msg").style.borderColor="red";
        f=document.getElementById("find").value;
        document.getElementById("msg").style.borderColor="black";
        if (cancelRequested) return;
        var s1=0,s2=n-1,mid1,mid2;
        for (var k = 0; k < n; k++) {
        arr.rows[2].cells[k].classList.remove("comp");
        arr.rows[2].cells[k].classList.remove("ash");
        arr.rows[2].cells[k].classList.remove("sorted");
        arr.rows[1].cells[k].innerHTML="";
        arr.rows[2].cells[k].style.background="";
        }
        while(s1<=s2)
        {
            if (cancelRequested) return;
            if (paused) {
                while (paused) {
                    await delay(100);
                }
            }
            mid1=s1+parseInt((s2-s1)/3,10);
            mid2=s2-parseInt((s2-s1)/3,10);
            if (cancelRequested) return;
            if (paused) {
                while (paused) {
                    await delay(100);
                }
            }
            arr.rows[1].cells[mid1].innerHTML="Mid1";
            arr.rows[1].cells[mid2].innerHTML="Mid2";
            arr.rows[1].cells[mid1].classList.add("swp");
            arr.rows[1].cells[mid2].classList.add("swp");
            await delay(10*s);
            if (cancelRequested) return;
            if (paused) {
                while (paused) {
                    await delay(100);
                }
            }
            if(parseInt(arr.rows[2].cells[mid1].innerHTML)==f)
            {
                if (cancelRequested) return;
                if (paused) {
                    while (paused) {
                        await delay(100);
                    }
                }
                restart();
                document.getElementById("msg").style.borderColor="red";
                document.getElementById("msg").innerHTML="<br>"+f+" found at position "+mid1;
                arr.rows[2].cells[mid1].style.background="blue";
                return;
            }
            if(parseInt(arr.rows[2].cells[mid2].innerHTML)==f)
            {
                if (cancelRequested) return;
                if (paused) {
                    while (paused) {
                        await delay(100);
                    }
                }
                restart();
                document.getElementById("msg").style.borderColor="red";
                document.getElementById("msg").innerHTML="<br>"+f+" found at position "+mid2;
                arr.rows[2].cells[mid2].style.background="blue";
                return;
            }
            if(parseInt(arr.rows[2].cells[mid1].innerHTML)>f)
            {
                document.getElementById("msg").style.borderColor="red";
                document.getElementById("msg").innerHTML=f+" is less than mid1 value, Delete all elements from Mid1";
                for(var x=mid1;x<=s2;x++)
                {
                    if (cancelRequested) return;
                    if (paused) {
                        while (paused) {
                            await delay(100);
                        }
                    }
                    arr.rows[2].cells[x].classList.add("ash");
                    await delay(s);
                    if (cancelRequested) return;
                }
                s2=mid1-1;
            }
            else if(parseInt(arr.rows[2].cells[mid2].innerHTML)<f)
            {
                document.getElementById("msg").style.borderColor="red";
                document.getElementById("msg").innerHTML=f+" is greater than mid2 value, Delete all elements before Mid2";
                for(var x=s1;x<=mid2;x++)
                {
                    if (paused) {
                        while (paused) {
                            await delay(100);
                        }
                    }
                    arr.rows[2].cells[x].classList.add("ash");
                    await delay(s);
                    if (cancelRequested) return;
                    
                }
                s1=mid2+1;
            }
            else
            {
                document.getElementById("msg").style.borderColor="red";
                document.getElementById("msg").innerHTML=f+" is between Mid1 and Mid2 values, Delete all elements before Mid1 and after Mid2";
                for(var x=s1;x<=mid1;x++)
                {
                    if (cancelRequested) return;
                    if (paused) {
                        while (paused) {
                            await delay(100);
                        }
                    }
                    arr.rows[2].cells[x].classList.add("ash");
                    await delay(s);
                    if (cancelRequested) return;
                }
                for(var x=mid2;x<=s2;x++)
                {
                    if (cancelRequested) return;
                    if (paused) {
                        while (paused) {
                            await delay(100);
                        }
                    }
                    arr.rows[2].cells[x].classList.add("ash");
                    await delay(s);
                    if (cancelRequested) return;
                }
                s1=mid1+1;
                s2=mid2-1;
            }
            arr.rows[1].cells[mid1].classList.remove("swp");
            arr.rows[1].cells[mid2].classList.remove("swp");
            arr.rows[1].cells[mid1].innerHTML="";
            arr.rows[1].cells[mid2].innerHTML="";
            if (cancelRequested) return;
            if (paused) {
                while (paused) {
                    await delay(100);
                }
            }
            await delay(s*8);
        }
        restart();
        document.getElementById("msg").style.borderColor="red";
        document.getElementById("msg").innerHTML="<br>"+f+" not found in the array";
        
    }

    function toggleSort() {
        if (!running) {
            running = true;
            paused = false;
            cancelRequested = false;
            document.getElementById("strt").style.cursor="not-allowed";
            tersrch(); 
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
    function restart()
    {
        running = false;
        paused = false;
        cancelRequested = true;
        document.getElementById("msg").innerHTML="";
        document.getElementById("strt").style.cursor="pointer";
        document.getElementById("msg").style.borderColor="black";
        for (var k = 0; k < n; k++)
        {
            arr.rows[2].cells[k].classList.remove("comp");
            arr.rows[2].cells[k].classList.remove("ash");
            arr.rows[2].cells[k].classList.remove("swp");
            arr.rows[1].cells[k].classList.remove("swp");
            arr.rows[2].cells[k].classList.remove("sorted");
            arr.rows[1].cells[k].innerHTML="";
            arr.rows[2].cells[k].style.background="";
        }
    }

    return {
        toggleSort,
        togglePause,
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

async function cases(c)
{
    var msg;
    var arr = document.getElementById("arr");
    n = arr.rows[1].cells.length;
    const list=arr.rows[2];
    arr.innerHTML="";
    await delay(50);
    let x="<caption style='font-size: 25;color: aqua;'> <u>Algorithm Visualization </u></caption>";
    x+="<tr><td colspan='10'><label>Element to check ::  </label><input type='number' id='find' value=''></td></tr><tr>";
    for(var k=0;k<n;k++)
    {
        x+="<td></td>";
    }
    x+="</tr><tr id='ele'>";
    for(var k=0;k<n;k++)
    {
        x+=`<td>${list.cells[k].innerHTML}</td>`;
    }
    x+="</tr></table>"
    document.getElementById("arr").innerHTML=x;
    switch (parseInt(c)) {
        case 1:
            msg = "<div style='font-size:25px'><h3>Worst Case Example</h3><h4 style='color:orange'>In this case the element to Find is Last index Element or Element Not Present</h4></div>";
            document.getElementById('find').value=550;
            break;
        case 2:
            msg = "<div style='font-size:25px'><h3>Average case  Example</h3><h4 style='color:orange'>In this case the element to Find is at any index</h4></div>";
            document.getElementById('find').value=227;
            break;
        case 3:
            msg = "<div style='font-size:25px'><h3>Best Case Example</h3><h4 style='color:orange'>In this case the element to Find is at First index</h4></div>";
            document.getElementById('find').value=19;
            break;
    }
    document.getElementById("expla").innerHTML=msg;
}

function setSpeed()
{
    s=document.getElementById("speed").value;
}
