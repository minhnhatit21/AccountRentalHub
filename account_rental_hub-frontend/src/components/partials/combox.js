import { Fragment, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'

function M_Combobox({
    data
}) {

    const [selected, setSelected] = useState(data[0])
    const [query, setQuery] = useState('')

    console.log("Combox Data: ", data)

    const filteredPeople =
        query === ''
            ? data
            : data.filter((person) =>
                person.name
                    .toLowerCase()
                    .replace(/\s+/g, '')
                    .includes(query.toLowerCase().replace(/\s+/g, ''))
            )

    return (
        <div className="relative w-full">
            <Combobox value={selected} onChange={setSelected}>
                <div className="relative w-full rounded-md border-gray-300 border-2 py-2 px-2 text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm appearance-none bg-white">
                    <Combobox.Input
                        className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                        displayValue={(person) => person.name || person.service.service_name}
                        onChange={(event) => setQuery(event.target.value)}
                    />
                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                            <path fillRule="evenodd" d="M10.53 3.47a.75.75 0 0 0-1.06 0L6.22 6.72a.75.75 0 0 0 1.06 1.06L10 5.06l2.72 2.72a.75.75 0 1 0 1.06-1.06l-3.25-3.25Zm-4.31 9.81 3.25 3.25a.75.75 0 0 0 1.06 0l3.25-3.25a.75.75 0 1 0-1.06-1.06L10 14.94l-2.72-2.72a.75.75 0 0 0-1.06 1.06Z" clipRule="evenodd" />
                        </svg>
                    </Combobox.Button>
                </div>
                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    afterLeave={() => setQuery('')}
                >
                    <Combobox.Options className="absolute top-full right-0 z-[300] mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                        {filteredPeople.length === 0 && query !== '' ? (
                            <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                                Nothing found.
                            </div>
                        ) : (
                            filteredPeople.map((person) => (
                                <Combobox.Option
                                    key={person.id}
                                    className={({ active }) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-teal-600 text-white' : 'text-gray-900'
                                        }`
                                    }
                                    value={person}
                                >
                                    {({ selected, active }) => (
                                        <>
                                            <span
                                                className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                    }`}
                                            >
                                                {person.name || person.service.service_name}
                                            </span>
                                            {selected ? (
                                                <span
                                                    className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-teal-600'
                                                        }`}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                                                    </svg>
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </Combobox.Option>
                            ))
                        )}
                    </Combobox.Options>
                </Transition>
            </Combobox>
        </div>
    );
}

export default M_Combobox;