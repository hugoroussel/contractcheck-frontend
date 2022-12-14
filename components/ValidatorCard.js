import { Popover } from '@headlessui/react'
import { ShieldCheckIcon, PhoneIcon, DocumentMagnifyingGlassIcon, NoSymbolIcon } from '@heroicons/react/20/solid'
import { useEffect, useState } from 'react'
import {chainIdToNetworkIcon, unixTimeStamptoDate,getValidatorEns} from '../utils/utils'
import {getAllValidatorsOfContract} from '../utils/functions'   
import axios from "axios"
import { useRouter } from "next/router"
const ValidatorCard = (validatorAddress) => {

    let router = useRouter()

    let [totalValidators, setTotalValidators] = useState([])
    let [validatorNetworth, setValidatorNetworth] = useState(0)
    let [ens, setEns] = useState("")

    useEffect(() => {
        getValidatorNetworth()
        handleGetEns()
    },[router])
    
    async function getValidatorNetworth(){
        let res = await axios.get("https://app.ondefy.com/v1/node/getUserWallet?evmAddr="+validatorAddress.validatorAddress)
        let totalInUSD = 0
        for(let i = 0; i < res.data.length; i++){
            totalInUSD = totalInUSD + res.data[i].balanceUSD
        }
        setValidatorNetworth(totalInUSD)
    }

    async function handleGetEns(){
      let name = await getValidatorEns(validatorAddress.validatorAddress)
      setEns(name)
    }

    
    

    return(
        <li className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
        <div className="flex w-full items-center justify-between space-x-6 p-6">
          <div className="flex-1 truncate">
            <div className="flex items-center space-x-3">
              <h3 className="truncate text-sm font-medium text-blue-900">
                <a href={"https://debank.com/profile/"+validatorAddress.validatorAddress} target="_blank" rel="noreferrer">
                Validator : {validatorAddress.validatorAddress}
                </a>
              </h3>
            </div>
          </div>
        </div>
        <div>
          <div className="-mt-px flex divide-x divide-gray-200">
          <div className="-ml-px flex w-0 flex-1">
              <div
                className="relative inline-flex w-0 flex-1 items-center justify-center rounded-br-lg border border-transparent py-4 text-sm font-medium text-gray-700"
              >
                {validatorNetworth.toFixed(2)}$ Networth
              </div>
            </div>
            <div className="-ml-px flex w-0 flex-1">
              <div
                className="relative inline-flex w-0 flex-1 items-center justify-center rounded-br-lg border border-transparent py-4 text-sm font-medium text-gray-700"
              >
                {ens === "" ? 
                <>
                No Ens
                &nbsp;
                <NoSymbolIcon 
                className="h-5 w-5 text-gray-400" aria-hidden="true"
                /> 
                </> : ens}  
              </div>
            </div>
          </div>
        </div>
      </li>
    )
}

export default ValidatorCard;