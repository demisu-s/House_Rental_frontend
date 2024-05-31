export default function Slider() {
    return (
        <div className="sm:flex justify-between">
            <button className="border px-4 rounded-md">&larr; Back</button>

            <div>
                <button className="border w-12 h-12 rounded-md focus:bg-indigo-950 focus:text-white mr-1">1</button>
                <button className="border w-12 h-12 rounded-md focus:bg-indigo-950 focus:text-white mr-1">2</button>
                <button className="border w-12 h-12 rounded-md focus:bg-indigo-950 focus:text-white mr-1">3</button>
                <button className="border w-12 h-12 rounded-md focus:bg-indigo-950 focus:text-white mr-1">4</button>
                <button className="border w-12 h-12 rounded-md focus:bg-indigo-950 focus:text-white mr-1">5</button>
            </div>

            <button className="border px-4 rounded-md">Next &rarr;</button>
        </div>
    )
}