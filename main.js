
prediction = "";

Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot() {
    Webcam.snap(function (data_uri){
        document.getElementById("result").innerHTML = '<img id="image_captured" src="'+data_uri+'"/>';
    });
}

console.log("ml5 version:",ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/VUkEnnZZg/model.json',modelLoaded);

function modelLoaded() {
    console.log("Model Loaded Successfully!");
}

function speak() {
    var synth = window.speechSynthesis;
    var speak_data = "The Prediction Is "+prediction;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}

function check() {
    img = document.getElementById("image_captured");
    classifier.classify(img, gotResults);
}

function gotResults(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_gesture_name").innerHTML = results[0].label;
        prediction = results[0].label;
        speak();
        if(results[0].label == "amazing"){
            document.getElementById("result_emoji").innerHTML = "&#128076;";
            document.getElementById("quote").innerHTML = "amazing";
        }
        if(results[0].label == "best"){
            document.getElementById("result_emoji").innerHTML = "&#128077";
            document.getElementById("quote").innerHTML = "best";
        }
        if(results[0].label == "victory"){
            document.getElementById("result_emoji").innerHTML = "&#9996;";
            document.getElementById("quote").innerHTML = "victory";
        }
        if(results[0].label == "unity"){
            document.getElementById("result_emoji").innerHTML = "&#9994;";
            document.getElementById("quote").innerHTML = "unity";
        }
        if(results[0].label == "clap"){
            document.getElementById("result_emoji").innerHTML = "&#128079;";
            document.getElementById("quote").innerHTML = " clap";
        }
        if(results[0].label == "rock"){
            document.getElementById("result_emoji").innerHTML = "&#129304;";
            document.getElementById("quote").innerHTML = "Oh! You Are On A Party Enjoy It";
        }
        if(results[0].label == "bye"){
            document.getElementById("result_emoji").innerHTML = "&#128075;";
            document.getElementById("quote").innerHTML = " Bye Bye";
        }
    }
}