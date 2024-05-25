import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import { NextFont } from "next/dist/compiled/@next/font";
import CardComponent from "./ui/Card";

export interface PostProps{
    imageUrl: string,
    title: string,
    content: string,
    author: string,
    role:string
}

type CardsProps = {
  font: NextFont;
  posts: PostProps[]
};

export default function Cards({ font, posts }: CardsProps) {
  return (
    <section className="w-[90%] mx-auto py-12 md:py-16 lg:py-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
        {posts.map((post, index) => (
          <CardComponent key={index} font={font} post={post} />
        ))}
      </div>
    </section>
  );
}
