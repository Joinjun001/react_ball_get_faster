import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const canvasWidth = 600;
  const canvasHeight = 600;
  const canvasRadius = 250;
  const radius = 15;
  const canvasRef = useRef(null);
  const lastRenderTimeRef = useRef(0);
  const ballXRef = useRef(canvasWidth / 2 - 1); // useRef를 사용하여 상태를 직접 변경할 변수 선언
  const ballYRef = useRef(canvasHeight / 2 - 100); // useRef를 사용하여 상태를 직접 변경할 변수 선언

  useEffect(() => {
    // 캔버스 요소 가져오기
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // 캔버스의 중심 좌표 설정
    const canvasCenterX = canvas.width / 2;
    const canvasCenterY = canvas.height / 2;

    const animationLoop = (timestamp) => {
      console.log(timestamp); // 애니메이션 동작하는지 확인
      const deltaTime = timestamp - lastRenderTimeRef.current; // 프레임 간격
      lastRenderTimeRef.current = timestamp;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 중력을 구현해보자
      ballXRef.current += deltaTime * 0.1; // useRef로 선언한 변수 직접 변경
      ballYRef.current += deltaTime * 0.05; // useRef로 선언한 변수 직접 변경

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
    </div>
  );
}

export default App;
