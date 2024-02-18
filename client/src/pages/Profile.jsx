import React, { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { handleSetUserInfo } from "../redux/slice/authSlice";

const profileSchema = yup.object().shape({
  username: yup.string().required("Please enter your username"),
  fullname: yup.string().required("Please enter your fullname"),
});

function Profile() {
  const { userInfo, userUpdateLoading } = useSelector((state) => state.auth);
  const [cookies] = useCookies()
  const [image, setImage] = useState(null);
  const [imageHover, setImageHover] = useState(false);
  const dispatch = useDispatch()


  const formik = useFormik({
    initialValues: {
      username: "",
      fullname: "",
    },
    validationSchema: profileSchema,
    onSubmit: (values) => {
      handlerUserUpdateInfo(values)
    },
  });

  function handlerUserUpdateInfo(data){
    dispatch(handleSetUserInfo({...data, image, token:cookies.token}))
  }

  console.log(userUpdateLoading);

  // const handleFile = (e) => {
  //   let file = e.target.files[0]
  //   const validateImageTyps = ['image/jpg', 'image/png', 'image/gif']
  //   if(validateImageTyps.includes(file['type'])){
  //     setImage(file)
  //   }
  //   console.log(file);
  // }

  return (
    <div className="flex flex-col items-center justify-center min-h-[130vh] gap-3">
      <h2 className="text-3xl cursor-pointer">Welcome to Fiverr Clone</h2>
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col items-center w-full gap-5 py-10"
      >
        <div
          onMouseEnter={() => setImageHover(true)}
          onMouseLeave={() => setImageHover(false)}
          className="flex flex-col items-center cursor-pointer"
        >
          <label className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
            Select a profile Picture
          </label>
          <div className="bg-purple-500 h-36 w-36 flex items-center justify-center rounded-full relative">
            <div className="bg-purple-500 h-36 w-36 flex items-center justify-center rounded-full relative ">
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt="image"
                  className="rounded-full w-full h-full"
                />
              ) : (
                <span className="text-6xl text-white">
                  {userInfo.email.split("")[0].toUpperCase()}
                </span>
              )}
              <div
                className={`absolute bg-slate-400 h-full w-full rounded-full flex items-center justify-center transition-all duration-100 ${
                  imageHover ? "opacity-100" : "opacity-0"
                }`}
              >
                <span className=" flex items-center justify-center  relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-36 overflow-hidden h-36 text-white bg-slate-700 rounded-full absolute"
                    viewBox="20 20 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <input
                    type="file"
                    className="opacity-0"
                    onChange={(e) => setImage(e.target.files[0])}
                    // multiple
                    accept="image/jpeg, image/jpg, image/png, image/gif"
                    name="profileImage"
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-4 w-[500px]">
          <div>
            <label
              className="mb-2 text-lg font-medium text-gray-900  dark:text-white"
              htmlFor="userName"
            >
              Please select a userName
            </label>
            <input
              className="block p-4 w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50  focus:ring-blue-500 focus:border-blue-500"
              type="text"
              name="username"
              id="userName"
              placeholder="User Name"
              value={formik.values.username}
              onChange={formik.handleChange("username")}
              onBlur={formik.handleBlur("username")}
            />
            <span className="text-xs text-red-500">
              {formik.touched.username && formik.errors.username}
            </span>
          </div>
          <div>
            <label
              className="mb-2 text-lg font-medium text-gray-900  dark:text-white"
              htmlFor="fullName"
            >
              Please enter your fullName
            </label>
            <input
              className="block p-4 w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50  focus:ring-blue-500 focus:border-blue-500"
              type="text"
              name="fullname"
              id="fullName"
              placeholder="Full Name"
              value={formik.values.fullname}
              onChange={formik.handleChange("fullname")}
              onBlur={formik.handleBlur("fullname")}
            />
            <span className="text-xs text-red-500">
              {formik.touched.fullname && formik.errors.fullname}
            </span>
          </div>
        </div>
        <div className="flex flex-col w-[500px]">
          <label
            className="mb-2 text-lg font-medium text-gray-900  dark:text-white"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            name="description"
            id="description"
            className="block p-4 w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50  focus:ring-blue-500 focus:border-blue-500"
            placeholder="Description..."
          ></textarea>
        </div>
        <button
          className="border text-lg font-semibold px-5 py-3 border-[#1DBF73] bg-[#1DBF73] text-white rounded-md"
          type="submit"
        >
          Set Profile
        </button>
      </form>
    </div>
  );
}

export default Profile;
