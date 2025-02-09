import Image from "next/image"


const ProductionHouse = () => {
    const data=[
        {id:1,image:"/assets/Images/disney.png",video:"/assets/Videos/disney.mp4"},
        {id:2,image:"/assets/Images/pixar.png",video:"/assets/Videos/pixar.mp4"},
        {id:3,image:"/assets/Images/marvel.png",video:"/assets/Videos/marvel.mp4"},
        {id:4,image:"/assets/Images/starwar.png",video:"/assets/Videos/star-wars.mp4"},
        {id:5,image:"/assets/Images/nationalG.png",video:"/assets/Videos/national-geographic.mp4"},
    ]
    return (
    <div className="flex items-center flex-row gap-2 md:gap-6 m-10 px-4 py-4 md:px-16">
        {data.map((item)=>(
            <div key={item.id} className="-hidden rounded-md border-[2px] hover:scale-110">
                <video src={item.video} autoPlay loop playsInline muted className="absolute z-0  rounded-md opacity-0  hover:opacity-50"/>
                    <Image src={item.image} alt="image" width={400} height={400} className="w-full z-1 opacity-100"/>
            </div>
        ))}
    </div>
)
}

export default ProductionHouse
