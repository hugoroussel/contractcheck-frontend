import { useEffect } from 'react'
import { useState } from 'react'
import { getCertificatesForAddress, getCertificateWithCertificateId } from '../../utils/functions'
import { useRouter } from 'next/router'
import Navbar from '../../components/Navbar'
import CertificateCard from '../../components/CertificateCard'
import {ArrowLongRightIcon} from '@heroicons/react/24/outline'
export default function Address() {

  let [totalIndexed, setTotalIndexed] = useState(0)
  let [certificates, setCertificates] = useState([])
  const router = useRouter();
  let [noResult, setNoResult] = useState(false)

  let {address} = router.query


  useEffect(() => {
    if(!address){
        return
    }
    getRouter()
  }, [router])

  async function getRouter(){
    // check if router query address is undefined
    if (router.query.address === undefined) {
        return
    }
    let cids = await getCertificatesForAddress(router.query.address)
    console.log("CIDs", cids)
    if (cids.length === 0) {
        setNoResult(true)
    } else {
        let result = []
        for(let i = 0; i < cids.length; i++){
            let certificate = await getCertificateWithCertificateId(cids[i])
            result.push(certificate)
        }
        setCertificates(result)
    }
  }

  return (
    <div className="bg-white">
      <div className="relative overflow-hidden">
      <Navbar/>
        <main>

          {/* Feature section with grid */}
          <div className="relative bg-white py-16 sm:py-24 lg:py-32">
            <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
              <div className="mt-12 place-content-center">
                {noResult ? (
                <>
                No result got rekt son
                <br/>
                <br/>
                <button
                type="button"
                className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={(e) => {e.preventDefault();router.push("/register")}}
                >
                Index this contract now
                <ArrowLongRightIcon className="ml-2 -mr-0.5 h-4 w-4" aria-hidden="true" />
                </button>
                </>) : (
                    <div>
                    <h3 className="text-lg font-medium leading-6 text-gray-900">{certificates.length} result(s)</h3>
                    <ul className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                        {certificates.map((item,i) => (
                          <CertificateCard certificate={item}/>
                        ))}
                    </ul>
                    </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
