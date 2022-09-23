import React from 'react'
import { ExclamationCircleIcon } from '@heroicons/react/solid'

function Input({label, type, value, name, onChangeProp, errorProps}) {
  return (
    <div className='mb-3'>
    <label className="block text-xl text-gray-700">
        { label }
    </label>
    <div className="mt-1 relative rounded-md shadow-sm">
        <input
        type={ type }
        name={ name }
        className=
            {
                !errorProps ? "shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md text-2xl" :
                "block w-full pr-10 border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"
            } 
        placeholder=""
        autoComplete=""
        value = { value }
        aria-invalid="true"
        onChange={ onChangeProp }
        />
        {
            errorProps &&
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                </div>
        }
    </div>
    {
      errorProps &&
      <p className="mt-1 text-sm text-red-600" id="email-error">
        {errorProps.message}
      </p>
    }
</div>
)
}

export default Input