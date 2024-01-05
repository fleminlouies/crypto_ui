import React, { useState, useEffect } from 'react'
import { Dropdown } from 'primereact/dropdown'
import { Button } from 'primereact/button'
import { InputNumber } from 'primereact/inputnumber'
import * as cryptoApi from '../api/cryptoApi'
import { validationSchema } from '../validation/cryptoConvert'
import { ProgressSpinner } from 'primereact/progressspinner'

const selectedCryptoTemplate = (option, props) => {
  if (option) {
    return (
      <div className="flex align-items-center">
        <img
          alt={option.name}
          src={option.image}
          className={`mr-2 `}
          style={{ width: '18px' }}
        />
        <div>{option.name}</div>
      </div>
    )
  }

  return <span>{props.placeholder}</span>
}

const cryptoOptionTemplate = (option) => {
  return (
    <div className="flex align-items-center">
      <img
        alt={option.name}
        src={option.image}
        className={`mr-2 `}
        style={{ width: '18px' }}
      />
      <div>{option.name}</div>
    </div>
  )
}

const CryptoForm = ({ onConvert }) => {
  const [sourceCrypto, setSourceCrypto] = useState('')
  const [cryptos, setCryptos] = useState([])
  const [currencies, setCurrencies] = useState([{ key: 'usd', name: 'USD' }])
  const [targetCurrency, setTargetCurrency] = useState('usd')
  const [amount, setAmount] = useState(null)
  const [formErrors, setFormErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const initialLoad = async () => {
    // Fetch the list of cryptocurrencies
    setLoading(true)
    await cryptoApi
      .getCryptos()
      .then((data) => {
        if (Array.isArray(data)) {
          setCryptos(data)
        } else {
          console.error('Invalid data format:', data)
          setCryptos([])
        }
      })
      .catch((error) => {
        console.error('Error fetching cryptocurrencies:', error)
        setCryptos([])
      })

    await cryptoApi
      .getCurrencies()
      .then((data) => {
        if (Array.isArray(data)) {
          setCurrencies(data)
        }
      })
      .catch((error) => {
        console.error('Error fetching currencies:', error)
      })
    setLoading(false)
  }

  useEffect(() => {
    initialLoad()
  }, [])

  const convert = async () => {
    setLoading(true)
    const requestData = {
      sourceCrypto,
      amount,
      targetCurrency,
    }

    await cryptoApi
      .convertCurrency(requestData)
      .then((data) => {
        onConvert(data) // Pass the result back to the parent component
      })
      .catch((error) => console.error('Error:', error))

    setLoading(false)
  }

  const handleFieldChange = (fieldName, value) => {
    // Update the form state when a field value changes
    if (fieldName === 'sourceCrypto') {
      setSourceCrypto(value)
    } else if (fieldName === 'amount') {
      setAmount(value)
    } else if (fieldName === 'targetCurrency') {
      setTargetCurrency(value)
    }
  }

  const handleFormSubmit = () => {
    // Validate the form using Yup
    validationSchema
      .validate(
        {
          sourceCrypto,
          amount,
          targetCurrency,
        },
        { abortEarly: false },
      )
      .then(() => {
        // If validation succeeds, proceed with conversion
        convert()
        setFormErrors({})
      })
      .catch((errors) => {
        // If validation fails, update the form errors state
        const errorMap = {}
        errors.inner.forEach((error) => {
          errorMap[error.path] = error.message
        })
        setFormErrors(errorMap)
      })
  }

  return (
    <div className="bg-blue-900 rounded-2xl w-full shadow-md p-8 min-h-[300px] text-white">
      <div className="flex ">
        <h1 className="tracking-wide font-bold uppercase text-4xl mb-6">
          Crypto Convert{' '}
        </h1>
        {loading && (
          <ProgressSpinner
            style={{ width: '50px', height: '50px' }}
            strokeWidth="8"
            fill="var(--surface-ground)"
            animationDuration=".5s"
          />
        )}
      </div>
      <div className="grid gap-5 text-sm">
        <div className="flex flex-col">
          <label htmlFor="sourceCrypto" className="tracking-wide pb-2">
            Source Crypto:
          </label>
          <Dropdown
            value={sourceCrypto}
            onChange={(e) => setSourceCrypto(e.value)}
            optionValue="id"
            options={cryptos}
            optionLabel="name"
            placeholder="-Select-"
            filter
            valueTemplate={selectedCryptoTemplate}
            itemTemplate={cryptoOptionTemplate}
            className="w-full "
            pt={{
              root: { className: '!w-full' },
            }}
          />
          {formErrors.sourceCrypto && (
            <div className="text-red-500 mt-1 text-xs">
              {formErrors.sourceCrypto}
            </div>
          )}
        </div>
        <div className="grid grid-cols-2 max-md:grid-cols-1 gap-2">
          <div className="flex flex-col">
            <label htmlFor="targetCurrency" className="tracking-wide mb-2">
              Target Currency:
            </label>
            <Dropdown
              value={targetCurrency}
              onChange={(e) => handleFieldChange('targetCurrency', e.value)}
              optionValue="key"
              options={currencies}
              optionLabel="name"
              placeholder="-Select-"
              filter
              className="w-full "
            />
            {formErrors.targetCurrency && (
              <div className="text-red-500 mt-1 text-xs">
                {formErrors.targetCurrency}
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="amount" className="text-bold mb-2">
              Amount:
            </label>
            <InputNumber
              value={amount}
              onChange={(e) => handleFieldChange('amount', e.value)}
              className="w-full "
            />
            {formErrors.amount && (
              <div className="text-red-500 mt-1 text-xs">
                {formErrors.amount}
              </div>
            )}
          </div>
        </div>

        <Button label="Convert" onClick={handleFormSubmit} />
      </div>
    </div>
  )
}

export default CryptoForm
