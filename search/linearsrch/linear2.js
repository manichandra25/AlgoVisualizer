var s=100,n;
const lis=0;
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
        document.getElementById("msg").style.borderColor="red";
        f=document.getElementById("find").value;
        document.getElementById("msg").style.borderColor="black";
        if (cancelRequested) return;
        var s1=0;
        for (var k = 0; k < n; k++) {
        arr.rows[2].cells[k].classList.remove("comp");
        arr.rows[2].cells[k].classList.remove("ash");
        arr.rows[2].cells[k].classList.remove("sorted");
        arr.rows[1].cells[k].innerHTML="";
        arr.rows[2].cells[k].style.background="";
        }
        while(s1<n)
        {
            if (cancelRequested) return;
            document.getElementById("msg").innerHTML="";
            arr.rows[1].cells[s1].innerHTML=f;
            arr.rows[2].cells[s1].classList.add("comp");
            await delay(5*s);
            if (paused) {
                while (paused) {
                    await delay(100);
                }
            }
            if(parseInt(arr.rows[2].cells[s1].innerHTML)==f)
            {
                arr.rows[2].cells[s1].classList.add("sorted");
                arr.rows[1].cells[s1].classList.add("sorted");
                if (paused) {
                    while (paused) {
                        await delay(100);
                    }
                }
                await delay(6*s);
                if (cancelRequested) return;
                if (paused) {
                    while (paused) {
                        await delay(100);
                    }
                }
                arr.rows[2].cells[s1].classList.remove("sorted");
                arr.rows[1].cells[s1].classList.remove("sorted");
                arr.rows[1].cells[s1].innerHTML="";
                restart();
                document.getElementById("msg").style.borderColor="red";
                document.getElementById("msg").innerHTML="Element "+f +" found at <br>Position = "+s1;
                arr.rows[2].cells[s1].style.background="blue";
                return;
            }
            if (cancelRequested) return;
            if (paused) {
                while (paused) {
                    await delay(100);
                }
            }
            arr.rows[2].cells[s1].classList.remove("comp");
            arr.rows[2].cells[s1].classList.add("swp");
            arr.rows[1].cells[s1].classList.add("swp");
            await delay(6*s);
            
            arr.rows[2].cells[s1].classList.remove("swp");
            arr.rows[1].cells[s1].classList.remove("swp");
            arr.rows[1].cells[s1].innerHTML="";
            arr.rows[2].cells[s1].classList.add("ash");
            if (cancelRequested) return;
            if (paused) {
                while (paused) {
                    await delay(100);
                }
            }
            s1+=1;
        }
        if(s1==n)
        {
            arr.rows[1].cells[s1-1].classList.remove("swp");
            arr.rows[2].cells[s1-1].classList.remove("comp");
        }
        restart();
        document.getElementById("msg").style.borderColor="red";
        document.getElementById("msg").innerHTML="<br>Element "+f+" not found in the array";
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
        document.getElementById("msg").innerHTML="";
        document.getElementById("strt").style.cursor="pointer";
        document.getElementById("pause").innerHTML="Pause";
        document.getElementById("msg").style.borderColor="black";
        document.getElementById("expla").innerHTML="";
        for (var k = 0; k < n; k++)
        {
            arr.rows[2].cells[k].classList.remove("comp");
            arr.rows[2].cells[k].classList.remove("swp");
            arr.rows[1].cells[k].classList.remove("swp");
            arr.rows[2].cells[k].classList.remove("ash");
            arr.rows[2].cells[k].classList.remove("sorted");
            arr.rows[1].cells[k].innerHTML="";
            arr.rows[2].cells[k].style.background="";
        }
    }

    function restart()
    {
        running = false;
        paused = false;
        cancelRequested = true;
        document.getElementById("msg").innerHTML="";
        document.getElementById("pause").innerHTML="Pause";
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

function cases(c)
{
    var msg;
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
