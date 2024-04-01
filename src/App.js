import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const canvasWidth = 600;
  const canvasHeight = 600;
  const canvasRadius = 300;
  const radius = 15;
  const canvasRef = useRef(null);
  const lastRenderTimeRef = useRef(0);
  const ballXRef = useRef(canvasWidth / 2 - 1); // useRef를 사용하여 상태를 직접 변경할 변수 선언
  const ballYRef = useRef(canvasHeight / 2 - 100); // useRef를 사용하여 상태를 직접 변경할 변수 선언
  const xSpeedRef = useRef(0.3);
  const ySpeedRef = useRef(0.1);
  const distance = useRef(0); // 공과 원의 중심과의 거리

  const lastBallXRef = useRef(0);
  const lastBallYRef = useRef(0);

  function randomNumber() {
    return Math.random() * 0.15 + 0.8;
  }

  useEffect(() => {
    // 캔버스 요소 가져오기
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // 캔버스의 중심 좌표 설정
    const canvasCenterX = canvas.width / 2;
    const canvasCenterY = canvas.height / 2;

    const animationLoop = (timestamp) => {
      const deltaTime = timestamp - lastRenderTimeRef.current; // 프레임 간격
      lastRenderTimeRef.current = timestamp;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 공과 원의 중심과의 거리
      distance.current = Math.sqrt(
        (canvasCenterX - ballXRef.current) ** 2 +
          (canvasCenterY - ballYRef.current) ** 2
      );

      console.log(distance.current);
      // 공이 벽에 끼는걸 막기 위해 벽에 닿기직전 좌표를 저장하자
      if (
        distance.current > canvasRadius - radius - 4 &&
        distance.current < canvasRadius - radius - 1.5
      ) {
        lastBallXRef.current = ballXRef.current;
        lastBallYRef.current = ballYRef.current;
        console.log(lastBallXRef.current);
      }

      // 원보다 안쪽에 있는 경우 : 점점 빨라짐
      if (distance.current < canvasRadius - radius - 1) {
        ballXRef.current += deltaTime * xSpeedRef.current;
        ballYRef.current += deltaTime * ySpeedRef.current;
        ySpeedRef.current += 0.02;
      } else {
        // 원보다 바깥쪽에 있는 경우 : 속도 부호가 바뀜.

        xSpeedRef.current = -xSpeedRef.current * randomNumber();
        ySpeedRef.current = -ySpeedRef.current * randomNumber();
        ballXRef.current = lastBallXRef + deltaTime * xSpeedRef.current;
        ballYRef.current = lastBallXRef + deltaTime * ySpeedRef.current;
      }

      // 배경 그리기
      ctx.beginPath();
      ctx.arc(canvasCenterX, canvasCenterY, canvasRadius, 0, 2 * Math.PI);
      ctx.fillStyle = "grey";
      ctx.fill();
      ctx.closePath();

      // 공 그리기
      ctx.beginPath();
      ctx.arc(ballXRef.current, ballYRef.current, radius, 0, 2 * Math.PI);
      ctx.fillStyle = "blue";
      ctx.fill();
      ctx.closePath();

      // 다음 프레임 요청
      requestAnimationFrame(animationLoop);
    };

    requestAnimationFrame(animationLoop);

    return () => {
      cancelAnimationFrame(animationLoop);
    };
  }, []); // 의존성 배열을 비워두어서, 한번만 실행되게함. 애니메이션 루프는 한번 돌게하면 계속돔

  return (
    <div className="App">
      <canvas
        id="bg-canvas"
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
      ></canvas>

      <div></div>
    </div>
  );
}

export default App;
