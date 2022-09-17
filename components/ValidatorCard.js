import { Popover } from '@headlessui/react'
import { ShieldCheckIcon, PhoneIcon, DocumentMagnifyingGlassIcon, NoSymbolIcon } from '@heroicons/react/20/solid'
import { useEffect, useState } from 'react'
import {chainIdToNetworkIcon, unixTimeStamptoDate} from '../utils/utils'
import {getAllValidatorsOfContract} from '../utils/functions'   
import axios from "axios"
import { useRouter } from "next/router"
import { ethers } from 'ethers'
const ValidatorCard = (validatorAddress) => {

    let router = useRouter()

    let [totalValidators, setTotalValidators] = useState([])
    let [validatorNetworth, setValidatorNetworth] = useState(0)
    let [ens, setEns] = useState("")

    useEffect(() => {
        getValidatorNetworth()
        getValidatorEns()
    },[router])
    
    async function getValidatorNetworth(){
        console.log("validator address", validatorAddress)
        let res = await axios.get("https://app.ondefy.com/v1/node/getUserWallet?evmAddr="+validatorAddress.validatorAddress)
        console.log("res", res.data);
        for(let i = 0; i < res.data.length; i++){
            setValidatorNetworth(validatorNetworth + res.data[i].balanceUSD)
        }
    }

    async function getValidatorEns(){
      console.log("validator address", validatorAddress)
      let provider = new ethers.providers.JsonRpcProvider("https://eth-mainnet.g.alchemy.com/v2/MmxYpuE8DZTHveRSqIijqQg_u5qPCv0M")
      var name = await provider.lookupAddress(validatorAddress.validatorAddress);
      console.log("name", name)
      if (name === null) {
        setEns("No ENS")
      } else {
        setEns(name)
      }
    }
    

    return(
        <li className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
        <div className="flex w-full items-center justify-between space-x-6 p-6">
          <div className="flex-1 truncate">
            <div className="flex items-center space-x-3">
              <h3 className="truncate text-sm font-medium text-blue-900">
                <a href={"https://debank.com/profile/"+validatorAddress.validatorAddress} target="_blank">
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
                {validatorNetworth}$ Networth
              </div>
            </div>
            <div className="-ml-px flex w-0 flex-1">
              <div
                className="relative inline-flex w-0 flex-1 items-center justify-center rounded-br-lg border border-transparent py-4 text-sm font-medium text-gray-700"
              >
                {ens === "No ENS" ? 
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