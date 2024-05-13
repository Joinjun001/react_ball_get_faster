import React, { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const audio = new Audio("/music/MP_Cupboard Door Close.mp3");

  function playAudio() {
    audio.currentTime = 0; // 오디오를 처음부터 재생
    audio.play();
  }
  // 속도함수에 랜덤으로 넣어줄 랜덤 숫자 함수
  function getRandomNumber() {
    return Math.random();
  }
  const canvasRef = useRef(null);
  const canvasWidth = 600;
  const canvasHeight = 600;
  const ballPosition = { x: 200, y: 100 }; // 초기 공의 위치
  const ballVelocity = { x: 3, y: 3 }; // 초기 공의 속도
  const ballAcceleration = { x: 0, y: 0 }; // 초기 공의 가속도

  let ballWidth = 50;
  let ballHeight = 50;

  const [ball1, setBall1] = useState(ballWidth);
  const [ball2, setBall2] = useState(ballHeight); // 화면에 출력할 텍스트를 위해 저장한 state
  const [ball3, setBall3] = useState(ballVelocity.x);
  const [ball4, setBall4] = useState(ballVelocity.y);

  let count = 0; // 벽에 부딪힌 횟수

  let hue = 0; // 색조
  let saturation = 100; // 채도
  let lightness = 50; // 명도

  useEffect(() => {
    var AudioContext;
    var audioContext;

    window.onload = function () {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(() => {
          AudioContext = window.AudioContext || window.webkitAudioContext;
          audioContext = new AudioContext();
        })
        .catch((e) => {
          console.error(`Audio permissions denied: ${e}`);
        });
    };

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    let animationFrameId;
    let lastRenderTime = Date.now(); // 프레임간의 시간차를 계산하기 위함

    function increaseBall() {
      playAudio();
      ballWidth += 2;
      ballHeight += 2;
      setBall1((prev) => prev + 2);
      setBall2((prev) => prev + 2);
    }

    // 캔버스에 그리기 함수
    const draw = () => {
      const currentTime = Date.now();
      const dt = (currentTime - lastRenderTime) / 1000; // 초 단위로 변경
      lastRenderTime = currentTime;

      if (ballWidth >= canvasWidth) {
        cancelAnimationFrame(animationFrameId); // 공이 화면에 가득차면 애니메이션 종료
        return;
      }

      // 공이 위쪽 벽에 부딪혔을때
      if (ballPosition.y < 0) {
        count += 1;
        increaseBall();
        ballPosition.y = 0; // 공을 0 위치에 놓고

        // 모서리에 안찡기게 하는 if 문
        if (ballPosition.x < 0) {
          ballPosition.x = 0;
        } else if (ballPosition.x > canvasWidth - ballWidth) {
          ballPosition.x = canvasWidth - ballWidth;
        }

        // 부딪히면서 속도 변경
        const result = getRandomNumber();
        const result2 = getRandomNumber();
        ballVelocity.y -= result;
        ballVelocity.y = -ballVelocity.y; // 속도의 방향을 반대로 바꿉니다.
        if (ballVelocity.x < 0) {
          ballVelocity.x -= result2;
          setBall3((prev) => (prev -= result2));
        } else {
          ballVelocity.x += result2;
          setBall3((prev) => (prev += result2));
        }
        setBall4((prev) => (prev -= result));
        setBall4((prev) => -prev);
      } else if (ballPosition.y > canvasHeight - ballHeight) {
        count += 1;
        increaseBall();

        ballPosition.y = canvasHeight - ballHeight; // 공을 캔버스의 최대 높이에 놓고

        // 모서리에 안찡기게 하는 if 문
        if (ballPosition.x < 0) {
          ballPosition.x = 0;
        } else if (ballPosition.x > canvasWidth - ballWidth) {
          ballPosition.x = canvasWidth - ballWidth;
        }

        // 부딪히면서 속도 변경
        const result = getRandomNumber();
        const result2 = getRandomNumber();
        ballVelocity.y += result;
        ballVelocity.y = -ballVelocity.y; // 속도의 방향을 반대로 바꿉니다.

        if (ballVelocity.x < 0) {
          ballVelocity.x -= result2;
          setBall3((prev) => (prev -= result2));
        } else {
          ballVelocity.x += result2;
          setBall3((prev) => (prev += result2));
        }
        setBall4((prev) => (prev += result));
        setBall4((prev) => -prev);
      } else if (ballPosition.x < 0) {
        // 공이 왼쪽으로 부딪혔을때

        // 모서리에 안찡기게 하는 if 문
        if (ballPosition.y < 0) {
          ballPosition.y = 0;
        } else if (ballPosition.y > canvasHeight - ballHeight) {
          ballPosition.y = canvasHeight - ballHeight;
        }
        count += 1;
        increaseBall();

        const result = getRandomNumber();
        const result2 = getRandomNumber();
        ballPosition.x = 0; // 공을 0 위치에 놓고
        ballVelocity.x -= result;
        ballVelocity.x = -ballVelocity.x; // 속도의 방향을 반대로 바꿉니다.
        if (ballVelocity.y < 0) {
          ballVelocity.y -= result2;
          setBall4((prev) => (prev -= result2));
        } else {
          ballVelocity.y += result2;
          setBall4((prev) => (prev += result2));
        }

        setBall3((prev) => (prev -= result));
        setBall3((prev) => -prev);
      } else if (ballPosition.x > canvasWidth - ballWidth) {
        count += 1;
        increaseBall();

        // 모서리에 안찡기게 하는 if 문
        if (ballPosition.y < 0) {
          ballPosition.y = 0;
        } else if (ballPosition.y > canvasHeight - ballHeight) {
          ballPosition.y = canvasHeight - ballHeight;
        }

        const result = getRandomNumber();
        const result2 = getRandomNumber();
        ballPosition.x = canvasWidth - ballWidth; // 공을 캔버스의 최대 높이에 놓고
        ballVelocity.x += result;
        ballVelocity.x = -ballVelocity.x; // 속도의 방향을 반대로 바꿉니다.

        if (ballVelocity.y < 0) {
          ballVelocity.y -= result2;
          setBall4((prev) => (prev -= result2));
        } else {
          ballVelocity.y += result2;
          setBall4((prev) => (prev += result2));
        }

        setBall3((prev) => (prev += result));
        setBall3((prev) => -prev);
      } else {
        ballVelocity.y += ballAcceleration.y;
        ballPosition.y += ballVelocity.y;
        ballVelocity.x += ballAcceleration.x;
        ballPosition.x += ballVelocity.x;
      }

      // 캔버스를 지우고 다시 그리는 작업 수행
      // context.clearRect(0, 0, canvas.width, canvas.height);

      // 그리기 작업 수행
      context.fillStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`; // HSL 색 설정
      context.fillRect(ballPosition.x, ballPosition.y, ballWidth, ballHeight);

      // 사각형 테두리 그리기 설정
      context.strokeStyle = "black"; // 테두리 색상을 파란색으로 설정
      context.lineWidth = 1; // 테두리 선의 너비를 5로 설정
      context.strokeRect(ballPosition.x, ballPosition.y, ballWidth, ballHeight); // 동일한 위치와 크기로 테두리 그리기

      hue = (hue + 1) % 360; // 색조를 점차 증가시키고 360도가 되면 다시 0으로

      // 다음 프레임 요청
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="App">
      <div className="title">
        화면에 가득찰 때 까지 공이 커지고 속도가 빨라집니다
      </div>
      <div className="title">
        속도는 벽에 부딪힐때마다 0~1사이의 랜덤한 숫자만큼 증가합니다.
      </div>
      <div className="title">
        크기 : {ball1} / x축 속도 : {ball3.toFixed(1)} / y축 속도 :{" "}
        {ball4.toFixed(1)}
      </div>

      <canvas
        className="bg-canvas"
        ref={canvasRef}
        width={600}
        height={600}
      ></canvas>
    </div>
  );
}

export default App;
