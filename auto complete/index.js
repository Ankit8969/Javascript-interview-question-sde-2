const countries = [
    'Argentina', 'Brazil', 'Canada', 'Denmark', 
    'Egypt', 'France', 'Germany', 'India', 'Japan', 'Korea', 'Mexico', 
    'Norway', 'Pakistan', 'Russia', 'Spain', 'Turkey', 'United States', 'Zimbabwe'
];

const autocompleteInput = document.querySelector("#autocomplete-input");
const autocompleteResults = document.querySelector("#autocomplete-results");


autocompleteInput.addEventListener("keyup", (event)=>{
    let userTypedValue = event.target.value;
    if (userTypedValue === ""){
        autocompleteResults.innerHTML = null;
        return ;
    }
    let filterData = countries.filter((item)=> item.toLowerCase().includes(userTypedValue.toLowerCase()) );
    showUpdatedDropDown(filterData);
})

function showUpdatedDropDown(arr){
    autocompleteResults.innerHTML = null;
    arr.forEach((item)=>{
        let li = document.createElement('li');
        li.addEventListener("click", ()=>{
            autocompleteInput.value = item;
            autocompleteResults.innerHTML = null;
            return ;
        })
        li.innerHTML = item;    
        autocompleteResults.appendChild(li);
    })
}

