//pulls canvas elemnt present in the html
const video = document.getElementById('video');

//loads the cnn models necessary for detecting the face, landmarks and then actual expressions
//all loaded into one cnn that will detect all these details and return it in a response
//after models are loaded, startVideo is called to stream video from webcam
Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('/models'),
]).then(startVideo)

//function for streaming video from webcam
function startVideo(){
    navigator.getUserMedia(
        {video: {}},
        stream => video.srcObject = stream, 
        err => console.error(err)
    )
}

//responsible for updating the video feed frame by frame
video.addEventListener('play', ()=>{
    //frame is captured from canvas, drawn on by vectors from facial api and then sent back with edits
    const canvas = faceapi.createCanvasFromMedia(video)
    document.body.append(canvas)
    //drawing area resized to that of video
    const displaySize = {width: video.width, height: video.height+60}
    //uses cnn every 100 ms
    setInterval(async () => {
        //the object that holds all the data recieved from cnn for face detection
            //bounding box (general area of detected face)
            //landmark vectors (used to draw the mesh on face)
            //confidence score (how well the face is being detected)
            //expression weights (the amount of each expression visible in a face)
        const detections = 
        await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
        
        //finding the expression with the largest confidence value (the one most likely to be present)
        const moods = Object.keys(detections[0].expressions);
        const values = Object.values(detections[0].expressions);
        const moodValue = moods[values.indexOf(Math.max(...values))];

        //assigning it to the h1 element in the html CONNECTION POINT
        document.getElementById('label').innerHTML = moodValue;

        //drawing the facial vectors used to detect expressions for a more interesting visual output
        const resizedDetections = faceapi.resizeResults(detections,displaySize)
        canvas.getContext('2d').clearRect(0,0,canvas.width,canvas.height)
        faceapi.draw.drawDetections(canvas, resizedDetections) 
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
        //faceapi.draw.drawFaceExpressions(canvas,resizedDetections)
    },100)
})