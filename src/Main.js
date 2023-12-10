// Variables
let Button = document.getElementById("SubmitBtn");
let EntryBox = document.getElementById("EntryBox");
let NotificationBox = document.getElementById("Notifications");

// Events
Button.addEventListener("click",OnSubmit);




function CreateNotification(Text,Color) {

    // Create new instance
    const Element = document.createElement("a");

    Element.classList.add("Notification");
    Element.textContent = Text;
    Element.style.color = Color == null ? "white" : Color;
    NotificationBox.appendChild(Element);

    // Notifier FX
    setTimeout(function(){
        
        Element.classList.add("Transition");

        Element.addEventListener("animationend", function(){
            Element.remove();
        })
        
    },3000);

}

async function OnSubmit(){

    // Fetch
    let Input = EntryBox.value;

    try {

        let Response = await fetch(`https://api.shrtco.de/v2/shorten?url=${Input}`);
        let Content = await Response.json();
        let ShortURL = (Content.result.short_link2);
        
        // Copy to clipboard
        window.navigator.clipboard.writeText(ShortURL);
        
        // Notification
        CreateNotification("Successfully shortened link, and copied shortened link to clipboard");

    } catch (error) {
        CreateNotification("Conversion failed please check link and try again.","red");
    }
    
};

