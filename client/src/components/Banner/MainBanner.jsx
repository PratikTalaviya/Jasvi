// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import Slider from "react-slick";
// import { GetBanner } from "../../https/axios";

// const MainBanner = () => {
//   const [mybanners, setMybanners] = useState([]);
//   useEffect(() => {
//     async function mybanner() {
//       const bannerdata = await GetBanner();
//       setMybanners(bannerdata.data.BannerList);
//       console.log(bannerdata.data);
//     }
//     mybanner();
//   }, []);
//   const settings = {
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     fade: true,
//     swipeToSlide: true,
//     autoplaySpeed: 2500,
//     autoplay: true,
//     arrows: false,
//     pauseOnDotsHover: true,
//     dots: true,
//   };

//   return (
//     <div className="rounded-[1rem] sm:aspect-[3/1] aspect-square w-full mb-[1.5rem] ">
//       <Slider {...settings}>
//         {mybanners &&
//           mybanners.map((data) => (
//             <div className="">
//               <div className="">
//                 <Link to={"/allproduct"}>
//                   <img
//                     src={`${data.image}`}
//                     className="object-cover rounded-2xl w-full aspect-square sm:aspect-[3/1]"
//                   />
//                   {/* <img
//                           src="https://medias.utsavfashion.com/media/wysiwyg/home/2023/2701/hs-thu-gen-yes-valentinespecialin-270123.jpg"
//                           className="img-fluid mainimg" draggable="false"
//                         /> */}
//                 </Link>
//               </div>
//             </div>
//           ))}
//       </Slider>
//     </div>
//   );
// };

// export default MainBanner;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { GetBanner } from "../../https/axios";

const MainBanner = () => {
  const [mybanners, setMybanners] = useState([]);
  const [aspectRatio, setAspectRatio] = useState("aspect-[3/1]");

  useEffect(() => {
    async function mybanner() {
      const bannerdata = await GetBanner();
      setMybanners(bannerdata.data.BannerList);
      console.log(bannerdata.data);
    }
    mybanner();

    const handleResize = () => {
      if (window.innerWidth > 750) {
        setAspectRatio("aspect-[3/1]");
      } else if (window.innerWidth > window.innerHeight) {
        setAspectRatio("aspect-[3/1]");
      } else {
        setAspectRatio("aspect-square");
      }
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    fade: true,
    swipeToSlide: true,
    autoplaySpeed: 2500,
    autoplay: true,
    arrows: false,
    pauseOnDotsHover: true,
    dots: true,
  };

  return (
    <div className={`rounded-outer ${aspectRatio} w-full mb-[1.5rem]`}>
      <Slider {...settings}>
        {mybanners &&
          mybanners.map((data) => (
            <div key={data.id} className="">
              <div className="">
                <Link to={"/allproduct"}>
                  <img
                    src={`${data.image}`}
                    className={`object-cover rounded-outer w-full ${aspectRatio}`}
                    alt={data.alt || "Banner Image"}
                  />
                </Link>
              </div>
            </div>
          ))}
      </Slider>
    </div>
  );
};

export default MainBanner;
