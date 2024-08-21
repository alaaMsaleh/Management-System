//function create project
let productname = document.getElementById("productname");
let productcategry= document.getElementById("productcategry");
let productdescription = document.getElementById("productdescription");
let productprice = document.getElementById("productprice");
let addproduct = document.getElementById("addproduct").querySelector('button');
let searchInput = document.getElementById("search");

// console.log(productname ,productcategry ,productdescription ,productprice)

//create operation

//array to store Data
let dataProduct ;
if(localStorage.product != null){
    dataProduct =JSON.parse(localStorage.product)
}

else{
    dataProduct =[];
}

addproduct.onclick = function(){

    let newproduct={
        proname :productname.value,
        procategey:productcategry.value,
        prodescription: productdescription.value,
        proprice : productprice.value

    };
    dataProduct.push(newproduct);
    localStorage.setItem("product" , JSON.stringify(dataProduct))
    console.log(dataProduct);
    clearData()
    ShowData()

}

//clear input data
 function clearData()
 {

    productname.value="";
    productcategry.value="";
    productdescription.value="";
    productprice.value="";
 }

//read

function ShowData()
{
    let table ='';
    for(let i = 0 ; i< dataProduct.length ;i++ ){
    
        table += `
        <tr>
        <td>${i+1}</td>
        <td>${dataProduct[i].proname}</td>
        <td>${dataProduct[i].procategey}</td>
        <td>${dataProduct[i].procategey}</td>
        <td>${dataProduct[i].proprice }</td>
        <td>
            <button  onclick="updateProduct(${i})" class="btn btn-warning">updata</button>
        </td>
        <td>
            <button onclick="Delete(${i})" id="delete"class="btn btn-danger">Delete</button>
        </td>
    </tr>

        `;
        
    }
    document.getElementById('soso').innerHTML = table;

}

function Delete(indexe){
    dataProduct.splice(indexe,1);
    localStorage.product = JSON.stringify(dataProduct);
    ShowData()


}

function  updateProduct(index){

productname.value = dataProduct[index].proname;
    productcategry.value = dataProduct[index].procategey;
    productdescription.value = dataProduct[index].prodescription;
    productprice.value = dataProduct[index].proprice;

   
    window.scrollTo({ top: 0, behavior: 'smooth' });

   
    let updateBtn = document.createElement("button");
    updateBtn.textContent = "Save Changes";
    updateBtn.className = "btn btn-success";
    
    
    updateBtn.onclick = function () {
        dataProduct[index] = {
            proname: productname.value,
            procategey: productcategry.value,
            prodescription: productdescription.value,
            proprice: productprice.value
};
localStorage.setItem("product", JSON.stringify(dataProduct));
    
    clearData();  
    ShowData();  


    updateBtn.remove();
};
    document.getElementById("addproduct").appendChild(updateBtn);

}

    function clearData() {
        productname.value = "";
        productcategry.value = "";
        productdescription.value = "";
        productprice.value = "";
    }
    
    function searchProduct() {
        let searchTerm = searchInput.value.toLowerCase();
        let table = '';  
        
        for (let i = 0; i < dataProduct.length; i++) {
            if (
                dataProduct[i].proname.toLowerCase().includes(searchTerm) ||
                dataProduct[i].procategey.toLowerCase().includes(searchTerm) ||
                dataProduct[i].prodescription.toLowerCase().includes(searchTerm) ||
                dataProduct[i].proprice.toLowerCase().includes(searchTerm)
            ) {
                table += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${dataProduct[i].proname}</td>
                    <td>${dataProduct[i].procategey}</td>
                    <td>${dataProduct[i].prodescription}</td>
                    <td>${dataProduct[i].proprice}</td>
                    <td>
                        <button onclick="updateProduct(${i})" class="btn btn-warning">Update</button>
                    </td>
                    <td>
                        <button onclick="Delete(${i})" id="delete" class="btn btn-danger">Delete</button>
                    </td>
                </tr>
                `;
            }
        }
        
        document.getElementById('soso').innerHTML = table;
    }
ShowData()
searchInput.onkeyup = searchProduct;


