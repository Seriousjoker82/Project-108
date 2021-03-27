Webcam.set({
    width: 350,
    height:300,
    dest_width: 360,
    dest_height:290,
    image_format:'png',
    png_quality:90 

})
camera = document.getElementById("camera")

Webcam.attach('#camera')

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>'
    })
}
console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/6pZbM1-8e/model.json", modelLoaded);

function modelLoaded(){
    console.log("Model Loaded")
}
function speak()
{
    var synth = window.speechSynthesis;
    speak_data = "The prediction is"+prediction_1
   
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak (utterThis)
}
function check(){
    img=document.getElementById("captured_image")
    classifier.classify(img, gotResult)
}
function gotResult(error, results){
    if(error){
        console.log(error)
    }
    else{
        console.log(results)
        document.getElementById("result_gesture_name").innerHTML=results[0].label;
    
        prediction_1=results[0].label;
        
        speak();
        if(results[0].label=="thumbs up")
        {
            document.getElementById("update_emoji").innerHTML="&#128522;";
        }
        if(results[0].label=="nice")
        {
            document.getElementById("update_emoji").innerHTML= "&#128532;";
        }
        if(results[0].label=="Yo sign")
        {
            document.getElementById("update_emoji").innerHTML= "&#128548;";
        }
        
       
    }
}