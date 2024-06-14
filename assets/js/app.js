const cl = console.log;

const stdform = document.getElementById("stdform");
const fnameControls = document.getElementById("fname");
const lnameControls = document.getElementById("lname");
const emailControls = document.getElementById("email");
const contactControls = document.getElementById("contact");
const submitbtn = document.getElementById("submitbtn");
const updatebtn = document.getElementById("updatebtn");
const stdcontainer = document.getElementById("stdcontainer");
const nostd = document.getElementById("nostd");



const templatingofstd = (arr)=>{
    let result = " ";

    arr.forEach((std,i) => {

        result += `<tr id="${std.stdId}">
                         <td>${i + 1}</td>
                         <td>${std.fname}</td>
                         <td>${std.lname}</td>
                         <td>${std.email}</td>
                         <td>${std.contact}</td>
                         <td>
                         <button class="btn btn-primary bg-sm " onclick="onEdit(this)">Edit</button>
                         </td>
                         <td>
                         <button class="btn btn-danger bg-sm" onclick="onRemove(this)">Remove</button>
                         </td>
                    </tr>`

    })

    stdcontainer.innerHTML = result;
}

let stdArr = JSON.parse(localStorage.getItem(`stdArr`)) || []

if(stdArr.length > 0){
    templatingofstd(stdArr);
}else{
  stdcontainer.closest(`table`).classList.add(`d-none`);
  nostd.classList.remove(`d-none`);
}

//Edit//

const onEdit = (ele) => {
    //cl(ele) => it gives a button but we want respective id 

    let editId = ele.closest(`tr`).id;

    localStorage.setItem(`editId`, editId); //For to get id one fun.scope to another. hence we use LS

    // to get a object from array//

    let editobj = stdArr.find(std => std.stdId === editId);

    //patch the object in form control//
    fnameControls.value = editobj.fname;
    lnameControls.value = editobj.lname;
    emailControls.value = editobj.email;
    contactControls.value = editobj.contact;

    //After patch the data we want a data update need show the update button//

    submitbtn.classList.add(`d-none`);
    updatebtn.classList.remove(`d-none`);

}


//Update//=> first bind a click event

//we want a id whose tr is edited i.e it is also a updateId//

//eventbind => object => stdarr=> LS=> UI

const onupdatestd = () => {

    let updateId = localStorage.getItem(`editId`);
    cl(updateId)

    let updateObj = {
        fname:fnameControls.value,
        lname:lnameControls.value,
        email:emailControls.value,
        contact:contactControls.value,
        stdId:updateId
    }

    //We want find a index no. of respective tr which id same as updatedId//

    let getIndex = stdArr.findIndex(std => std.stdId === updateId);

    stdArr[getIndex] = updateObj;

    //store in LS//
    localStorage.setItem(`stdArr`, JSON.stringify(stdArr));

    //show on UI//

    let tr = [...document.getElementById(updateId).children];
    // cl(tr);

    //we update only fname,lname,email and contact //

    tr[1].innerHTML = updateObj.fname;
    tr[2].innerHTML = updateObj.lname;
    tr[3].innerHTML = updateObj.email;
    tr[4].innerHTML = updateObj.contact;

    stdform.reset()

    submitbtn.classList.remove(`d-none`);
    updatebtn.classList.add(`d-none`);

}

//Remove//
const onRemove = (ele)=>{

    //to get a id//
    let removeId = ele.closest(`tr`).id;

    let getIndex = stdArr.findIndex(std => std.stdId === removeId );
    // cl(getIndex);

    stdArr.splice(getIndex,1);

    localStorage.setItem(`stdArr`, JSON.stringify(stdArr));

    ele.closest(`tr`).remove()

}

const generateUuid = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (character) => {
        const random = (Math.random() * 16) | 0;
        const value = character === "x" ? random : (random & 0x3) | 0x8;

        return value.toString(16);
    });
};






const onstdAdd = (eve) => {
    eve.preventDefault(); // It is for to stop refreshing
    // cl(`submitted`);

    //To create a newobject//
    let newstd = {
        fname:fnameControls.value,
        lname:lnameControls.value,
        email:emailControls.value,
        contact:contactControls.value,
        stdId:generateUuid()
    }

    //object push in array//
    stdArr.push(newstd);
    // cl(stdArr);

    stdcontainer.closest(`table`).classList.remove(`d-none`);
    nostd.classList.add(`d-none`);

    //store in LS//
    localStorage.setItem(`stdArr`, JSON.stringify(stdArr));


    //show on UI//Templating
    stdform.reset()
 
   // templatingofstd(stdArr); => by using templating tr is recreated , hence we will need to refactor

  //First create a tr and append in stdcontainer//

  let tr = document.createElement(`tr`);

  tr.id = newstd.stdId;

  tr.innerHTML = `<tr>
                         <td>${stdArr.length}</td>
                         <td>${newstd.fname}</td>
                         <td>${newstd.lname}</td>
                         <td>${newstd.email}</td>
                         <td>${newstd.contact}</td>
                         <td>
                         <button class="btn btn-primary bg-sm " onclick="onEdit(this)">Edit</button>
                         </td>
                         <td>
                         <button class="btn btn-danger bg-sm" onclick="onRemove(this)">Remove</button>
                         </td>
                    </tr>`
    
    stdcontainer.append(tr);

    swal.fire({
        title:`The new student ${newstd.fname} ${newstd.lname} data is added successfully`,
        timer:2500,
        icon:"success"
    })

}




 





stdform.addEventListener("submit", onstdAdd);
updatebtn.addEventListener("click", onupdatestd);