import { Popover } from '@headlessui/react'
import { ShieldCheckIcon, PhoneIcon, DocumentMagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { useEffect, useState } from 'react'
import {chainIdToNetworkIcon, unixTimeStamptoDate,chainIdToNetworkName} from '../utils/utils'
import {getAllValidatorsOfContract} from '../utils/functions'   

const CertificateCard = (certificate) => {

    let [totalValidators, setTotalValidators] = useState([])

    useEffect(() => {
        getNumberOfValidators()
        console.log("certificate card", certificate.certificate.chainId.toString())
    })
    
    async function getNumberOfValidators(){
        let validators = await getAllValidatorsOfContract(certificate.certificate.cid)
        setTotalValidators(validators.length)
    }

    return(
        <li key={certificate.certificate.name} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
        <div className="flex w-full items-center justify-between space-x-6 p-6">
          <div className="flex-1 truncate">
            <div className="flex items-center space-x-3">
              <h3 className="truncate text-sm font-medium text-gray-900">{certificate.certificate.name}</h3>
            </div>
            <p className="mt-1 truncate text-sm text-gray-500">Certificate creation : {unixTimeStamptoDate(certificate.certificate.creationTime)}</p>
            <p className="mt-1 truncate text-sm text-gray-500">Network : {chainIdToNetworkName(certificate.certificate.chainId)}</p>
          </div>
          <img className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300" src={chainIdToNetworkIcon(certificate.certificate.chainId)} alt="" />
        </div>
        <div>
          <div className="-mt-px flex divide-x divide-gray-200">
            <div className="flex w-0 flex-1">
              <a
                className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500"
                href={`/certificate/`+certificate.certificate.cid}
              >
                <DocumentMagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                <span className="ml-3">Details</span>
              </a>
            </div>
            <div className="-ml-px flex w-0 flex-1">
              <div
                className="relative inline-flex w-0 flex-1 items-center justify-center rounded-br-lg border border-transparent py-4 text-sm font-medium text-gray-700"
              >
                <ShieldCheckIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                <span className="ml-3">
                  <a href={"/validators/"+certificate.certificate.cid}>
                  Validators : {totalValidators}
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </li>
    )
}

export default CertificateCard;