import Navbar from "../components/Navbar"
import {registerNewCertificate} from "../utils/functions"

export default function Register() {

    async function handleRegisterNewCertificate(){
        let name = document.getElementById("name").value
        let contractAddress = document.getElementById("contractAddress").value
        let chainId = document.getElementById("chainId").value
        let result = await registerNewCertificate(name, contractAddress, chainId)
    }


    return (
        <>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-5">
        <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Register your contract here</h3>
            <div className="mt-2 max-w-xl text-sm text-gray-500">
            <p>Indicate the name of the contract, its address and its network</p>
            </div>
            <form className="mt-5">
            <p>Contract Description</p>
            <div className="w-full sm:max-w-xs">
                <label htmlFor="text" className="sr-only">
                Name
                </label>
                <input
                type="text"
                name="name"
                id="name"
                className="block w-full rounded-md border-grey-300 border-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                placeholder="Aave usdc lending pool v2 mainnet"
                />
            </div>
            <br/>
            <p>Contract Address</p>
            <div className="w-full sm:max-w-xs">
                <label htmlFor="text" className="sr-only">
                Name
                </label>
                <input
                type="text"
                name="name"
                id="contractAddress"
                className="block w-full rounded-md border-grey-300 border-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                placeholder="0x1234567890abcdef1234567890abcdef12345678"
                />
            </div>
            <br/>
            <p>Chain ID</p>
            <div className="w-full sm:max-w-xs">
                <label htmlFor="text" className="sr-only">
                Name
                </label>
                <input
                type="number"
                name="name"
                id="chainId"
                className="block w-full rounded-md border-grey-300 border-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                placeholder="1 mainnet, 10 optimism, 250 fantom, etc.."
                />
            </div>
            </form>
            <br/>
            <button
            type="button"
            className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={(e) => {e.preventDefault();handleRegisterNewCertificate()}}
            >
            Register
            </button>
        </div>
    </div>
        </div>
        </>
    )
  }
  