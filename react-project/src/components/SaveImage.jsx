import React, { useState, useEffect, useRef } from "react";
import "../css/SaveImage.css";
import axios from "../axios";
import ImgModal from "./ImgModal";
import { useSelector } from "react-redux";

const SaveImage = () => {
  const [testImg, setTestImg] = useState([]);
  const [isOpen, setIsOpen] = useState(false); //모달 상태 State
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 state
  const [testIndex, setTestindex] = useState(null);

  const testImgUrl = [
    "data:image/jpeg;base64,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",
    "data:image/jpeg;base64,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",
    "data:image/jpeg;base64,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",
    "https://www.fitpetmall.com/wp-content/uploads/2022/12/shutterstock_2142847507-1024x683.jpg",
    "https://www.fitpetmall.com/wp-content/uploads/2022/12/shutterstock_2142847507-1024x683.jpg",
    "https://www.fitpetmall.com/wp-content/uploads/2022/12/shutterstock_2142847507-1024x683.jpg",
    "https://www.fitpetmall.com/wp-content/uploads/2022/12/shutterstock_2142847507-1024x683.jpg",
    "https://www.fitpetmall.com/wp-content/uploads/2022/12/shutterstock_2142847507-1024x683.jpg",
    "https://www.fitpetmall.com/wp-content/uploads/2022/12/shutterstock_2142847507-1024x683.jpg",
    "https://www.fitpetmall.com/wp-content/uploads/2022/12/shutterstock_2142847507-1024x683.jpg",
    "https://www.fitpetmall.com/wp-content/uploads/2022/12/shutterstock_2142847507-1024x683.jpg",
    "https://www.fitpetmall.com/wp-content/uploads/2022/12/shutterstock_2142847507-1024x683.jpg",
  ];

  const observer = useRef(
    new IntersectionObserver(
      (entries) => {
        // entries 배열은 감시 대상 요소들의 상태 변화를 나타냅니다.
        entries.forEach((entry) => {
          // entry가 뷰포트에 들어온 경우 (isIntersecting = true)
          if (entry.isIntersecting) {
            const card = entry.target; // 현재 뷰포트에 들어온 .SImage-Card 요소
            const image = card.querySelector(".img-thumb"); // 해당 카드 내의 이미지 요소

            setIsLoading(true); // 이미지 로딩 시작을 나타내는 상태를 true로 설정

            image.src = image.dataset.src; // data-src 속성에서 실제 이미지 URL로 src 속성 변경
            console.log(image.dataset.src);
            // 이미지 로드 완료시 실행될 함수
            image.onload = () => {
              setIsLoading(false); // 이미지 로드 완료 후 로딩 상태를 false로 변경
            };

            observer.current.unobserve(card); // 이미지 로드 후 더 이상 해당 카드를 관찰하지 않음
          }
        });
      },
      {
        rootMargin: "0px", // 뷰포트의 여백을 -100px로 설정
        threshold: 0.1, // 10% 요소가 보일 때 콜백 함수 실행
      }
    )
  );

  // 각 이미지의 체크박스 상태 변경 함수
  const handleCheckboxChange = (imageId, isChecked) => {
    setSelectedImages((prev) => ({
      ...prev,
      [imageId]: isChecked,
    }));
  };

  // 체크박스 핸들러
  useEffect(() => {
    const newSelectedImages = {};
    testData.forEach((_, index) => {
      newSelectedImages[index] = selectAll;
    });
    setSelectedImages(newSelectedImages);
  }, [selectAll]);
  console.log("체크표시 요소", selectedImages);

  // 각 이미지 렌더링 함수 / 내 저장 이미지 불러오기 함수
  // 아마 여기서 axios 통신으로.. 이미지 불러는..?
  useEffect(() => {
    const currentObserver = observer.current;
    const cards = document.querySelectorAll(".SImage-Card");

    cards.forEach((card) => currentObserver.observe(card));

    return () => {
      cards.forEach((card) => currentObserver.unobserve(card));
    };
  }, [testData]);

  // 모달 열고 닫는 상태 함수
  const openModalHandler = (index) => {
    // isOpen의 상태를 변경하는 메소드를 구현
    // !false -> !true -> !false
    setIsOpen(!isOpen);
    setTestindex(index);
  };

  // 삭제하시겠습니까? 모달 호출
  const delImg_Btn = () => {
    setDelImg(!delImg);
  };

  // 체크된 이미지 URL 업데이트 함수
  const updateCheckedImages = () => {
    const checkedImages = testData
      .filter((_, index) => selectedImages[index])
      .map((item) => item.url); // 체크된 이미지들의 URL만 추출
    setTestImg(checkedImages);
  };
  // 삭제 버튼 클릭 시 체크된 이미지 URL 변수 업데이트
  const handleDeleteClick = () => {
    updateCheckedImages(); //함수 호출로 체크된 이미지 확인
    console.log("삭제될 데이터", testImg);
    // 이후 삭제 로직 구현
    // -------------------------------------
  };

  // 최신순 정렬 함수
  const date_Order = () => {
    const sortedImages = [...testData].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
    // 정렬된 데이터로 상태 업데이트
    setTestData(sortedImages);
  };

  // 오래된순 정렬 함수
  const old_Order = () => {
    const sortedImages = [...testData].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    // 정렬된 데이터로 상태 업데이트
    setTestData(sortedImages);
    console.log(sortedImages);
  };

  return (
    <div className="SaveImage">
      {isLoading && <div className="loading-indicator">로딩 중...</div>}
      <h3>내 저장 이미지</h3>

      <div className="S-Imenu">
        <div className="check-box">
          <input
            type="checkbox"
            id="check"
            checked={selectAll}
            onChange={handleSelectAllChange}
          />
          <label className="main_check_label" htmlFor="check"></label>
          <span>전체선택</span>
          <button className="Del-Btn" onClick={delImg_Btn}>
            삭제
          </button>{" "}
          {/* 삭제 모달 호출 */}
        </div>
        <div className="order-box">
          <span className="old-text" onClick={date_Order}>최신순</span>
          <span className="order-text" onClick={old_Order}>오래된순</span>
        </div>
      </div>

      <div className="S-Ibox">
        {testImgUrl.map((image, index) => (
          <div
            className="SImage-Card"
            key={index}
            onClick={() => openModalHandler(index)}
          >
            {/* data-src 속성에 실제 이미지 URL을 지정 */}
            <img
              className="img-thumb"
              data-src={image}
              src="placeholder_image_url"
              alt={`Image ${index}`}
            />
            <div className="SI-At">
              <input
                type="checkbox"
                id={`check${index}`}
                checked={selectedImages[index]}
                onChange={(e) => handleCheckboxChange(index, e.target.checked)}
              />
              <label className="check_label" htmlFor={`check${index}`}></label>
              <span>{testData[index].date}</span> {/* 이미지 데이터 날짜 */}
            </div>
          </div>
        ))}
        <ImgModal
          isOpen={isOpen}
          openModalHandler={openModalHandler}
          Eximage={testImgUrl}
          index={testIndex}
        />
      </div>
      {delImg ? (
        <div className="modal-backdrop">
          <div className="Img-Del-box">
            <div className="Img-Del-text">
              <span className="red-text">삭제</span>
              <span>하시겠습니까?</span>
            </div>
            <div className="Img-Del-Btn">
              <button className="del-Btn" onClick={handleDeleteClick}>삭제</button>
              <button className="del-close-btn" onClick={delImg_Btn}>닫기</button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SaveImage;
