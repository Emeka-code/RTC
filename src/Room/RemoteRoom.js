import React, { useRef, useEffect } from "react";
import { io } from "socket.io-client";
import { useNavigate, useParams } from "react-router-dom";

const RemoteRoom = () => {
  const { roomID } = useParams();

  const userVideo = useRef();
  const partnerVideo = useRef();
  const userStream = useRef();
  const shareVideo = useRef();
  const otherUser = useRef();
  const socketRef = useRef();
  const peerRef = useRef();

  const servers = {
    iceServers: [
      {
        url: ["stun:stun1.1.google.com:19302", "stun:stun2.1.google.com:19302"],
      },
    ],
  };
  const navigate = useNavigate();

  const share = () => {
    navigator.mediaDevices.getDisplayMedia().then((stream) => {
      shareVideo.current.srcObject = stream;
    });
    // navigate(`/share`);
  };

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        userVideo.current.srcObject = stream;
        userStream.current = stream;

        socketRef.current = io("http://localhost:1144");
        socketRef.current.emit("join room", roomID);

        socketRef.current.on("other user", (userID) => {
          callUser(userID);
          socketRef.current = userID;
        });
        socketRef.current.on("user joined", (userID) => {
          socketRef.current = userID;
        });

        socketRef.current.on("offer", handleReceived);
        socketRef.current.on("answer", handleAnswer);
        socketRef.current.on("ice-candidate", handleIceCanadidateMGS);
      });
  }, []);

  const handleReceive = () =>{
      
  }

  const callUser = (userID) => {
    peerRef.current = createPeer(userID);
    userStream.current.getTracks().forEach((track) => {
      peerRef.current.addTrack(track, userStream.current);
    });
  };

  const createPeer = (userID) => {
    const peer = new RTCPeerConnection(servers);

    peer.onicecandidate = handleIceCanadidateEvent;
    peer.ontrack = handleTrackEvent;
    peer.onnegotiationneeded = () => {
      handleNegotiationNeededEvent(userID);
    };

    const handleNegotiationNeededEvent = (userID) => {
      peer.current
        .createOffer()
        .then((offer) => {
          peerRef.current.setLocalDescription(offer);
        })
        .then(() => {
          const payload = {
            target: userID,
            caller: socketRef.current.id,
            spd: peerRef.current.setLocalDescription,
          };
          socketRef.current.emit("offer", payload);
        });
    };

    const handleTrackEvent = (e) => {
      partnerVideo.current.srcObject = e.streams[0];
    };
    const handleIceCanadidateEvent = (e) => {
      if (e.candidate) {
        const payload = {
          target: otherUser.current,
          candidate: e.candidate,
        };
        socketRef.current.emit("ice-candidate", payload);
      }
    };
  };
  return (
    <div>
      <center>
        <h1>Remote display</h1>
        <h2>clinton</h2>
        <br />
        <br />
        <video autoPlay playsInline ref={userVideo} />
        <video autoPlay playsInline ref={partnerVideo} />
        <br />
        <br />
        <button onClick={share}>share screen</button>
        <video
          ref={shareVideo}
          autoPlay
          playsInline
          style={{ width: "500px", height: "300px", objectFit: "contain" }}
        />
      </center>
    </div>
  );
};

export default RemoteRoom;
