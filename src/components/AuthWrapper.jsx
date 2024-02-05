import React, { useState } from 'react'
import { MdFacebook } from "react-icons/md"
import { FcGoogle } from "react-icons/fc"
import { useStateProvider } from '@/context/StateContext'
import { reducerCases } from '@/context/constants'
import axios from 'axios'
import { LOGIN_ROUTE, SIGNUP_ROUTE } from '@/utils/constants'
import { useCookies } from 'react-cookie'
import { IoCloseCircle } from 'react-icons/io5'

const AuthWrapper = ({ type }) => {
  const [cookies, setCookies] = useCookies()
  const [{ showLoginModal, showSignupModal }, dispatch] = useStateProvider()
  const [values, setValues] = useState({ email: "", password: "" })
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleClick = async () => {
    try {
      const { email, password } = values
      if (email && password) {
        const {
          data: { user, jwt },
        } = await axios.post(
          type === "login" ? LOGIN_ROUTE : SIGNUP_ROUTE,
          { email, password },
          {
            headers: {

            }
          }
        )
        setCookies("jwt", jwt)
        dispatch({ type: reducerCases.CLOSE_AUTH_MODAL })
        if (user) {
          dispatch({ type: reducerCases.SET_USER, userInfo: user })
          window.location.reload()
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className='fixed top-0 z-[100] rounded-sm min-w-full left-0 right-0 bottom-0'>
      <div className="backdrop-blur-md relative h-full p-[auto] top-0 -z-[1]" id='blur-div'>
        <div className='pt-[400px] flex flex-col justify-center items-center'>
          <div className="fixed z-[101] h-max bg-white flex flex-col justify-center items-center rounded-md" id='auth modal'>
            <div className="flex flex-col justify-center items-center p-8 gap-7">
              <div className="flex items-center h-[40px] justify-between">
                <h3 className='text-2xl font-semibold to-slate-700'>{type === "login" ? "Login To Fiverr" : "Signup to Fiverr"}</h3>
              </div>
              <div className='flex flex-col gap-5'>
              </div>
              <div className="flex flex-col gap-5">
                <input
                  type="text"
                  name="email"
                  placeholder='Email'
                  className='border border-slate-300 p-3 w-80 focus:outline-none bg-white'
                  value={values.email.toLowerCase()}
                  onChange={handleChange}
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder='Password'
                  className='border border-slate-300 p-3 w-80 focus:outline-none bg-white'
                  value={values.password}
                  onChange={handleChange}
                  required
                />
                <button type='submit' className='bg-[#1dbf73] text-white px-12 text-lg font-semibold rounded-md focus:outline-none p-3 w-80' onClick={handleClick}>Continue</button>
              </div>
            </div>
            <div className="py-5 w-full flex items-center justify-center border-t border-r-slate-400">
              <span className='text-sm text-slate-700'>
                {type === "login" ?
                  (
                    <>
                      Not A Member Yet ? {" "}
                      <span
                        className='text-[#1dbf73] cursor-pointer'
                        onClick={() => {
                          dispatch({
                            type: reducerCases.TOGGLE_LOGIN_MODAL, showLoginModal: false,
                          })
                          dispatch({
                            type: reducerCases.TOGGLE_SIGNUP_MODAL, showSignupModal: true,
                          })
                        }
                        }>
                        Join Now
                      </span>
                    </>
                  ) : (
                    <>
                      Already a member ? {" "}
                      <span
                        className='text-[#1dbf73] cursor-pointer'
                        onClick={() => {
                          dispatch({
                            type: reducerCases.TOGGLE_SIGNUP_MODAL, showSignupModal: false,
                          })
                          dispatch({
                            type: reducerCases.TOGGLE_LOGIN_MODAL, showLoginModal: true,
                          })
                        }
                        }>
                        Login Now
                      </span>
                    </>
                  )
                }
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthWrapper