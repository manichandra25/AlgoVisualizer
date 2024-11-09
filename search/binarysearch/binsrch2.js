var s=100,n;
const lis=0;

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
document.addEventListener('DOMContentLoaded', function() {
    const sortingController = SortingController();

    document.getElementById("rsrt").addEventListener("click", sortingController.restartSorting);
    document.getElementById("strt").addEventListener("click", sortingController.toggleSort);
    document.getElementById("pause").addEventListener("click", sortingController.togglePause);
    document.getElementById("c").style.display = "block";
    document.getElementById("wc").addEventListener("click", sortingController.restart);
    document.getElementById("bc").addEventListener("click", sortingController.restart);
    document.getElementById("ac").addEventListener("click", sortingController.restart);
    document.getElementById("find").addEventListener("input", sortingController.restartSorting);
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

    async function linsrch() {
        const arr = document.getElementById("arr");
         n = arr.rows[1].cells.length;
         if (cancelRequested) return;
         for (var k = 0; k < n; k++) {
            arr.rows[2].cells[k].classList.remove("comp");
            arr.rows[2].cells[k].classList.remove("ash");
            arr.rows[2].cells[k].classList.remove("sorted");
            arr.rows[1].cells[k].innerHTML="";
            arr.rows[2].cells[k].style.background="";
        }
        document.getElementById("msg").style.borderColor="red";
        f=document.getElementById("find").value;
        document.getElementById("msg").style.borderColor="black";
        if (cancelRequested) return;
        var s1=0,s2=n-1;

        while(s1<=s2)
        {
            if (cancelRequested) return;
            if (paused) {
                while (paused) {
                    await delay(100);
                }
            }
            var mid=parseInt((s1+s2)/2);
            if (cancelRequested) return;
            if(s1!=s2){
            document.getElementById("msg").innerHTML="";
            arr.rows[1].cells[s1].classList.add("swp");
            arr.rows[1].cells[s2].classList.add("sorted");
            arr.rows[1].cells[s1].innerHTML="Low";
            arr.rows[1].cells[s2].innerHTML="High";
            arr.rows[1].cells[mid].classList.add("comp");
            arr.rows[1].cells[mid].innerHTML="Mid";
            await delay(10*s);
            }
            if (cancelRequested) return;
            if (paused) {
                while (paused) {
                    await delay(100);
                }
            }
            document.getElementById("msg").style.borderColor="red";
            if(parseInt(arr.rows[2].cells[mid].innerHTML)>f)
            {
                document.getElementById("msg").style.width="310px";
                document.getElementById("msg").style.fontSize="18px";
                document.getElementById("msg").innerHTML="value = "+f+
                " is Smaller than mid value = "+arr.rows[2].cells[mid].innerHTML+
                "<br>Remove elements after mid position";
                if (cancelRequested) return;
                if (paused) {
                    while (paused) {
                        await delay(100);
                    }
                }
                await delay(10*s);
                for(var x=mid;x<=s2;x++)
                {
                    if (cancelRequested) return;
                    if (paused) {
                        while (paused) {
                            await delay(100);
                        }
                    }
                    arr.rows[2].cells[x].classList.add("ash");
                    await delay(s/2);
                }
                arr.rows[1].cells[s1].classList.remove("swp");
                arr.rows[1].cells[s2].classList.remove("sorted");
                arr.rows[1].cells[s1].innerHTML="";
                arr.rows[1].cells[s2].innerHTML="";
                s2=mid-1;
            }
            else if(f>parseInt(arr.rows[2].cells[mid].innerHTML))
            {
                document.getElementById("msg").style.width="300px";
                document.getElementById("msg").style.fontSize="18px";
                document.getElementById("msg").innerHTML="value = "+f+
                " is greater than mid value = "+arr.rows[2].cells[mid].innerHTML+
                "<br>Remove elements before mid position";
                await delay(10*document.getElementById("speed").value);
                if (cancelRequested) return;
                if (paused) {
                    while (paused) {
                        await delay(100);
                    }
                }
                for(var x=s1;x<=mid;x++)
                {
                    arr.rows[2].cells[x].classList.add("ash");
                    if (cancelRequested) return;
                    if (paused) {
                        while (paused) {
                            await delay(100);
                        }
                    }
                    await delay(parseInt(s/1.2));
                }
                
                arr.rows[1].cells[s1].classList.remove("swp");
                arr.rows[1].cells[s2].classList.remove("sorted");
                arr.rows[1].cells[s1].innerHTML="";
                arr.rows[1].cells[s2].innerHTML="";
                s1=mid+1;
            }
            else
            {
                if (cancelRequested) return;
                if (paused) {
                    while (paused) {
                        await delay(100);
                    }
                }
                restart();
                document.getElementById("msg").style.borderColor="red";
                document.getElementById("msg").innerHTML="Element "+f +" found at <br>Position = "+mid;
                arr.rows[2].cells[mid].style.background="blue";
                if (cancelRequested) return;
                if (paused) {
                    while (paused) {
                        await delay(100);
                    }
                }
                return;
            }
            arr.rows[1].cells[mid].classList.remove("comp");
            arr.rows[1].cells[mid].innerHTML="";
            if (cancelRequested) return;
            if (paused) {
                while (paused) {
                    await delay(100);
                }
            }
            await delay(10*s);
            document.getElementById("msg").innerHTML="";
            document.getElementById("msg").style.borderColor="black";
        }
        document.getElementById("expla").innerHTML="";
        arr.rows[1].cells[mid].classList.remove("sorted");
        arr.rows[1].cells[mid].classList.remove("swp");
        restart();
        document.getElementById("msg").style.borderColor="red";
        document.getElementById("msg").innerHTML="<br>"+f+" not found in the array";
        arr.rows[2].cells[mid].style.background="";
        if (cancelRequested) return;
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
            linsrch(); 
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
        document.getElementById("pause").innerHTML="Pause";
        document.getElementById("expla").innerHTML="";
        for (var k = 0; k < n; k++)
        {
            arr.rows[2].cells[k].classList.remove("comp");
            arr.rows[2].cells[k].classList.remove("swp");
            arr.rows[2].cells[k].classList.remove("sorted");
            arr.rows[1].cells[k].classList.remove("comp");
            arr.rows[1].cells[k].classList.remove("swp");
            arr.rows[1].cells[k].classList.remove("sorted");
            arr.rows[2].cells[k].classList.remove("ash");
            arr.rows[1].cells[k].innerHTML="";
            arr.rows[2].cells[k].style.background="";
        }
        document.getElementById("msg").innerHTML="";
        document.getElementById("msg").style.borderColor="black";
    }

    function restart()
    {
        running = false;
        paused = false;
        cancelRequested = true;
        document.getElementById("pause").innerHTML="Pause";
        for (var k = 0; k < n; k++)
        {
            arr.rows[2].cells[k].classList.remove("comp");
            arr.rows[2].cells[k].classList.remove("swp");
            arr.rows[2].cells[k].classList.remove("sorted");
            arr.rows[1].cells[k].classList.remove("comp");
            arr.rows[1].cells[k].classList.remove("swp");
            arr.rows[1].cells[k].classList.remove("sorted");
            arr.rows[2].cells[k].classList.remove("ash");
            arr.rows[1].cells[k].innerHTML="";
            arr.rows[2].cells[k].style.background="";
        }
        document.getElementById("msg").innerHTML="";
        document.getElementById("msg").style.borderColor="black";
    }

    return {
        toggleSort,
        togglePause,
        restartSorting,
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
    document.getElementById("msg").innerHTML="";
    document.getElementById("msg").style.borderColor="black";
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
            document.getElementById('find').value=10;
            break;
        case 3:
            msg = "<div style='font-size:25px'><h3>Best Case Example</h3><h4 style='color:orange'>In this case the element to Find is at First index</h4></div>";
            document.getElementById('find').value=18;
            break;
    }
    document.getElementById("expla").innerHTML=msg;
}

function setSpeed()
{
    s=document.getElementById("speed").value;
}
