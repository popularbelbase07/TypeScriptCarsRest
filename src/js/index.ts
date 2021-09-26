import axios,
{
    AxiosResponse,
    AxiosError
}
    from "../../node_modules/axios/index"
    interface ICar{
        id:number
        vendor:string
        model:string
        price:number
    }
    //Create EventHandler for button using id.
let buttonElement:HTMLButtonElement=<HTMLButtonElement> document.getElementById("GetAllCars")
buttonElement.addEventListener("click",SeeALL);

//Andrei's URL for the rest webservice at Azure
let carWebUrl: string = "https://webapicar20190326034339.azurewebsites.net/api/cars/";
//Function for using logic.
function SeeALL():void
{ let result:String
    console.log("Show all cars  !!!")
    axios.get<ICar[]>(carWebUrl)
    .then ((response:AxiosResponse<ICar[]>)=>{
        response.data.forEach((car:ICar)=>
        {
if(car==null){
    result ="<li>null element</li>"
}
else{
    
    result="<li>"+car.id +" "+ car.vendor+" " + car.model+" " +car.price + "</li> <br>";
}
    document.getElementById("carList").innerHTML+=result ;  
 })
})

}
//Adding new car
let AddingElement:HTMLButtonElement=<HTMLButtonElement> document.getElementById("addButton")
AddingElement.addEventListener("click",AddCar)
function AddCar():void
{
console.log("Adding new car in database !!!")
let cModel=(<HTMLInputElement>document.getElementById('addModel')).value
let cVendor=(<HTMLInputElement>document.getElementById('addVendor')).value
let cPrice=(<HTMLInputElement>document.getElementById('addPrice')).value
axios.post<ICar>(carWebUrl,{model:cModel,vendor:cVendor,price:cPrice})
.then(function(response:AxiosResponse){
    console.log(response.status +" " + response.statusText);
})
.catch(function(error:AxiosError)
{
    console.log(error);
    
});

}
//Delete the car from database
let deleteElement:HTMLButtonElement=<HTMLButtonElement> document.getElementById("DeleteData")
deleteElement.addEventListener("click",DeleteCar)
function DeleteCar():void
{
    console.log("Delete the selected car")
    let deleteid=(<HTMLInputElement>document.getElementById("inputId")).value;
    console.log("Id is:"+deleteElement)
    axios.delete<ICar>(carWebUrl +deleteid +"/")
    //for success we use .then
    .then((response:AxiosResponse)=> { console.log("Deleted Yes")
    })
    .catch((response:AxiosResponse)=>{
        console.log("No Delete");
    });


}
