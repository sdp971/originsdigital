import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/index.css";
import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from "@mui/icons-material";
import PropTypes from "prop-types";
import Video from "./Video";
import useAPI from "../../api/useAPI";
import useResponsiveWidth from "./useResponsiveWidth";

function Featured({ sectionInfo }) {
  const api = useAPI();
  const listRef = useRef();
  const [position, setPosition] = useState(0);
  const [videoNumber, setVideoNumber] = useState(0);
  // const [videoCount, setVideoCount] = useState(0);//TODO:remove
  const [data, setData] = useState([]);

  const { responsiveWidth } = useResponsiveWidth();
  // const [responsiveWidth, setResponsiveWidth] = useState("");//TODO REMOVE

  const newFilteredData = data.filter(
    (newVideo) => newVideo.SectionID === sectionInfo.id
  );

  const videoDisplayed = newFilteredData.length;

  const getVideoData = async () => {
    await api
      .get("videos")
      .then((res) => {
        setData(res.data);
        // setVideoCount(res.data.length);//TODO:remove
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    getVideoData();
  }, []);

  function handleClick(direction) {
    const distance = listRef.current.getBoundingClientRect();
    const containerWidth = distance.width;
    const videoWidth = containerWidth / videoDisplayed; // Nombre de videos visibles en une fois à l'écran

    if (direction === "left" && videoNumber > 0) {
      setVideoNumber(videoNumber - 1);
      setPosition(position + videoWidth);
      listRef.current.style.transform = `translateX(${
        position + videoWidth
      }px)`;
    }

    if (direction === "right" && videoNumber < videoDisplayed - 1) {
      setVideoNumber(videoNumber + 1);
      setPosition(position - videoWidth);
      listRef.current.style.transform = `translateX(${
        position - videoWidth
      }px)`;
    }
  }

  // TODO: Remove all the lines below until 74
  // useEffect(() => {
  //   const handleResize = () => {
  //     const width = window.innerWidth;
  //     setResponsiveWidth(`${width}px`);
  //   };

  //   handleResize();
  //   window.addEventListener("resize", handleResize);

  //   // Pour clean
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  return (
    <div className="list">
      <div className="wrapper">
        {responsiveWidth > 450 ? (
          <>
            <ArrowBackIosOutlined
              className="sliderArrow left"
              onClick={() => handleClick("left")}
              disabled={position === 0}
              id="sliderArrow_featured"
            />
            <ArrowForwardIosOutlined
              className="sliderArrow right"
              onClick={() => handleClick("right")}
              id="sliderArrow_featured"
            />
          </>
        ) : (
          <div className="container-dots">
            {/* {[...Array(videoCount)].map((_, index) => {
              const key = `${index}-${Math.random().toString(36).substr(2, 9)}`; */}
            {newFilteredData.map((_, index) => {
              return (
                <div
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  className="dot"
                  onClick={() => {
                    const direction = index > videoNumber ? "right" : "left";
                    handleClick(direction);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      const direction = index > videoNumber ? "right" : "left";
                      handleClick(direction);
                    }
                  }}
                  role="button"
                  tabIndex="0"
                  aria-label={`Video ${index}`}
                  style={{
                    background: index === videoNumber ? " black" : "white",
                  }}
                />
              );
            })}
          </div>
        )}
        <div className="container" ref={listRef} style={{ paddingTop: "62px" }}>
          {newFilteredData.map((video) => (
            <Link to={`/video_description/${video.id}`} key={video.id}>
              <Video
                title={video.titre}
                width={`${responsiveWidth}px`}
                height={responsiveWidth <= 750 ? "390px" : "860px"}
                src={`${import.meta.env.VITE_APP_API_URL}${video.link}`}
                // style={{//TODO:REMOVE UNTIL LINE 131
                //   transform: `translateX(${index * 100 - videoNumber * 100}%)`,
                // }}
                isVideoPremium={video.isVideoPremium}
                isVideoPaying={video.isVideoPaying}
                isEnabled
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

Featured.propTypes = {
  sectionInfo: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    order: PropTypes.number,
    section_type: PropTypes.string,
  }).isRequired,
};

export default Featured;
