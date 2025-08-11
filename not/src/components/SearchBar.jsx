
export const SearchBar = ({setVideoInfo}) => {

    const HandleSearch = async () => {
        let input = document.getElementById('input');
        let inputValue = input.value;
        input.value = ""
        const queryParams = new URLSearchParams({ input: inputValue }).toString();
        const response = await fetch(`http://localhost:3000/api/video/info?${queryParams}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json()
        setVideoInfo(data)
    }

    return (
        <div className="form-control">
            <label className="input flex items-center gap-2 rounded-full border-2 border-gray-300">
                <input type="text" className="grow w-24 md:w-64 h-10 rounded text-gray-900" placeholder="Search Music" id='input'/>
                <svg onClick={() => HandleSearch()}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="black"
                className="h-4 w-4 opacity-70 hover:cursor-pointer">
                <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd" />
                </svg>
            </label>
        </div>
    )
}
