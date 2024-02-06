import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

type EditBridgeLabels = {
  key: string
  value: string
}

const editBridgeLabels: EditBridgeLabels[] = [
  { key: 'bridgeName', value: 'Bridge Name' },
  { key: 'from', value: 'From' },
  { key: 'to', value: 'To' },
  { key: 'method', value: 'Method' }
]

type EditBridgeModalProps = {
  selectedBridge: {
    id?: number
    from?: string
    to?: string
    method?: string
    bridgeName?: string
  }
  isModalOpen: boolean
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const EditBridgeModal: React.FC<EditBridgeModalProps> = ({
  selectedBridge,
  setIsModalOpen
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  // State to track edit mode for each field
  const [editModes, setEditModes] = useState<{ [key: string]: boolean }>({
    bridgeName: false,
    from: false,
    to: false,
    method: false
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const toggleEditMode = (key: string) => {
    setEditModes((prevModes) => ({ ...prevModes, [key]: !prevModes[key] }))
  }

  const onSubmit: SubmitHandler<Record<string, any>> = (data) => {
    console.log(data)
    if (!errors) {
      setIsSubmitting(true)

      setTimeout(() => {
        setIsModalOpen(false)
        setIsSubmitting(false)
      }, 2000)
    }
    // Add logic for handling form submission
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col px-20 md:px-40"
    >
      <div className="mb-4 flex flex-col justify-between  lg:flex-row lg:space-x-10">
        <div className="bridge-edit mb-4 flex w-1/2 flex-col justify-start">
          {editBridgeLabels.map((item, index) => (
            <div className="mt-4 flex justify-between" key={item.key}>
              <div
                className={
                  index === 0
                    ? 'flex flex-col space-y-2'
                    : `flex flex-row space-x-2`
                }
              >
                <label
                  className={
                    index === 0
                      ? 'w-32 bg-transparent text-lg text-[#7E7B94]'
                      : 'w-20 bg-transparent text-lg text-[#7E7B94]'
                  }
                  htmlFor={item.key}
                >
                  {item.value} :
                </label>
                <input
                  id={item.key}
                  className={`border-none bg-transparent p-0 uppercase text-white ${
                    editModes[item.key] ? 'border-b-2 border-emerald-500' : ''
                  }`}
                  type="text"
                  key={item.key}
                  defaultValue={
                    selectedBridge[item.key as keyof typeof selectedBridge] ||
                    ''
                  }
                  // onChange={(e) => {}}
                  readOnly={!editModes[item.key]}
                  {...register(item.key, { required: true })}
                />
              </div>
              {index !== 0 && (
                <button
                  type="button"
                  className="text-white"
                  onClick={() => toggleEditMode(item.key)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                </button>
              )}
            </div>
          ))}
        </div>
        <div className="flex flex-col lg:w-1/2">
          <label
            htmlFor="information"
            className="bg-transparent text-lg text-[#7E7B94]"
          >
            Informations :
          </label>
          <textarea
            id="information"
            className="rounded-lg border-white bg-transparent uppercase text-white"
            rows={5}
          />
        </div>
      </div>

      <button
        type="submit"
        className="h-14 max-w-[50%] rounded-full bg-emerald-500"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Updating...' : 'Update Bridge'}
      </button>
    </form>
  )
}

export default EditBridgeModal
