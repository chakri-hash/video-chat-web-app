let mute = false;
let mystream;

let client = AgoraRTC.createClient({
    mode: "rtc",
    codec: "vp8",
});

client.init("496804bf5d0b4b4c98041a0c7cd82ae6")


client.join("006496804bf5d0b4b4c98041a0c7cd82ae6IABS0Jpu3zxG6CTbZkh8syPtwMYPySXhgNyj0D2cWaI+ZQMVENYAAAAAEADQXSp/QBTwYAEAAQA8FPBg", 
"firstvideo", null, (uid)=>{
    // Create a local stream
    let localStream = AgoraRTC.createStream({
        audio: true,
        video: true,
    });
    // Initialize the local stream
    localStream.init(()=>{
        mystream = localStream;
        // Play the local stream
        localStream.play("local");
        // Publish the local stream
        client.publish(localStream);
    })
  });

  // Subscribe to the remote stream when it is published
client.on("stream-added", function(evt){
    client.subscribe(evt.stream);
});
// Play the remote stream when it is subsribed
client.on("stream-subscribed", function(evt){
    let stream = evt.stream;
    let streamId = String(stream.getId());
    let right = document.getElementById('remote');
    let div = document.createElement("div");
    div.id = streamId;
    right.appendChild(div);
    stream.play(streamId)
});

function muteAudio () {
    myStream.muteAudio();
}

function unmuteAudio () {
    myStream.unmuteAudio();
}