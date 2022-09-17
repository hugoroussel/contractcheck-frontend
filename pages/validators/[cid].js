import { useEffect } from 'react'
import { useState } from 'react'
import { getAllValidatorsOfContract } from '../../utils/functions'
import { useRouter } from 'next/router'
import Navbar from '../../components/Navbar'
import ValidatorCard from '../../components/ValidatorCard'

export default function Validators() {
  let [validatorAddresses, setValidatorAddresses] = useState([])
  let router = useRouter();
  let {cid} = router.query


  useEffect(() => {
    if(!cid){
        return
    }
    getRouter()
    getNumberOfValidators()
  }, [router])

  async function getRouter(){
    // check if router query address is undefined
    if (router.query.cid === undefined) {
        return
    }
  }

  async function getNumberOfValidators(){
    let v = await getAllValidatorsOfContract(cid)
    setValidatorAddresses(v)
  }


  return (
    <div className="bg-white">
      <div className="relative overflow-hidden">
        <main>

          {/* Feature section with grid */}
          <div className="relative bg-white py-16 sm:py-24 lg:py-32">
            <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
              <div className="mt-12 place-content-center">
                <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  All validators ({validatorAddresses.length} validator(s)) for certificate &nbsp;
                  <a href={"/certificate/"+cid} target="_blank" rel="noreferrer" className="text-blue-500">
                  {cid === undefined ?
                   (<></>):
                    (
                    <>
                      {cid.slice(0, 10)+"..."+cid.slice(-3)}
                    </>
                    )
                  }
                  </a>
                  </h3>
                  <ul className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                      {validatorAddresses.map((item,i) => (
                          <ValidatorCard key={i} validatorAddress={item}/>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
