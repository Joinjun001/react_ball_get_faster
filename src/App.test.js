import { render, screen } from "@testing-library/react";
import App from "./App";

beforeEach(() => {
  jest.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue({
    fillRect: jest.fn(),
    strokeRect: jest.fn(),
  });
  window.requestAnimationFrame = jest.fn(() => 1);
  window.cancelAnimationFrame = jest.fn();
});

afterEach(() => {
  window.onload = null;
  jest.restoreAllMocks();
});

test("초기 크기와 속도를 표시한다", () => {
  render(<App />);
  expect(screen.getByText(/크기 : 50/)).toBeInTheDocument();
  expect(screen.getByText(/x축 속도 : 3\.0/)).toBeInTheDocument();
});

test("애니메이션을 예약하고 언마운트 시 취소한다", () => {
  const { unmount } = render(<App />);
  expect(window.requestAnimationFrame).toHaveBeenCalled();
  unmount();
  expect(window.cancelAnimationFrame).toHaveBeenCalledWith(1);
});
