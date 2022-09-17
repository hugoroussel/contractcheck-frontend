import { useEffect } from 'react'
import { Popover } from '@headlessui/react'
import {
  ArrowLongRightIcon
} from '@heroicons/react/24/outline'
import { useState } from 'react'
import { ethers } from 'ethers'
import { getAllIndexed,getCertificateWithCertificateId } from '../utils/functions'
import {router} from 'next/router'
import Navbar from '../components/Navbar'
import CertificateCard from '../components/CertificateCard'


export default function Index() {

  let [totalIndexed, setTotalIndexed] = useState(0)
  let [certificates, setCertificates] = useState([])

  useEffect(() => {
    getIndexed()
    getCertificate()
  }, [])

  async function getIndexed() {
    let indexed = await getAllIndexed()
    console.log("indexed", indexed)
    setTotalIndexed(indexed.length)
  }

  async function getCertificate(){
    let indexed = await getAllIndexed()
    let result = []
    for(let i = 0; i < indexed.length; i++){
      let certificate = await getCertificateWithCertificateId(indexed[i])
      result.push(certificate)
    }
      setCertificates(result)
  }

  async function launchSearch(){
    console.log("search")
    // get value of form with contractSearch id
    let contractSearch = document.getElementById("contractSearch").value
    console.log("contractSearch", contractSearch)
    router.push('/contract/' + contractSearch)

  }

  return (
    <div className="bg-white">
      <div className="relative overflow-hidden">
        <Navbar/>
        <main>

          {/* Feature section with grid */}
          <div className="relative bg-white py-16 sm:py-24 lg:py-32">
            <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Check Before You Sign
              </p>
              <p className="mx-auto mt-5 max-w-prose text-xl text-gray-500">
                Avoir interacting with malicious contracts. Check what the community thinks of the contract address before you sign.
              </p>
              <div className="mt-12 place-content-center">
                <form action="#" className="sm:mx-auto sm:max-w-xl lg:mx-1000 place-content-center">
                        <div className="sm:flex">
                          <div className="min-w-0 flex-1">
                            <label htmlFor="email" className="sr-only">
                              Contract address
                            </label>
                            <input
                              id="contractSearch"
                              type="text"
                              placeholder="0x1234567890abcdef1234567890abcdef12345678"
                              /*value="0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"*/
                              className="block w-full rounded-3xl border-2 border-black px-4 py-3 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 "
                            />
                          </div>
                          <div className="mt-3 sm:mt-0 sm:ml-3">
                            <button
                              className="block w-full rounded-3xl border-2 border-black py-3 px-4 font-medium text-black shadow hover:from-teal-600 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-900"
                              onClick={(e) => {e.preventDefault();launchSearch()}}
                            >
                              Search
                            </button>
                          </div>
                        </div>
                  </form>  
              </div>
              <div className="mt-12 place-content-center text-md">
                Already {totalIndexed} contracts indexed
                <br/>
                <br/>
                <button
                type="button"
                className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={(e) => {e.preventDefault();router.push("/register")}}
                >
                Index your contract now
                <ArrowLongRightIcon className="ml-2 -mr-0.5 h-4 w-4" aria-hidden="true" />
                </button>
              </div>
              <br/>
              <br/>
              <br/>
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">Some contracts already indexed</h3>
                <ul className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                    {certificates.map((item,i) => (
                      <CertificateCard certificate={item}/>
                    ))}
                </ul>
                </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
