import axios, {
    AxiosResponse,
    AxiosError} from "../../node_modules/axios";

interface ICar {
    model: string;
    vendor: string;
    price: number;
}

let buttonElement: HTMLButtonElement = <HTMLButtonElement>document.getElementById("getAllButton");
buttonElement.addEventListener("click", showAllCars);

let outputElement: HTMLDivElement = <HTMLDivElement>document.getElementById("content");

let buttonDeleteElement: HTMLButtonElement = <HTMLButtonElement>document.getElementById("deleteButton");
buttonDeleteElement.addEventListener("click", deleteCar);

let addButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("addButton");
addButton.addEventListener("click", addCar);

function showAllCars(): void {
    let uri: string = "http://rest-pele-easj-dk.azurewebsites.net/api/Cars";
    axios.get<ICar[]>(uri)
        .then(function (response: AxiosResponse<ICar[]>): void {
            // element.innerHTML = generateSuccessHTMLOutput(response);
            // outputHtmlElement.innerHTML = generateHtmlTable(response.data);
            // outputHtmlElement.innerHTML = JSON.stringify(response.data);
            let result: string = "<ol>";
            response.data.forEach((car: ICar) => {
                result += "<li>" + car.model + " " + car.vendor + "</li>";
            });
            result += "</ol>";
            outputElement.innerHTML = result;
        })
        .catch(function (error: AxiosError): void { // error in GET or in generateSuccess?
            if (error.response) {
                // the request was made and the server responded with a status code
                // that falls out of the range of 2xx
                // https://kapeli.com/cheat_sheets/Axios.docset/Contents/Resources/Documents/index
                outputElement.innerHTML = error;
            } else { // something went wrong in the .then block?
                outputElement.innerHTML = error;
            }
        });
}

function deleteCar(): void {
    let output: HTMLDivElement = <HTMLDivElement>document.getElementById("contentDelete");
    let inputElement: HTMLInputElement = <HTMLInputElement>document.getElementById("deleteInput");
    let model: string = inputElement.value;
    let uri: string = "http://rest-pele-easj-dk.azurewebsites.net/api/Cars/" + model;
    axios.delete<ICar>(uri)
        .then(function (response: AxiosResponse<ICar>): void {
            // element.innerHTML = generateSuccessHTMLOutput(response);
            // outputHtmlElement.innerHTML = generateHtmlTable(response.data);
            console.log(JSON.stringify(response));
            output.innerHTML = response.status + " " + response.statusText;
        })
        .catch(function (error: AxiosError): void { // error in GET or in generateSuccess?
            if (error.response) {
                // the request was made and the server responded with a status code
                // that falls out of the range of 2xx
                // https://kapeli.com/cheat_sheets/Axios.docset/Contents/Resources/Documents/index
                output.innerHTML = error;
            } else { // something went wrong in the .then block?
                output.innerHTML = error;
            }
        });
}

function addCar(): void {
    let addModelElement: HTMLInputElement = <HTMLInputElement>document.getElementById("addModel");
    let addVendorElement: HTMLInputElement = <HTMLInputElement>document.getElementById("addVendor");
    let addPriceElement: HTMLInputElement = <HTMLInputElement>document.getElementById("addPrice");
    let myModel: string = addModelElement.value;
    let myVendor: string = addVendorElement.value;
    let myPrice: number = Number(addPriceElement.value);
    let uri: string = "http://rest-pele-easj-dk.azurewebsites.net/api/Cars";
    axios.post<ICar>(uri, { model: myModel, vendor: myVendor, price: myPrice })
        .then((response: AxiosResponse) => { console.log("response " + response.status + " " + response.statusText); })
        .catch((error: AxiosError) => { console.log(error); });
}