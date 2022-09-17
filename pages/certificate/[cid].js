/* This example requires Tailwind CSS v2.0+ */
import { PaperClipIcon } from '@heroicons/react/20/solid'
import { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import { useRouter } from 'next/router'
import {getCertificateWithCertificateId, validateCertificate,invalidateCertificate,getAllValidatorsOfContract} from '../../utils/functions'
import { chainIdToExplorer, unixTimeStamptoDate, chainIdToNetworkName } from '../../utils/utils'


export default function Certificate() {

  const router = useRouter();
  const {cid} = router.query
  useEffect(() => {
    if(!cid){
        return
    }
    getCertificateInformation()
    getNumberOfValidators()
  }, [router])


  async function getNumberOfValidators(){
    let v = await getAllValidatorsOfContract(cid)
    console.log(validators)
    setValidators(v)
  }


  let [currentCertificate, setCurrentCertificate] = useState({})
  let [explorerLinkContract, setExplorerLinkContract] = useState("")
  let [networkName, setNetworkName] = useState("")
  let [certificateValidity, setCertificateValidity] = useState(false)
  let [validators, setValidators] = useState([])
  
  async function getCertificateInformation(){
    if (router.query.cid === undefined) {
        return
    }
    let c = await getCertificateWithCertificateId(router.query.cid)
    setCurrentCertificate(c)
    console.log("Certificate", c)
    setExplorerLinkContract(chainIdToExplorer(c.chainId) + "/address/" + c.contractAddress)
    setNetworkName(chainIdToNetworkName(c.chainId))
    console.log("Certificate validity", c[5])
    setCertificateValidity(c[5])
  }
  
  return (
    <>
    <Navbar/>
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-5">
    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Certificate Information</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500 pb-5">Details about this smart contract address certificate.</p>  
        <button
        type="button"
        className="inline-flex items-center rounded-md border border-transparent bg-green-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        onClick={(e) => {e.preventDefault();validateCertificate(currentCertificate[0])}}
        >
        Validate this certificate?
      </button>
      </div>
      
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Name of Contract</dt> 
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{currentCertificate[1]}</dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Address of contract</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 hover:text-blue-400">
                <a href={explorerLinkContract} target="_blank">
                {currentCertificate[2]}
                </a>
            </dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Creator of certificate</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 hover:text-blue-400">
                <a href={"https://debank.com/profile/"+currentCertificate[3]} target="_blank">
                {currentCertificate[3]}
                </a>
            </dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Creation of the certificate</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{unixTimeStamptoDate(currentCertificate.creationTime)}</dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Network</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {networkName}
            </dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Validity</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {certificateValidity ? 
                "Valid":
                "Invalid"}
                &nbsp;&nbsp;&nbsp; 
                <button
                type="button"
                className="inline-flex items-center rounded-md border border-transparent bg-red-600 px-2 py-1 text-sm font-medium leading-4 text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                onClick={(e) => {e.preventDefault();invalidateCertificate(currentCertificate[0])}}
                >
                Invalidate (only owner)
                </button>
            </dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-blue-500">
                <a href={"/validators/"+currentCertificate[0]} target='_blank'>
                See all Validators ({validators.length})
                </a>
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <ul role="list" className="divide-y divide-gray-200 rounded-md border border-gray-200">
                {validators.map((validator) => (
                    <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                      <a href={"https://debank.com/profile/"+currentCertificate[3]} target="_blank" className="font-medium text-indigo-600 hover:text-indigo-500">
                        {validator}
                      </a>
                    </li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>
      </div>
    </div>
    </div>
    </>
  )
}
