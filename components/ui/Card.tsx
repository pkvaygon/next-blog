import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { NextFont } from "next/dist/compiled/@next/font";
import { PostProps } from "../Cards";

type CardComponentProps = {
  font: NextFont;
  post: PostProps;
};

export default function CardComponent({ font, post }: CardComponentProps) {
  const { imageUrl, title, content, author, role } = post;
  return (
    <Card>
      <CardHeader className="flex flex-col items-start gap-2  ">
        <Image className="object-cover object-center" src={imageUrl} alt="nextjs prisma" />
        <h2 className="text-lg text-ellipsis line-clamp-2 font-medium">
          {title}
        </h2>
      </CardHeader>
      <CardBody className="h-[100px] text-md text-foreground-500 overflow-hidden py-0">
        <p className={`${font.className} line-clamp-3`}>{content}</p>
      </CardBody>
      <CardFooter className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Avatar
            classNames={{
              base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B]",
              icon: "text-black/80",
            }}
          />
          <div>
            <h3 className="text-sm">{author}</h3>
            <span className="block text-xs">{role}</span>
          </div>
        </div>
        <Button>Read More</Button>
      </CardFooter>
    </Card>
  );
}
