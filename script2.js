//notes associated with each facial expression where neutral is a C in the key of c
//every emotion is relative to this point
const happy = [
    { pitch: "G4", duration: "4n" },
    { pitch: "G4", duration: "4n" },
    { pitch: "G4", duration: "4n" },
    { pitch: "G4", duration: "4n" }
];

const neutral = [
    { pitch: "C4", duration: "4n" },
    { pitch: "C4", duration: "4n" },
    { pitch: "C4", duration: "4n" },
    { pitch: "C4", duration: "4n" }
];

const angry = [
    { pitch: "A3", duration: "4n" },
    { pitch: "A3", duration: "4n" },
    { pitch: "A3", duration: "4n" },
    { pitch: "A3", duration: "4n" }
];
const sad = [
    { pitch: "B3", duration: "4n" },
    { pitch: "B3", duration: "4n" },
    { pitch: "B3", duration: "4n" },
    { pitch: "B3", duration: "4n" }
];
const fearful = [
    { pitch: "F4", duration: "4n" },
    { pitch: "F4", duration: "4n" },
    { pitch: "F4", duration: "4n" },
    { pitch: "F4", duration: "4n" }
];
const surprised = [
    { pitch: "A4", duration: "4n" },
    { pitch: "A4", duration: "4n" },
    { pitch: "A4", duration: "4n" },
    { pitch: "A4", duration: "4n" }
];
const disgusted = [
    { pitch: "C#4", duration: "4n" },
    { pitch: "C#4", duration: "4n" },
    { pitch: "C#4", duration: "4n" },
    { pitch: "C#4", duration: "4n" }
];

//set default note on start to C
let current = neutral;   
//intialize synth object for soundplayback
const synth = new Tone.Synth().toDestination();
//pull h1 with the id label from html to retrieve facial expression data
const label = document.querySelector("#label");

//this is the function for switching and maintaing a constant loop
function looper() {
    //selecting the next note to play based on the current facial expression
    const text = label.innerHTML;
    if (text=="neutral"){
        current=neutral;
    }
    else if (text=="happy"){
        current=happy;
    }
    else if (text=="angry"){
        current=angry;
    }
    else if (text=="sad"){
        current=sad;
    }
    else if (text=="fearful"){
        current=fearful;
    }
    else if (text=="surprised"){
        current=surprised;
    }
    else if (text=="disgusted"){
        current=disgusted;
    }
    //cancel the current loop that might already be playing to avoid overlap
    Tone.Transport.cancel();
    //use a loop function to repeat note infinitley
    let count = 0;
    var loop = new Tone.Loop(function(time){
        const index = Math.floor(count) % current.length;
        const note = current[index]; 
        count++;
        console.log(index);
        //play the current note by using frequency, note time and total time
        synth.triggerAttackRelease(note.pitch, note.time, time);
    }, "4n").start(0);
    //neccesary to call like this because it doesn't run in chrome automatically
    //it gives the browser the permission to play sound which is a disabled by default
    Tone.start();
    Tone.Transport.start();
}

// starts playback immediatley on page load
window.addEventListener("load", looper);

// event listener to check for changes in html elements
const observer = new MutationObserver(looper);

//listen for changes in the facial expression (stored in h1 with id 'label' within its innerHTML)
observer.observe(label, { childList: true, subtree: true });