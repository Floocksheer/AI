"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const testimonials=[
    {
        name:"Ahmet Furkan Yorulmaz",
        title:"Software Engineer",
        Description:"This is the best application I've used!"
    },
    {
        name:"Batuhan Gümüş",
        title:"Software Engineer",
        Description:"This application solved all of my code errors easily!"
    },
    {
        name:"Ozan Güzel",
        title:"Software Engineer",
        Description:"This is the most intelligent AI I've ever used!"
    },
    {
        name:"Seif Elredini",
        title:"Ceo",
        Description:"This is one of the best application we have ever developed!"
    }
]

export const LandingContent = () => {
    return (
        <div className="px-10 pb-20">
           <h2 className="text-center text-4xl text-white font-extrabold mb-10">
                Testimonials
           </h2>
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {testimonials.map((item) => (
                        <Card key={item.Description} className="bg-[#192339] border-none text-white">
                            <CardHeader>
                                <CardTitle className="flax items-center gap-x-2">
                                        <div>
                                            <p className="text-lg">{item.name}</p>
                                            <p className="text-zinc-400 text-sm">{item.title}</p>
                                            
                                        </div>
                                </CardTitle>
                                <CardContent className="pt-4 px-0">
                                    {item.Description}
                                </CardContent>
                            </CardHeader>
                        </Card>
                    ))}
           </div>
        </div>
    )
}