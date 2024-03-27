let bookName=document.getElementById("bookName")
let bookUrl=document.getElementById("bookUrl")
let tableSites=document.getElementById("tableSites")
let searchSite=document.getElementById("searchSite")
let btnSubmit=document.getElementById("btnSubmit")


let sites;
if(localStorage.getItem("list")==null){
    sites=[]
}else{
    sites=JSON.parse(localStorage.getItem("list"))
    display(sites)
}


function submit(){
    if(validation()==true&&validationTwo()==true){
        if(bookName.value==""||
           bookUrl.value==""){
             alert("type something")
        }else{
        if(isCheck==true){
            afterUpdate()
        }else{let obj={
            webName:bookName.value,
            webUrl:bookUrl.value,
        }
        sites.push(obj)}
        empty()
        }
        display(sites)
        localStorage.setItem("list",JSON.stringify(sites))
    }
    else{
        alert("not")
    }
}

function empty(){
        bookName.value=""
        bookUrl.value=""
}

function display(lista){
    let paper=""
    for(let i=0;i<lista.length;i++){
        paper+=` <tr>
        <td>${i+1}</td>
        <td>${lista[i].webName}</td>
        <td><button class="btn btn-primary" onclick="visit(${i})"><i class="fa-solid fa-upload"></i>Visit</button></td>
        <td><button class="btn btn-success" onclick="update(${i})"><i class="fa-solid fa-pen"></i>Update</button></td>
        <td><button class="btn btn-danger" onclick="delet(${i})"><i class="fa-solid fa-trash"></i> Delete</button></td>
    </tr>`
    }
    tableSites.innerHTML=paper
}

let currentIndex;
let isCheck=false;
function update(index){
    currentIndex=index
    bookName.value=sites[index].webName
    bookUrl.value=sites[index].webUrl
    btnSubmit.innerHTML="Add Update"
    isCheck=true
}

function afterUpdate(currentIndex){
    sites[currentIndex].webName=bookName.value
    sites[currentIndex].webUrl=bookUrl.value
    btnSubmit.innerHTML="Submit"
    isCheck=false
}

function delet(index){
    sites.splice(index,1)
    localStorage.setItem("list",JSON.stringify(sites))
    display(sites)
}

function search(parameter){
    let searchList=[];
    for(let i=0;i<sites.length;i++){
        if(sites[i].webName.toLowerCase().includes(parameter.toLowerCase())){
            searchList.push(sites[i]);
        }
    }
    display(searchList)
}

function visit(index){
    window.open(`https://www.${sites[index].webUrl}`)
}


function validation(){
    let regex=/^[A-z0-9]{3,}$/
    return(regex.test(bookName.value))
}


function validationTwo(){
    let regex2=/(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/|www\.)?[A-z0-9](\.[A-z0-9]{2,})(\.[a-zA-Z0-9]{2,})?/
    return(regex2.test(bookUrl.value))
}


