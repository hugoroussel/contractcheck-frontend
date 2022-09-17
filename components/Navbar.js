import { Popover } from '@headlessui/react'
import {useEffect, useState} from 'react'
import {router} from 'next/router'

const Navbar = () => {

    let [userAddress, setUserAddress] = useState("")

    useEffect(()=> {
      setAddress()
      let ua = localStorage.getItem("userAddress")
      if(ua !== null){
        setUserAddress(ua)
      }
    }, [])

    async function getCurrentAddress(){
      let accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      // set accounts[0] in local storage
      localStorage.setItem("userAddress", accounts[0])
      return accounts[0]
    }

    async function setAddress(){
      if (typeof window.ethereum !== 'undefined') {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
      }
      let address = await getCurrentAddress()
      setUserAddress(address)
    }
    return(
       <Popover as="header" className="relative">
          <div className="bg-white pt-6">
            <nav
              className="relative mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6"
              aria-label="Global"
            >
              <div className="flex flex-1 items-center">
                <div className="flex w-full items-center justify-between md:w-auto hover:text-blue-600 text-2xl text-bold hover:cursor-pointer">
                  <a onClick={(e)=> {e.preventDefault();router.push("/")}}>
                    ContractCheck
                  </a>
                </div>
              </div>
              <div className="md:flex md:items-center md:space-x-6">
                {userAddress === "" ? (
                <a
                  href="#"
                  className="inline-flex items-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-base font-medium text-white hover:bg-gray-700"
                  onClick={(e) => {e.preventDefault();setAddress()}}
                >
                  Connect Wallet
                </a>
                ) : (
                <p
                className="inline-flex items-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-base font-medium text-white hover:bg-gray-700"
                >
                  {userAddress.slice(0, 5) + "..." + userAddress.slice(-3)}
                </p>
                )}
              </div>
            </nav>
          </div>
        </Popover>
    )
}

export default Navbar;