let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("save-tab")


//grab the urls from the local storage if there are any and display them
if (leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage
    render(myLeads)
}


tabBtn.addEventListener('click', displayUrl)

function displayUrl(){
    //grab url of current tab
    //similar to the above function the first parameter is an object which run the fuction once the tab is found
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify( myLeads ) )
        render(myLeads)
    }) 
}


function render(leads) {
    let listItems = ""
    for ( let i = 0; i < leads.length; i++ ) {
        
       listItems += 
            `
            <li>
                <a trget='_blank'href='${leads[i]}'> 
                    ${leads[i]}
                </a>
            </li>
            ` 
/* //it can also be done in this way:
    const li = document.createElement('li')
    li.textContent = myLeads[i]
    ulEl.append(li)
    'but is les readable'
*/
    }
    ulEl.innerHTML = listItems
}


// button to remove urls
deleteBtn.addEventListener('dblclick', remove)

function remove() {
    localStorage.clear()
    myLeads = []
    render(myLeads)
}



inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)

    //to clear input value
    inputEl.value = ''

    //add item to the local storage
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
})







