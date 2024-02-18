import React, { useEffect, useRef, useState } from "react";
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link } from "react-router-dom";
import moment from "moment";

function BellNotification() {
  const container = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [userMessage, setUserMessage] = useState([
    {
      sender: {
        email: "Alisher@gmail.com",
        profileImage: {
          url: "https://www.pngwing.com/en/free-png-xsukd",
        },
        userName: "Alisher",
        fullName: "Alisher Sadullayev",
      },
      text: " rtrfgv 5ty trhva r theydfsh jtyr w fgewrg ethj ty rtjnkhqehg erghyerh ghqh gerygtdfmvnhegyer gengyrey ghelhgqerh.g ergue",
      createdAt: "2024-01-30 15:04:12 UTC",
    },
    {
      sender: {
        email: "Ilyos@gmail.com",
        profileImage: {
          url: "https://www.pngwing.com/en/free-png-xsukd",
        },
        userName: "Ilyos",
        fullName: "Ilyos Sadullayev",
      },
      text: " rtrfgv 5ty trhva r theydfsh jtyr w fgewrg ethj ty rtjnkhqehg erghyerh ghqh gerygtdfmvnhegyer gengyrey ghelhgqerh.g ergue",
      createdAt: "2024-01-30 16:04:12 UTC",
    },
  ]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (e.target.id !== "bellNotification") {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  console.log(isOpen);
  
  return (
    <div>
      <button
        data-dropdown-toggle
        className="inline-flex items-center text-sm font-medium text-center text-gray-500 hover:text-gray-900 focus:outline-none dark:hover:text-white dark:text-gray-400"
        type="button"
        ref={container}
      >
        <span id="bellNotification" className="relative inline-block mt-1">
          <NotificationsIcon fontSize="medium" id="bellNotification" />
          {userMessage.length > 0 && (
            <span className="absolute top-0 right-0 inline-flex items-center px-1 py-1 text-[9px] font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                {userMessage.length}
            </span>
          )}
        </span>
      </button>
      {isOpen && (
        <div
          className="grid fixed z-20 left-0 w-screen h-screen justify-center items-center"
        >
          <div
            className={`md:place-self-end md:mr-[17.5rem] md:top-0 place-self-auto ${
              isOpen ? "block" : "hidden"
            } absolute z-[21] w-full max-w-sm bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-800 dark:divide-gray-700`}
            aria-label="bellNotificationButton"
          >
            <div
              id="bellNotification"
              className="flex items-center gap-1 px-4 py-2 font-medium text-center text-gray-700 rounded-t-lg bg-gray-50 dark:bg-gray-800 dark:text-white"
            >
              <NotificationsIcon fontSize="medium" className="text-base" />
              <p>Notification {userMessage.length}</p>
            </div>
            <div className="divide-y h-[24rem] overflow-y-auto divide-gray-100 dark:divide-gray-700">
              {userMessage.length > 0 ? (
                <>
                  {userMessage
                    .map((item, i) => (
                      <Link
                        key={i}
                        className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 items-center"
                        to="/buyer/orders/messages/1"
                      >
                        <div className="flex-shrink-0 ">
                          {item.sender.profileImage ? (
                            <img
                              src={item.sender.profileImage.url}
                              alt={item.sender.userName}
                              className="rounded-full w-11 h-11 object-cover"
                            />
                          ) : (
                            <div className="bg-purple-500 h-11 w-11 flex items-center justify-center rounded-full relative">
                              <span className="text-lg text-white">
                                {item.sender.email[0]?.toUpperCase()}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="w-full pl-3">
                          <div className="grid text-gray-500 text-sm mb-1.5 dark:text-gray-400">
                            <span className="flex font-semibold text-gray-900 dark:text-white">
                              {item.sender.userName}
                            </span>
                            {item.text.length > 73 ? (
                              <span>
                                {item.text.substring(0, 73)}
                                ...
                              </span>
                            ) : (
                              <span>{item.text}</span>
                            )}
                          </div>
                          <div className="flex">
                            <span className="text-xs text-blue-600 dark:text-blue-500">
                              {moment(item.createdAt).format(
                                "DD/MM/YYYY HH:mm"
                              )}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))
                    .reverse()}
                </>
              ) : (
                <div className="flex flex-col items-center bg-white h-full justify-center leading-5 text-center">
                  <strong className="contents text-[17px] font-normal pb-[10px]">
                    <span className="p-2 grid justify-center rounded-full bg-zinc-100">
                      <NotificationsIcon fontSize="large" id='bellNotification' className="opacity-20"/>
                    </span>
                  </strong>
                  <p className="text-[#b5b6ba] text-[14px] max-w-[240px] mt-5">
                    Browse our amazing catalogue of gigs or offer your talent on
                    Fiverr
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BellNotification;
