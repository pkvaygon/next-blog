import Cards from "@/components/Cards";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { Archivo } from "next/font/google";
const archivo = Archivo({
  weight: ["500"],
  style: "normal",
  subsets: ["latin"]
})

const testData = [
  {
    imageUrl: 'https://www.tronic247.com/wp-content/uploads/2022/12/Adding-Prisma-to-a-Next.js-project.png',
    title: 'Next.Js 15 + Prisma',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur, sunt molestias! Aliquid nihil, et mollitia deserunt eos suscipit fugit illum perspiciatis nam enim officia vitae illo exercitationem harum sapiente sequi eveniet labore repudiandae libero. Aut aliquam, accusantium omnis ipsum nisi consectetur. Assumenda tenetur culpa et nostrum ex, cumque ut doloremque!',
    author: 'Alish Pidor',
    role: 'Author'
  },
];
export default function Home() {
  return (
    <main className="">
      <Cards font={archivo} posts={testData} />
   </main>
  );
}
